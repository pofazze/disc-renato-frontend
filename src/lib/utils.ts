/**
 * Embaralha um array usando o algoritmo Fisher-Yates (Knuth shuffle)
 * @param array Array a ser embaralhado
 * @returns Novo array com elementos embaralhados
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Cria uma cópia para não modificar o original
  
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  
  return shuffledArray;
}

/**
 * Gera uma seed baseada no número do bloco para embaralhamento consistente
 * @param blockNumber Número do bloco de perguntas
 * @returns Seed para embaralhamento
 */
export function generateSeed(blockNumber: number): number {
  return blockNumber * 1000 + Date.now() % 1000;
}

/**
 * Embaralha array com seed para resultados consistentes durante a sessão
 * @param array Array a ser embaralhado
 * @param seed Seed para o gerador de números aleatórios
 * @returns Array embaralhado
 */
export function shuffleArrayWithSeed<T>(array: T[], seed: number): T[] {
  const shuffledArray = [...array];
  
  // Implementação simples de gerador pseudo-aleatório com seed
  let random = seed;
  const pseudoRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };
  
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(pseudoRandom() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  
  return shuffledArray;
}