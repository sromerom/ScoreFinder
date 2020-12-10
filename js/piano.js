//Cumpleaños feliz
const canco1 = [
  "do",
  "do",
  "re",
  "do",
  "fa",
  "mi",
  "do",
  "do",
  "re",
  "do",
  "sol",
  "fa",
  "do",
  "do",
  "do7",
  "la",
  "fa",
  "mi",
  "re",
  "si",
  "si",
  "la",
  "fa",
  "sol",
  "fa",
];

//La balanguera
const canco2 = [
  "fa",
  "sol",
  "la-sust",
  "fa",
  "la-sust",
  "do",
  "la-sust",
  "fa",
  "fa",
  "do",
  "fa",
  "sol",
  "la-sust",
  "fa",
  "la-sust",
  "do",
  "la-sust",
  "fa",
  "la-sust",
  "do",
  "fa",
  "sol",
  "la-sust",
  "do",
  "sol",
  "la-sust",
  "do",
  "la-sust",
  "fa",
  "la-sust",
  "do",
  "fa",
];

let cerca = [];
const partitures = [];
let reproduintCanco = false;
partitures.push(canco1);
partitures.push(canco2);

function Nota(nom, tipus) {
  this.nom = nom;
  this.tipus = tipus;
}

function addCerca(nom, tipus) {
  cerca.push(new Nota(nom, tipus));
}

function cercador() {}

const tecles = document.querySelectorAll(".tecla");

tecles.forEach((tecla) => {
  tecla.addEventListener("click", playSound);
});

function playSound(e) {
  let nota;
  if (e.target) {
    nota = e.target.dataset.note;
  } else {
    nota = e;
  }
  const audioNote = new Audio(`audio/${nota}.ogg`);
  audioNote.play();
}

const buttonsPlay = document.querySelectorAll(".buttonPlayTrack");

buttonsPlay.forEach((button) => {
  button.addEventListener("click", playTrack);
});

function playTrack(e) {
  const cancoElegida = e.target.dataset.buttonid;
  console.log();
  if (cancoElegida >= 0 && !reproduintCanco) {
    console.log("Reproduciendo cancion...");
    reproduintCanco = true;
    restart(cancoElegida);
    play(cancoElegida);
    partitures[cancoElegida - 1].forEach(delayLoop(playSound, 1000));
    setTimeout(() => {
      pause();
      reproduintCanco = false;
    }, partitures[cancoElegida - 1].length * 1000);
  }
}

const cronometre = {
  name: "cronometre",
  milisegons: 0,
  segons: 0,
  minuts: 0,
  hores: 0,
};

let setCronometre;
function play(cancoElegida) {
  if (!setCronometre) {
    setCronometre = setInterval(function () {
      cronometre.milisegons++;
      if (cronometre.milisegons >= 100) {
        cronometre.milisegons = 0;
        cronometre.segons++;
      }

      if (cronometre.segons >= 60) {
        cronometre.segons = 0;
        cronometre.minuts++;
      }

      if (cronometre.minuts >= 60) {
        cronometre.minuts = 0;
        cronometre.hores++;
      }

      pintaCronometre(cronometre, cancoElegida);
    }, 10);
  }
}
function pause() {
  clearInterval(setCronometre);
  setCronometre = null;
}

function restart(cancoElegida) {
  pause();
  cronometre.milisegons = 0;
  cronometre.segons = 0;
  cronometre.minuts = 0;
  cronometre.hores = 0;
  pintaCronometre(cronometre, cancoElegida);
}

function pintaCronometre(cronometre, cancoElegida) {
  let milisegons = "00";
  let segons = "00";
  let minuts = "00";
  let hores = "00";

  if (cronometre.milisegons < 10) {
    milisegons = "0" + cronometre.milisegons;
  } else {
    milisegons = cronometre.milisegons;
  }

  if (cronometre.segons < 10) {
    segons = "0" + cronometre.segons;
  } else {
    segons = cronometre.segons;
  }

  if (cronometre.minuts < 10) {
    minuts = "0" + cronometre.minuts;
  } else {
    minuts = cronometre.minuts;
  }

  if (cronometre.hores < 10) {
    hores = "0" + cronometre.hores;
  } else {
    hores = cronometre.hores;
  }
  const parseCronometre = `${hores}:${minuts}:${segons}.${milisegons}`;
  document.querySelector(
    'button[data-buttonid="' + cancoElegida + '"]'
  ).innerHTML = parseCronometre;
}
const delayLoop = (fn, delay) => {
  return (x, i) => {
    setTimeout(() => {
      fn(x);
    }, i * delay);
  };
};
