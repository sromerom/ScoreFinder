"use strict";

import {
  addCerca,
  deleteCerca,
  cercador,
} from "../../servei/partituraService.js";

let partituresFiltrades = [];
let reproduintCanco = false;
const cronometre = {
  name: "cronometre",
  milisegons: 0,
  segons: 0,
  minuts: 0,
  hores: 0,
};

let setCronometre;

(async function () {
  const tecles = document.querySelectorAll(".tecla");

  tecles.forEach((tecla) => {
    tecla.addEventListener("click", async function (e) {
      playSound(e);
      pintaNotes(e);
      const results = document.querySelectorAll(".result");
      results.forEach((result) => {
        result.remove();
      });
      partituresFiltrades = cercador();
      loadPartitures(partituresFiltrades);
    });
  });

  document.querySelector("#deleteNotes").addEventListener("click", function () {
    deleteCerca();
    document.querySelector("#cerca p").innerText = "";
    const results = document.querySelectorAll(".result");
    results.forEach((result) => {
      result.remove();
    });
  });
})();

function playSound(e) {
  let nota;
  if (e.target) {
    nota = e.target.dataset.note;
  } else {
    nota = e;
    if (e === "DO_AGUT") {
      nota = "do7";
    }
  }
  console.log("Tocando la nota: " + nota);
  const audioNote = new Audio(`../../assets/audio/${nota}.ogg`);
  audioNote.play();
}

function playTrack(e) {
  const cancoElegida = e.target.dataset.buttonid;
  if (cancoElegida >= 0 && !reproduintCanco) {
    console.log("Reproduciendo cancion...");
    reproduintCanco = true;
    restart(cancoElegida);
    play(cancoElegida);
    partituresFiltrades[cancoElegida].notes.forEach((notes, index) => {
      doSetTimeout(notes.nom, index);
    });
    setTimeout(() => {
      pause();
      reproduintCanco = false;
    }, partituresFiltrades[cancoElegida].notes.length * 1000);

    const allButtons = document.querySelectorAll(".buttonPlayTrack");

    setTimeout(() => {
      console.log("Entras")
      allButtons.forEach((button) => {
        button.innerHTML = "Reproduir canço";
      });
    }, (partituresFiltrades[cancoElegida].notes.length * 1000) + 2000);
  }
}

function doSetTimeout(nota, i) {
  setTimeout(() => {
    playSound(nota);
  }, i * 1000);
}

function play(cancoElegida) {
  if (!setCronometre) {
    setCronometre = setInterval(() => {
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
    milisegons = `0${cronometre.milisegons}`;
  } else {
    milisegons = cronometre.milisegons;
  }

  if (cronometre.segons < 10) {
    segons = `0${cronometre.segons}`;
  } else {
    segons = cronometre.segons;
  }

  if (cronometre.minuts < 10) {
    minuts = `0${cronometre.minuts}`;
  } else {
    minuts = cronometre.minuts;
  }

  if (cronometre.hores < 10) {
    hores = `0${cronometre.hores}`;
  } else {
    hores = cronometre.hores;
  }
  const parseCronometre = `${hores}:${minuts}:${segons}.${milisegons}`;

  document.querySelector(
    `button[data-buttonid="${cancoElegida}"]`
  ).innerHTML = parseCronometre;
}

async function pintaNotes(e) {
  let name = e.target.dataset.note;
  if (name === "Do7") {
    name = "DO_AGUT";
  }
  const pCerca = document.querySelector("#cerca p");
  let notesDOM = "";
  //id, figura, alteracio, nom, ordre
  const cerca = await addCerca(0, name, 0);
  cerca.forEach((nota) => {
    if (nota.alteracio === "SOSTINGUT") {
      notesDOM += nota.nom.split("-")[0] + "# ";
    } else {
      if (nota.nom === "DO_AGUT") {
        notesDOM += "Do' ";
      } else {
        notesDOM += nota.nom + " ";
      }
    }
  });

  pCerca.innerHTML = notesDOM;
}

async function loadPartitures() {
  console.log(partituresFiltrades);
  partituresFiltrades.forEach((partitura, index) => {
    console.log(partitura);
    const divResultats = document.querySelector("#resultats");
    const containerPartitura = document.createElement("DIV");
    const divContentPartitura = document.createElement("DIV");
    const pTitolPartitura = document.createElement("P");
    const urlEdit = document.createElement("A"); //<a href="#">Lletra</a>
    const divButton = document.createElement("DIV");
    const button = document.createElement("BUTTON");

    //Set content
    containerPartitura.setAttribute("class", "result");
    divContentPartitura.setAttribute("class", "content");
    pTitolPartitura.innerText = partitura.titol;
    urlEdit.setAttribute("href", "#");
    urlEdit.innerHTML = "Lletra";
    //button.setAttribute("data-buttonid", partitura.idpartitura);
    button.setAttribute("data-buttonid", index);
    button.setAttribute("class", "buttonPlayTrack");
    button.innerText = "Reproduir canço";
    button.addEventListener("click", playTrack);

    divContentPartitura.appendChild(pTitolPartitura);
    divContentPartitura.appendChild(urlEdit);
    divButton.appendChild(button);

    containerPartitura.appendChild(divContentPartitura);
    containerPartitura.appendChild(divButton);

    divResultats.appendChild(containerPartitura);
  });
}
