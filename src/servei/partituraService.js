import { Nota } from "../model/Nota.js";

let cerca = [];
let partitures = [];
(async function () {
  partitures = await getPartitures();
  console.log(partitures);
})();

async function getPartitures() {
  const fetchPartitures = await fetch(
    "http://server247.cfgs.esliceu.net/piano/nologin/score/list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        //"Content-Type": "application/json",
      },
    }
  );

  const partituresSenseFiltrar = await fetchPartitures.json();
  const partituresFiltrades = sortAllNotesFromPartitures(
    partituresSenseFiltrar
  );
  return partituresFiltrades;
}

//id, figura, alteracio, nom, ordre
export function addCerca(id, nom, ordre) {
  const figura = "NEGRE";
  let alteracio = "NORMAL";
  if (nom.includes("sust")) {
    alteracio = "SOSTINGUT";
    nom = nom.split("-")[0];
  }
  cerca.push(new Nota(id, figura, alteracio, nom, ordre));
  console.log(cerca);
  return cerca;
}

export function deleteCerca() {
  cerca = [];
}

export function cercador() {
  const actualCerca = cerca;
  const actualPartitures = partitures;
  const filtrades = [];

  let nMatch = 0;
  let i = 0;
  let j = 0;

  for (let z = 0; z < actualPartitures.length; z++) {
    let actualPartitura = actualPartitures[z];
    nMatch = 0;
    i = 0;
    j = 0;
    for (let k = 0; k < actualPartitura.notes.length; k++) {
      let actualNomNotePartitura = actualPartitura.notes[k].nom.toUpperCase();
      let actualAlteracioNotePartitura = actualPartitura.notes[
        k
      ].alteracio.toUpperCase();

      if (
        actualNomNotePartitura === actualCerca[0].nom.toUpperCase() &&
        actualAlteracioNotePartitura === actualCerca[0].alteracio.toUpperCase()
      ) {
        i = k;

        while (
          actualPartitura.notes[i].nom.toUpperCase() ===
            actualCerca[j].nom.toUpperCase() &&
          actualPartitura.notes[i].alteracio.toUpperCase() ===
            actualCerca[j].alteracio.toUpperCase()
        ) {
          nMatch++;

          if (i + 1 >= actualPartitura.notes.length) {
            console.log("break partitura");
            break;
          }
          if (j + 1 >= actualCerca.length) {
            break;
          }
          i++;
          j++;
        }
      }

      if (nMatch < actualCerca.length) {
        nMatch = 0;
        i = 0;
        j = 0;
      } else {
        break;
      }
    }

    if (nMatch === actualCerca.length) {
      filtrades.push(actualPartitures[z]);
    }
  }

  console.log(filtrades);
  return filtrades;
}

function sortAllNotesFromPartitures(partitures) {
  return partitures.map((partitures) => {
    let sorted = partitures.notes.sort((a, b) => a.ordre - b.ordre);
    partitures.notes = sorted;
    return partitures;
  });
}
