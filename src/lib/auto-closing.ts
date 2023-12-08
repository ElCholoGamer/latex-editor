const mappings = [
  ['{', '}'],
  ['[', ']'],
  ['(', ')'],
  ['"', '"'],
  ["'", "'"],
];

export function autoClose(
  prevStr: string,
  newString: string,
  position: number
): string {
  if (newString.length !== prevStr.length + 1) return newString;

  const char = newString[position - 1];
  const match = mappings.find((map) => map[0] === char);
  if (match) {
    return (
      newString.substring(0, position) +
      match[1] +
      newString.substring(position)
    );
  }

  return newString;
}
