export function formatShortNumberNotation(numero) {
  let num;
  if (typeof numero === 'string') {
    num = parseInt(numero.replace(/\./g, ''));
  } else {
    num = numero;
  }

  const sufijos = {
    0: '',
    3: 'K',
    6: 'M',
    9: 'B',
    12: 'T',
    15: 'Qa',
  };

  let exp = 0;

  while (Math.abs(num) >= 1000 && exp < 15) {
    num /= 1000;
    exp += 3;
  }

  const numeroFormateado = exp >= 3 ? num.toFixed(2) : num.toFixed(0);

  const finalValue = `${numero < 0 ? ' -' : ''}${Math.abs(numeroFormateado)} ${
    sufijos[exp]
  }`;

  return finalValue;
}
