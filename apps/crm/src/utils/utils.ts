export function getAfterSlash(input: string): string {
  const parts = input.split('/');
  return parts[parts.length - 1];
}

// Exemplo de uso
const result = getAfterSlash('projects/0000000000000000001-A');
console.log(result); // Saída: 0000000000000000001-A
