import { Archetype, BlockAnswer, Results, ArchetypeScore } from '../../types';
import { questionBlocks } from '../../data/questions';

export class DISCCalculator {
  static calculateResults(answers: BlockAnswer[]): Results {
    // Validate input
    if (!answers || answers.length === 0) {
      throw new Error('No answers provided');
    }

    // Initialize raw scores
    const rawScores = {
      warrior: 0,
      king: 0,
      lover: 0,
      mage: 0
    };

    // Initialize counts
    const selectedCounts = {
      warrior: 0,
      king: 0,
      lover: 0,
      mage: 0
    };

    // Process each answer
    answers.forEach(answer => {
      const block = questionBlocks.find(b => b.id === answer.blockId);
      if (!block) return;

      const selectedOption = block.options.find(opt => opt.id === answer.selectedId);
      if (selectedOption) {
        rawScores[selectedOption.archetype] += 1;
        selectedCounts[selectedOption.archetype] += 1;
      }
    });

    // Convert to percentages
    const percentageScores = this.convertToPercentages(rawScores);

    // Create archetype scores
    const archetypeScores: Record<Archetype, ArchetypeScore> = {
      warrior: {
        raw: rawScores.warrior,
        percentage: percentageScores.warrior,
        mostCount: selectedCounts.warrior,
        leastCount: 0
      },
      king: {
        raw: rawScores.king,
        percentage: percentageScores.king,
        mostCount: selectedCounts.king,
        leastCount: 0
      },
      lover: {
        raw: rawScores.lover,
        percentage: percentageScores.lover,
        mostCount: selectedCounts.lover,
        leastCount: 0
      },
      mage: {
        raw: rawScores.mage,
        percentage: percentageScores.mage,
        mostCount: selectedCounts.mage,
        leastCount: 0
      }
    };

    // Determine predominant archetype
    const predominantArchetype = this.determinePredominantArchetype(archetypeScores);

    return {
      ...archetypeScores,
      predominantArchetype,
      submittedAt: new Date()
    };
  }

  private static convertToPercentages(rawScores: Record<Archetype, number>): Record<Archetype, number> {
    const scores = Object.values(rawScores);
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    
    // Handle edge case where all scores are equal
    if (min === max) {
      return {
        warrior: 25,
        king: 25,
        lover: 25,
        mage: 25
      };
    }

    // Shift scores to positive range
    const shiftedScores = {
      warrior: rawScores.warrior - min,
      king: rawScores.king - min,
      lover: rawScores.lover - min,
      mage: rawScores.mage - min
    };

    const total = Object.values(shiftedScores).reduce((sum, score) => sum + score, 0);

    // Convert to percentages
    let percentages = {
      warrior: Math.round((shiftedScores.warrior / total) * 100),
      king: Math.round((shiftedScores.king / total) * 100),
      lover: Math.round((shiftedScores.lover / total) * 100),
      mage: Math.round((shiftedScores.mage / total) * 100)
    };

    // Ensure total is 100% by adjusting the highest score
    const currentTotal = Object.values(percentages).reduce((sum, p) => sum + p, 0);
    if (currentTotal !== 100) {
      const diff = 100 - currentTotal;
      const highestArchetype = Object.entries(percentages)
        .reduce((max, [arch, perc]) => perc > max[1] ? [arch, perc] : max, ['warrior', 0])[0] as Archetype;
      percentages[highestArchetype] += diff;
    }

    return percentages;
  }

  private static determinePredominantArchetype(scores: Record<Archetype, ArchetypeScore>): Archetype {
    // Primary: highest percentage
    let candidates = Object.entries(scores)
      .sort(([,a], [,b]) => b.percentage - a.percentage);

    if (candidates[0][1].percentage > candidates[1][1].percentage) {
      return candidates[0][0] as Archetype;
    }

    // Tie-breaking: highest most count
    const tiedCandidates = candidates.filter(([,score]) => score.percentage === candidates[0][1].percentage);
    const byMostCount = tiedCandidates.sort(([,a], [,b]) => b.mostCount - a.mostCount);

    if (byMostCount[0][1].mostCount > byMostCount[1][1].mostCount) {
      return byMostCount[0][0] as Archetype;
    }

    // Second tie-breaking: lowest least count
    const byLeastCount = byMostCount.sort(([,a], [,b]) => a.leastCount - b.leastCount);

    if (byLeastCount[0][1].leastCount < byLeastCount[1][1].leastCount) {
      return byLeastCount[0][0] as Archetype;
    }

    // Final tie-breaking: contextual preference (warrior -> king -> lover -> mage)
    const preferenceOrder: Archetype[] = ['warrior', 'king', 'lover', 'mage'];
    for (const archetype of preferenceOrder) {
      if (byLeastCount.some(([arch]) => arch === archetype)) {
        return archetype;
      }
    }

    return 'warrior'; // Fallback
  }
}