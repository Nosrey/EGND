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

// export const formatNumberPrestamos = (number) => { // FALLA PARA VALORES CON MILLONES O BILLONES
//   const myNumeral = numeral(number);
//   const currencyString = myNumeral.format('0.0,');

//   const fraseActF = currencyString.toString().replace(',', '.');

//   let count = 0;
//   let another = '';

//   for (let i = 0; i < fraseActF.length; i++) {
//     if (fraseActF[i] === '.') {
//       count++;
//     }

//     if (fraseActF[i] === '.' && count > 1) {
//       another += ',';
//     } else {
//       another += fraseActF[i];
//     }
//   }
//   return another;
// };

export const formatNumberPrestamos = (numero) => {
  // Aseguramos que el número tenga exactamente 2 decimales
  // numero = parseFloat(numero).toFixed(2);

  const newNumberr = currency(
    numero,
    {
    symbol: "",
    pattern: "# !",
    separator: ".",
    decimal: ",",
    }
  );

  return newNumberr.format()
}
