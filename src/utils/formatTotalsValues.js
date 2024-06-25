/* eslint-disable import/no-extraneous-dependencies */

import numeral from 'numeral';

import currency from 'currency.js';

export default function formatNumber(value) {
  const number = parseFloat(value);
  if (!Number.isNaN(number)) {
    return Math.floor(number).toLocaleString('en-US').replace(/,/g, '.');
  }
  return value;
}

export const formatearNumero = (numero) => {
  const esNegativo = Number(numero) < 0;
  const inputNumero = Number(numero?.replace(/\D/g, ''));
  const nuevoNum = inputNumero.toLocaleString('es-AR');
  return esNegativo ? `-${nuevoNum}` : nuevoNum;
};

export const formatNumberPrestamos = (numero) => {
  const newNumberr = currency(numero, {
    symbol: '',
    pattern: '# !',
    separator: '.',
    decimal: ',',
  });

  return newNumberr.format();
};

export const formatNumberGrafics = (numero) => {
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

  return `${numero < 0 ? ' -' : ''}${Math.abs(numeroFormateado)} ${
    sufijos[exp]
  }`;
};
