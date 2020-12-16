"use strict";

(function () {
  const taula = document.querySelector("#taula");
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
  for (let i = 0; i < 100; i++) {
    const trContent = document.createElement("TR");
    const titol = document.createElement("TD");
    const idioma = document.createElement("TD");

    if (i === 0) {
      titol.innerText = "La Balanguera";
      idioma.innerText = "ca";
    } else if (i === 1) {
      titol.innerText = "Merry Christmas";
      idioma.innerText = "en";
    } else if (i === 2) {
      titol.innerText = "Frère Jacques";
      idioma.innerText = "fr";
    } else {
      titol.innerText = "Sant Antoni i el Dimoni";
      idioma.innerText = "ca";
    }

    const options = document.createElement("TD");
    options.innerHTML =
      '<a href="#"><i class="fas fa-edit"></i>Editar</a><a class="delete" href="#"><i class="fas fa-trash"></i>Esborrar</a>';
    trContent.appendChild(titol);
    trContent.appendChild(idioma);
    trContent.appendChild(options);
    table.appendChild(trContent);
  }

  taula.appendChild(table);
})();

let allDeletes = document.querySelectorAll(".delete");
document.querySelector("#goToLogin").addEventListener("click", openWindow);
allDeletes.forEach((actualDelete) => {
  actualDelete.addEventListener("click", dialog);
});

function dialog() {
  let confirm = window.confirm("Està segurt que vol esborrar l'element 4?");

  if (confirm) {
    alert("Element esborrat!");
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
