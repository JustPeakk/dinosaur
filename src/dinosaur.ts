/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

const ANCHO_TABLERO = 640;
const ALTO_TABLERO = 480;
const COLOR_TABLERO = "black";
const ALTO_BASE = 100;
const ANCHO_BASE = 640;
const COLOR_BASE = "gray";
const ALTO_PERSONAJE = 25;
const ANCHO_PERSONAJE = 25;
const COLOR_PERSONAJE = "pink";
const SEPARACION_PERSONAJE_PARED = 100;
const TECLA_DERECHA = "m";
const TECLA_IZQUIERDA = "n";
const TECLA_SALTO = "z";
const TECLA_FIN_JUEGO = "Escape";
const SALTO_PERSONAJE = 5;
const PASOS_SALTO: number[] = [3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 0, -1, -1, -1, -2, -2, -2, -2, -3, -3, -3, -3, -3] 
const MULTIPLICADOR_SALTO = 3

let pasoSaltoActual = 0
let posicionPersonajeX = 0 + SEPARACION_PERSONAJE_PARED;
let posicionPersonajeY = (ALTO_TABLERO - ALTO_BASE) - ALTO_PERSONAJE;
let finJuego: boolean;
let teclasPulsadas = new Set<string>();
let lienzo: HTMLCanvasElement | null;
let contexto: CanvasRenderingContext2D | null;



function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function actualizarFinJuego() {
  if (teclasPulsadas.has("Escape")) {
    finJuego = true;
  }
}

function inicializarJuego() {
  lienzo = document.getElementById("canvas") as HTMLCanvasElement;
  contexto = lienzo.getContext("2d");
  if (contexto) {
    contexto.canvas.width = ANCHO_TABLERO;
    contexto.canvas.height = ALTO_TABLERO;
  }

  if (contexto) {
    render(contexto);
  }
}

function dibujarRectangulo(
  ctx: CanvasRenderingContext2D,
  color: string,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function dibujarTablero(contexto: CanvasRenderingContext2D) {
  dibujarRectangulo(contexto, COLOR_TABLERO, 0, 0, ANCHO_TABLERO, ALTO_TABLERO);
}

function dibujarBase(contexto: CanvasRenderingContext2D) {
  dibujarRectangulo(contexto, COLOR_BASE, 0, ALTO_TABLERO - ALTO_BASE, ANCHO_BASE, ALTO_BASE);
}

function dibujarPersonaje(contexto: CanvasRenderingContext2D) {
  dibujarRectangulo(contexto, COLOR_PERSONAJE, posicionPersonajeX, posicionPersonajeY, ANCHO_PERSONAJE, ALTO_PERSONAJE);
}

function actualizarPosicionPersonaje(teclasPulsadas: Set<string>) {
  if (teclasPulsadas.has(TECLA_DERECHA)) {
    posicionPersonajeX = posicionPersonajeX + SALTO_PERSONAJE
  }

  if (teclasPulsadas.has(TECLA_IZQUIERDA)) {
    posicionPersonajeX = posicionPersonajeX - SALTO_PERSONAJE
  }

  if (teclasPulsadas.has(TECLA_SALTO) || pasoSaltoActual >0) {
   posicionPersonajeY = posicionPersonajeY - PASOS_SALTO[pasoSaltoActual]*MULTIPLICADOR_SALTO

    pasoSaltoActual++
    if (pasoSaltoActual >= PASOS_SALTO.length){
      pasoSaltoActual = 0
    }
  }
}


function update(deltaTime: number) {
  actualizarPosicionPersonaje(teclasPulsadas);
  actualizarFinJuego();
}

function render(contexto: CanvasRenderingContext2D) {
  dibujarTablero(contexto);
  dibujarBase(contexto);
  dibujarPersonaje(contexto);
}

inicializarJuego();
let lastTime = 0;
function gameLoop(timestamp: number) {
  if (finJuego) return;
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(deltaTime);
  if (contexto) {
    render(contexto);
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener("keydown", function (event: KeyboardEvent) {
  if (event.key === TECLA_DERECHA) {
    teclasPulsadas.add(TECLA_DERECHA);
  } else if (event.key === TECLA_IZQUIERDA) {
    teclasPulsadas.add(TECLA_IZQUIERDA);
  } else if (event.key === TECLA_SALTO) {
    teclasPulsadas.add(TECLA_SALTO);
  } else if (event.key === TECLA_FIN_JUEGO) {
    teclasPulsadas.add(TECLA_FIN_JUEGO);
  }

  console.log(teclasPulsadas);
});

window.addEventListener("keyup", function (event: KeyboardEvent) {
  if (event.key === TECLA_DERECHA) {
    teclasPulsadas.delete(TECLA_DERECHA);
  } else if (event.key === TECLA_IZQUIERDA) {
    teclasPulsadas.delete(TECLA_IZQUIERDA);
  } else if (event.key === TECLA_SALTO) {
    teclasPulsadas.delete(TECLA_SALTO);
  } else if (event.key === TECLA_FIN_JUEGO) {
    teclasPulsadas.delete(TECLA_FIN_JUEGO);
  }

  console.log(teclasPulsadas);
});
