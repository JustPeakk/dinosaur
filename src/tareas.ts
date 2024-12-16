/**
 * Sintaxis para crear constantes:
 * const nombre_constante : tipo_variable = valor_variable;
 *
 *
 * Sintaxis para crear variables:
 * let nombre_variable : tipo_variable = valor_variable;
 *
 * tipo_variable es opcional y no es necesario si se puede inferir automáticamente
 */

import { Simulate } from "react-dom/test-utils";

// console.log("Ya estoy aqui");

// const miConstante: string = "hola";

// let hola1: string = "me llamo ";
// console.log(hola1);

// hola1 = hola1 + "Xoel";
// console.log(hola1);

// const diasSemana: string[] = [
//   "lunes",
//   "martes",
//   "miercoles",
//   "jueves",
//   "viernes",
//   "sabado",
//   "domingo",
// ];

// const diasSemanaEng: string[] = [
//   "monday",
//   "tuesday",
//   "wednesday",
//   "thursday",
//   "friday",
//   "saturday",
//   "sunday",
// ];

// for (let i = 0; i < diasSemana.length; i++) {
//   console.log(diasSemanaEng[i]);
// }

// let contador = 0;
// const incremento = 2;
// while (contador < 100) {
//   contador = contador + incremento;
//   console.log(contador);
// }

// for (let i = 0; i < miArray.length; i++) {
//   // console.log(miArray[i]);
//   if (i % 2 === 0) {
//     console.log(miArray[i]);
//   }
// }

// for (let i = 0; i < diasSemana.length; i++) {
//   if (i === 0) {
//     diasSemana[i] = "monday";
//   } else if (i === 1) {
//     diasSemana[i] = "tuesday";
//   } else if (i === 2) {
//     diasSemana[i] = "wednesday";
//   } else if (i === 3) {
//     diasSemana[i] = "thursday";
//   } else if (i === 4) {
//     diasSemana[i] = "friday";
//   } else if (i === 5) {
//     diasSemana[i] = "saturday";
//   } else if (i === 6) {
//     diasSemana[i] = "sunday";
//   }
//   console.log(diasSemana[i]);
// }

// const miArray2: number[] = [
//   4, 8, 2, 5, 7, 5, 1, 9
// ];
// // console.log(miArray2[1]);

// let acumulador: number = 0;
// for (let i = 0; i < miArray2.length; i++) {
//   acumulador = miArray2[i] + acumulador;
//   console.log(acumulador);
// }

//8
console.log("inicioPrograma");

// let acumulador = 0;
// let i = 1;
// const numeroFinal = 1000;
// while (i <= numeroFinal) {
//   acumulador = acumulador + i;
//   if (i % 10 == 0) {
//     console.log("suma parcial= " + acumulador);
//   }
//   i++;
// }
// console.log("Suma total=" + acumulador);

function sumar(a: number, b: number) {
  return a + b;
}
const suma = sumar(2, 4);

console.log("suma:", suma);

function restar(a: number, b: number) {
  return a - b;
}
const resta = restar(2, 4);
console.log("resta:", resta);

function multiplicar(a: number, b: number) {
  return a * b;
}
const multiplicacion = multiplicar(2, 4);

console.log("multiplicacion:", multiplicacion);

function dividir(a: number, b: number) {
  return a / b;
}
const division = dividir(2, 4);
console.log("division:", division);

function potencia(a: number, b: number) {
  if (b === 0) {
    return 1;
  }
  let acumulador: number = 0;
  let i: number = 1;
  while (i <= b) {
    if (i === 1) {
      acumulador = a;
    } else {
      acumulador = acumulador * a;
    }

    i++;
  }

  return acumulador;
}

const resultadoPotencia = potencia(2, 4);
console.log("potencia:", resultadoPotencia);

function areaCirculo(diametro: number) {
  const radio = diametro / 2;
  const radioCuadrado = potencia(radio, 2);
  const formulaAreaCirculo = Math.PI * radioCuadrado;
  return formulaAreaCirculo;
}
const diametrocirculo = areaCirculo(10);
console.log("Area del circulo", diametrocirculo);

// function contarPalabras(texto: string) {
//   let i: number = 0;
//   let contadorPalabras: number = 0;
//   const abecedario: string =
//     "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";

//   while (i < texto.length) {
//     if (abecedario.includes(texto[i])) {
//       console.log("el el caracter<" + texto[i] + ">es una letra");
//     } else {
//       console.log("el caracter<" + texto[i] + ">no es una letra");
//       contadorPalabras = contadorPalabras + 1;
//     }

//     i++;
//   }
//   return contadorPalabras;
// }

function contarAlfanumericos(texto: string) {
  let i: number = 0;
  let alfanumericos: number = 0;
  let noAlfanumericos: number = 0;
  const alfanumerico: string =
    "1234567890ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";

  while (i < texto.length) {
    if (alfanumerico.includes(texto[i])) {
      alfanumericos++;
    } else {
      noAlfanumericos++;
    }

    i++;
  }

  console.log("en el texto <", texto, "> hay estas propiedades");
  console.log("alfanumericos:", alfanumericos);
  console.log("no alfanumericos:", noAlfanumericos);
}

const texto: string = "hola a todo el mundo2";
contarAlfanumericos(texto);

// const oracion: string = "Papi eres un merluzo   ";
// const numeroPalabras = contarPalabras(oracion);
// console.log("El numero de palabras en ", oracion, "es", numeroPalabras);

function cubo(n: number): number {
  return n * n * n;
}

function esPar(n: number): boolean {
  return n % 2 === 0;
}

function imprimirParesImpares(numeros: number[]) {
  let i: number = 0;

  while (i < numeros.length) {
    if (esPar(cubo(numeros[i]))) {
      console.log("numero par");
    } else {
      console.log("numero impar");
    }
    i++;
  }
}

imprimirParesImpares([1, 2, 3, 4, 5]);
console.log("finPrograma");
