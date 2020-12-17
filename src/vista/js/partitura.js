"use strict";
import { getIdiomes, tradueix } from "../../servei/GoogleService.js";
import {
  getPartituresById,
  desaPartitura,
} from "../../servei/partituraService.js";

const llocError = document.querySelector("#displayError");
const contentTitol = document.querySelector('input[name="titol"]');
const contentIdiomaOriginal = document.querySelector("select");
//const contentTraduccio = document.querySelector('textarea[name="traduccioCatala"]');
const contentTraduccio = document.querySelector("#tradueixCatala p")

const url_string = window.location.href;
const url = new URL(url_string);
const idpartitura = parseInt(url.searchParams.get("idpartitura"));
let partitura = [];

document
  .querySelector("#desaPartitura")
  .addEventListener("submit", validationForm);

(async function () {
  if (idpartitura) {
    partitura = await getPartituresById(idpartitura);
  }
  tinymce.init({
    selector: "#lletraOriginal",
    setup: function (ed) {
      ed.on("input", function () {
        tradueixText();
      });
    },
  });

  const idiomes = await getIdiomes();
  idiomes.forEach((idioma) => {
    const option = document.createElement("OPTION");
    option.setAttribute("value", idioma.code);
    option.innerHTML = idioma.name;
    contentIdiomaOriginal.appendChild(option);
  });

  if (idpartitura) {
    if (partitura) {
      loadPartitura(partitura);
    }
  }
})();

async function tradueixText() {
  console.log(tinymce.get("lletraOriginal").getContent());
  console.log(contentIdiomaOriginal.value)
  const textContentTraduccion = await tradueix(contentIdiomaOriginal.value, "ca", tinymce.get("lletraOriginal").getContent());

  contentTraduccio.innerHTML = textContentTraduccion;
}

async function loadPartitura(partitura) {
  console.log(partitura);
  contentTitol.value = partitura.titol;
  contentIdiomaOriginal.value = partitura.idiomaoriginal;
  //contentLletraOriginal.value = partitura.lletraoriginal;
  tinymce.activeEditor.setContent(partitura.lletraoriginal);
  contentTraduccio.innerHTML = partitura.lletratraduccio;
}
async function validationForm(e) {
  e.preventDefault();
  const contentLletraOriginal = tinymce.get("lletraOriginal").getContent();
  //console.log("Se empieza a validar...");
  //console.log("Titol: " + contentTitol);
  //console.log("Idioma original: " + contentIdiomaOriginal);
  //console.log("Lletra original: " + contentLletraOriginal);
  //console.log("Traduccio: " + contentTraduccio);

  let messages = [];

  if (contentTitol.value === "" || contentTitol.value == null) {
    messages.push("El titol es necessari.");
  }

  if (
    contentIdiomaOriginal.value === "" ||
    contentIdiomaOriginal.value == null
  ) {
    messages.push("El idioma es necessari.");
  }

  if (contentLletraOriginal === "" || contentLletraOriginal == null) {
    messages.push("La lletra es necessaria.");
  }

  if (
    contentIdiomaOriginal.value === "ca" &&
    contentLletraOriginal !== contentTraduccio.innerHTML
  ) {
    messages.push("La lletra i la traducció han de ser iguals.");
  }

  if (contentTraduccio.innerHTML === "" || contentTraduccio.innerHTML == null) {
    messages.push("La traducció es necessaria.");
  }

  if (contentTitol.value.match(/\S+/g).length < 3) {
    messages.push("El titol ha de tenir un minim de tres paraules");
  }

  const htmlRegexp = /^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>[^<>]*<\/\1+\s*>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/;

  if (!htmlRegexp.test(contentLletraOriginal)) {
    messages.push("Introduiex una estructura html valida a la lletra");
  }

  if (!htmlRegexp.test(contentTraduccio.innerHTML)) {
    messages.push("Introduiex una estructura html valida a la traducció");
  }

  if (!contentLletraOriginal.match(/<("[^"]*"|'[^']*'|[^'">])*>/)) {
    messages.push("La lletra ha de tenir tags HTML");
  }

  if (!contentTraduccio.innerHTML.match(/<("[^"]*"|'[^']*'|[^'">])*>/)) {
    messages.push("La traducció ha de tenir tags HTML");
  }
  if (messages.length > 0) {
    console.log("Error");
    llocError.innerHTML = messages.join(", ");
  } else {
    llocError.innerHTML = "S'ha desat satisfactoriament!";
    if (idpartitura) {
      console.log("Editamos");
      await desaPartitura(
        idpartitura,
        contentTitol.value,
        contentLletraOriginal,
        contentTraduccio.innerHTML,
        contentIdiomaOriginal.value,
        "ca",
        []
      );
    } else {
      console.log("Creamos");
      //console.log(tinymce.get('content').getContent())
      //idpartitura, name, partituraoriginal, partituratraduccio, idiomaoriginal, idiomatraduccio, notes
      await desaPartitura(
        "",
        contentTitol.value,
        contentLletraOriginal,
        contentTraduccio.innerHTML,
        contentIdiomaOriginal.value,
        "ca",
        []
      );
    }
    //document.querySelector("#desaPartitura").submit();
  }
}
