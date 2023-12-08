export const autoCloseMappings: [string, string][] = [
  ['{', '}'],
  ['[', ']'],
  ['(', ')'],
  ['"', '"'],
  ["'", "'"],
];

export const buttons: [string, string, string][] = [
  ['\\frac{\\square}{\\square}', '\\frac{}{}', 'Fraction'],
  ['x^{\\square}', '^{}', 'Power'],
  ['\\sqrt{\\square}', '\\sqrt{}', 'Square root'],
  ['\\lim_{x\\to\\square}', '\\lim{x\\to{}}{}', 'Limit'],
  ['\\int{\\square}dx', '\\int{}dx', 'Indefinite integral'],
  [
    '\\int_{\\square}^{\\square}{\\square}dx',
    '\\int_{}^{}{}dx',
    'Definite integral',
  ],
  ['\\sum_{\\square}^{\\square}', '\\sum_{}^{}{}', 'Summation'],
  ['\\prod_{\\square}^{\\square}', '\\prod_{}^{}{}', 'Product'],
];
