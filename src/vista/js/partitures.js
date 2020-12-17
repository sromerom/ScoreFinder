"use strict";
import {
  getPartitures,
  deletePartitura,
} from "../../servei/partituraService.js";

(async function () {
  document
    .querySelector("#createButton")
    .addEventListener("click", function () {
      window.location.replace("partitura.html");
    });

  await createTable();
  let allDeletes = document.querySelectorAll(".delete");
  document.querySelector("#goToLogin").addEventListener("click", openWindow);

  allDeletes.forEach((actualDelete) => {
    actualDelete.addEventListener("click", dialog);
  });
})();

async function createTable() {
  const partitures = await getPartitures();
  const taula = document.querySelector("#taula");

  if (document.querySelector("#taula table") === null) {
    console.log("Creamos sin borrar");
  } else {
    console.log("Borramos y creamos");
    document.querySelector("#taula table").remove();
  }
  const table = document.createElement("TABLE");

  //Capçalera
  const espais = document.createElement("TR");
  const columnaTitol = document.createElement("TH");
  const columnaIdiomaOriginal = document.createElement("TH");
  const columnaAccions = document.createElement("TH");
  columnaTitol.innerText = "Titol";
  columnaIdiomaOriginal.innerText = "Idioma Original";
  columnaAccions.innerText = "Accions";

  espais.appendChild(columnaTitol);
  espais.appendChild(columnaIdiomaOriginal);
  espais.appendChild(columnaAccions);
  table.appendChild(espais);

  //Contingut

  partitures.forEach((partitura) => {
    const trContent = document.createElement("TR");
    const titol = document.createElement("TD");
    const idioma = document.createElement("TD");
    titol.innerText = partitura.titol;
    idioma.innerText = partitura.idiomaoriginal;
    const options = document.createElement("TD");
    options.innerHTML = `<a href="partitura.html?idpartitura=${partitura.idpartitura}"><i class="fas fa-edit"></i>Editar</a> <a data-partituraid="${partitura.idpartitura}" class="delete" href="#"><i class="fas fa-trash"></i>Esborrar</a>`;
    trContent.appendChild(titol);
    trContent.appendChild(idioma);
    trContent.appendChild(options);
    table.appendChild(trContent);
  });

  taula.appendChild(table);
}
async function dialog(e) {
  const partituraid = e.target.dataset.partituraid;
  console.log(partituraid);
  let confirm = window.confirm(
    `Està segurt que vol esborrar la partitura ${partituraid}?`
  );

  if (confirm) {
    await deletePartitura(partituraid);
    alert("Element esborrat!");
    await createTable();
  } else {
    alert("Has cancel·lat l'acció.");
  }
}

function openWindow() {
  console.log(window.outerWidth); //1920-1600
  console.log(window.outerHeight); //1040-860

  const top = screen.width / 2 - 600 / 2;
  const left = screen.height / 2 - 600 / 2;
  console.log("top:" + top);
  console.log("left: " + left);
  let myWindow = window.open(
    "login.html",
    "_blank",
    `toolbar=yes,scrollbars=yes,resizable=yes,top=${left},left=${top},width=600,height=600`
  );
}
