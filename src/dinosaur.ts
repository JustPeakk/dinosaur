/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

//CONSTANTES

const ANCHO_TABLERO = 640;
const ALTO_TABLERO = 480;
const COLOR_TABLERO = "#3499b3";
const ALTO_BASE = 100;
const ANCHO_BASE = 640;
const COLOR_BASE = "#2E8B57";
const ALTO_PERSONAJE = 25;
const ANCHO_PERSONAJE = 25;
const COLOR_PERSONAJE = "pink";
const SALTO_OBSTACULO = 7
const SEPARACION_OBSTACULO_PARED = 340;
const SEPARACION_PERSONAJE_PARED = 100;
const TECLA_DERECHA = "m";
const TECLA_IZQUIERDA = "n";
const TECLA_SALTO = "z";
const TECLA_FIN_JUEGO = "Escape";
const PASOS_SALTO: number[] = [3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 0, -1, -1, -1, -2, -2, -2, -2, -3, -3, -3, -3, -3]
const MULTIPLICADOR_SALTO = 3
const NUMERO_OBSTACULOS = 1
const colores: string[] = ["#DC143C", "#FF6347", "#9932CC", "#000080"]
const obstaculos: Rectangle[] = []
const SONIDO_SALTO = new Audio("/pedo.wav");
const anchuraObstaculo = getRandomArbitrary(20, 50)
const ANCHURA_MARCADOR: number = 300;
const MarcadorX: number = 300;

//VARIABLES
let copoNieve: Snow[];
let COLOR_OBSTACULO = "white";
let pasoSaltoActual = 0;
let saltoPersonaje = 5;
let finJuego: boolean;
let teclasPulsadas = new Set<string>();
let lienzo: HTMLCanvasElement | null;
let contexto: CanvasRenderingContext2D | null;
let marcador: number;
let textoMarcador: string = "Puntuación: "
let counter = 0



SONIDO_SALTO.loop = false



function crearNieve() {
  for (let index = 0; index < copoNieve.length; index++) {
    const nuevoCopo: Snow = {
      color: "white",
      position: {
        x: getRandomArbitrary(0, ANCHO_TABLERO),
        y: getRandomArbitrary(0, ALTO_TABLERO),
      },
      velocity: getRandomArbitrary(30, 50),
      size: getRandomArbitrary(1, 3),
    };
    copoNieve[index] = nuevoCopo;
  }
}

function getRandomColor(): string {
  let randomValue = Math.round(getRandomArbitrary(0, colores.length - 1))
  let color = colores[randomValue];
  return color;
}

function getRandomSpeed(): number {
  let randomSpeed = (getRandomArbitrary(5, 10))
  return randomSpeed;
}

function generarObstaculo(): Rectangle {
  const alturaObstaculo = getRandomArbitrary(10, 50)
  const posicionObstaculoY = (ALTO_TABLERO - ALTO_BASE) - alturaObstaculo
  const nuevoObstaculo = {
    x: getRandomArbitrary(300, 640),
    y: posicionObstaculoY,
    w: anchuraObstaculo,
    h: alturaObstaculo,
    color: getRandomColor(),
    speed: getRandomSpeed()
  }
  return nuevoObstaculo;
}

function resetearPosicionPersonaje() {
  if (personaje.x <= 0) {
    personaje.x = 0
  }
  if (personaje.x >= ANCHO_TABLERO - ANCHO_PERSONAJE) {
    personaje.x = ANCHO_TABLERO - ANCHO_PERSONAJE
  }
}

function generarObstaculos(numeroObstaculos: number, obstaculos: Rectangle[]) {
  //crear bucle
  //generar un obstaculo
  //meter obstaculo en array

  for (let i = 0; i < numeroObstaculos; i++) {
    obstaculos.push(generarObstaculo())
  }
  console.log(obstaculos)


}


type Rectangle = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  speed: number
}
type Point = {
  x: number;
  y: number;
}

type Snow = {
  color: string;
  position: Point;
  velocity: number;
  size: number;
}

type Texto = {
  message: string;
  x: number;
  y: number;
  maxwidth: number
}


let personaje: Rectangle = {
  x: 0 + SEPARACION_PERSONAJE_PARED,
  y: (ALTO_TABLERO - ALTO_BASE) - ALTO_PERSONAJE,
  w: ANCHO_PERSONAJE,
  h: ALTO_PERSONAJE,
  color: COLOR_PERSONAJE,
  speed: saltoPersonaje
}


function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function actualizarFinJuego() {
  if (teclasPulsadas.has("Escape")) {
    finJuego = true;
  }
  for (let i = 0; i < obstaculos.length; i++) {
    const obstaculoActual = obstaculos[i];
    colisionRectangulos(obstaculoActual, personaje)
    if (colisionRectangulos(obstaculoActual, personaje) === true) {
      finJuego = true
    }
  }



}

