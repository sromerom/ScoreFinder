"use strict";

const llocError = document.querySelector("#displayError");
const contentTitol = document.querySelector('input[name="titol"]');
const contentIdiomaOriginal = document.querySelector("select");
const contentLletraOriginal = document.querySelector(
  'textarea[name="lletraOriginal"]'
);
const contentTraduccio = document.querySelector(
  'textarea[name="traduccioCatala"]'
);

document
  .querySelector("#desaPartitura")
  .addEventListener("submit", validationForm);

function validationForm(e) {
  e.preventDefault();
  console.log("Se empieza a validar...");
  console.log("Titol: " + contentTitol);
  console.log("Idioma original: " + contentIdiomaOriginal);
  console.log("Lletra original: " + contentLletraOriginal);
  console.log("Traduccio: " + contentTraduccio);

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

  if (
    contentLletraOriginal.value === "" ||
    contentLletraOriginal.value == null
  ) {
    messages.push("La lletra es necessaria.");
  }

  if (
    contentIdiomaOriginal.value === "catala" &&
    contentLletraOriginal.value !== contentTraduccio.value
  ) {
    messages.push("La lletra i la traducció han de ser iguals.");
  }

  if (contentTraduccio.value === "" || contentTraduccio.value == null) {
    messages.push("La traducció es necessaria.");
  }

  if (contentTitol.value.match(/\S+/g).length < 3) {
    messages.push("El titol ha de tenir un minim de tres paraules");
  }

  const htmlRegexp = /^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>[^<>]*<\/\1+\s*>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/;

  if (!htmlRegexp.test(contentLletraOriginal.value)) {
    messages.push("Introduiex una estructura html valida a la lletra");
  }

  if (!htmlRegexp.test(contentTraduccio.value)) {
    messages.push("Introduiex una estructura html valida a la traducció");
  }

  if (!contentLletraOriginal.value.match(/<("[^"]*"|'[^']*'|[^'">])*>/)) {
    messages.push("La lletra ha de tenir tags HTML");
  }

  if (!contentLletraOriginal.value.match(/<("[^"]*"|'[^']*'|[^'">])*>/)) {
    messages.push("La traducció ha de tenir tags HTML");
  }
  if (messages.length > 0) {
    console.log("Error");
    llocError.innerHTML = messages.join(", ");
  } else {
    llocError.innerHTML = "S'ha desat satisfactoriament!";
    document.querySelector("#desaPartitura").submit();
  }
}