function inicializarJuego() {
  generarObstaculos(NUMERO_OBSTACULOS, obstaculos)
  copoNieve = [...Array(1000)];
  lienzo = document.getElementById("canvas") as HTMLCanvasElement;
  contexto = lienzo.getContext("2d");

  crearNieve();
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

function dibujarNieve(contexto: CanvasRenderingContext2D) {
  for (let index = 0; index < copoNieve.length; index++) {
    const copo: Snow = copoNieve[index];

    dibujarRectangulo(
      contexto,
      copo.color,
      copo.position.x,
      copo.position.y,
      copo.size,
      copo.size
    );
  }
}

function dibujarTablero(contexto: CanvasRenderingContext2D) {
  // dibujarRectangulo(contexto, COLOR_TABLERO, 0, 0, ANCHO_TABLERO, ALTO_TABLERO);

  const lingrad = contexto.createLinearGradient(0, 0, 0, ALTO_TABLERO);
  lingrad.addColorStop(0, "#2f7fe0");
  // lingrad.addColorStop(0.5, "#fff");
  // lingrad.addColorStop(0.5, "#26C000");
  lingrad.addColorStop(1, "#85d9f2");

  contexto.fillStyle = lingrad
  contexto.fillRect(0, 0, ANCHO_TABLERO, ALTO_TABLERO);


}

function dibujarBase(contexto: CanvasRenderingContext2D) {
  // dibujarRectangulo(contexto, COLOR_BASE, 0, ALTO_TABLERO - ALTO_BASE, ANCHO_BASE, ALTO_BASE);

  const lingrad = contexto.createLinearGradient(0, ALTO_TABLERO - ALTO_BASE, 0, ALTO_TABLERO);
  lingrad.addColorStop(0, "#00d243");
  lingrad.addColorStop(0.5, "#00c884");
  // lingrad.addColorStop(0.5, "#26C000");
  lingrad.addColorStop(1, "#00c8b4");

  contexto.fillStyle = lingrad
  contexto.fillRect(0, ALTO_TABLERO - ALTO_BASE, ANCHO_BASE, ALTO_BASE);

}

function dibujarPersonaje(contexto: CanvasRenderingContext2D) {
  dibujarRectangulo(contexto, COLOR_PERSONAJE, personaje.x, personaje.y, ANCHO_PERSONAJE, ALTO_PERSONAJE);
}

function dibujarObstaculos(contexto: CanvasRenderingContext2D) {
  for (let i = 0; i < obstaculos.length; i++) {
    let obstaculoActual = obstaculos[i]
    dibujarRectangulo(contexto, obstaculoActual.color, obstaculoActual.x, obstaculoActual.y, obstaculoActual.w, obstaculoActual.h)
  }
}

function dibujarMarcador(contexto: CanvasRenderingContext2D) {
  const grad=contexto.createLinearGradient(MarcadorX, 0, MarcadorX + ANCHURA_MARCADOR, 0);
grad.addColorStop(0, "darkorange");
grad.addColorStop(0.5, "orange");
grad.addColorStop(1, "#ffd5b1");

// Fill text with gradient
contexto.font = "bold italic 50px Arial";
contexto.fillStyle = grad;
contexto.fillText(textoMarcador + counter, MarcadorX, 40, ANCHURA_MARCADOR);
}

function beep() {
  SONIDO_SALTO.play();
}

let mySound = new Audio('efecto de sonido de salto de Super Mario.mp3')

function actualizarPosicionNieve(deltaTime: number) {

  for (let index = 0; index < copoNieve.length; index++) {
    const copoActual: Snow = copoNieve[index];

    copoActual.position.y =
      copoActual.position.y + copoActual.velocity * deltaTime;
    copoActual.position.x =
      copoActual.position.x + getRandomArbitrary(-1, 1)
    if (copoActual.position.y > ALTO_TABLERO - ALTO_BASE) {
      copoActual.position.y = ALTO_TABLERO - ALTO_BASE - copoActual.position.y;
    }

    if (copoActual.position.x > ANCHO_TABLERO + ANCHO_BASE) {
      copoActual.position.x = ANCHO_TABLERO + ANCHO_BASE + copoActual.position.x;
    }
  }
}

function actualizarPosicionPersonaje(teclasPulsadas: Set<string>) {
  if (teclasPulsadas.has(TECLA_DERECHA)) {
    personaje.x = personaje.x + saltoPersonaje
  }

  if (teclasPulsadas.has(TECLA_IZQUIERDA)) {
    personaje.x = personaje.x - saltoPersonaje
  }

  if (teclasPulsadas.has(TECLA_SALTO) || pasoSaltoActual > 0) {

    personaje.y = personaje.y - PASOS_SALTO[pasoSaltoActual] * MULTIPLICADOR_SALTO
    pasoSaltoActual++
    if (pasoSaltoActual >= PASOS_SALTO.length) {
      pasoSaltoActual = 0
    }

  }
  if (pasoSaltoActual === 1 && teclasPulsadas.has(TECLA_SALTO)) {
    beep();
  }

}
function colisionRectangulos(rect1: Rectangle, rect2: Rectangle): boolean {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  ) {

    return true;
  }
  return false;
}

function actualizarPosicionObstaculos() {

  for (let i = 0; i < obstaculos.length; i++) {
    const obstaculoActual = obstaculos[i];
    obstaculoActual.x = obstaculoActual.x - obstaculoActual.speed
    if (obstaculoActual.x <= 0 - anchuraObstaculo) {
      const nuevoObstaculo = generarObstaculo()
      nuevoObstaculo.x = ANCHO_TABLERO + anchuraObstaculo
      obstaculos[i] = nuevoObstaculo;
counter = counter + 1
    }
  }
}

function update(deltaTime: number) {
  actualizarPosicionPersonaje(teclasPulsadas);
  actualizarPosicionObstaculos();
  actualizarFinJuego();
  actualizarPosicionNieve(deltaTime);
  resetearPosicionPersonaje();
}

function render(contexto: CanvasRenderingContext2D) {
  dibujarTablero(contexto);
  dibujarBase(contexto);
  dibujarPersonaje(contexto);
  dibujarObstaculos(contexto);
  dibujarMarcador(contexto);
  dibujarNieve(contexto);

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