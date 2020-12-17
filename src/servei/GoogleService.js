export async function getIdiomes() {
  const fetchIdiomes = await fetch(
    "http://server247.cfgs.esliceu.net/piano/nologin/google/translate/languages",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        //"Content-Type": "application/json",
      },
    }
  );

  const idiomes = await fetchIdiomes.json();
  return idiomes;
}

export async function tradueix(idiomaOriginal, idiomaDesti, text) {
  console.log(idiomaOriginal, idiomaDesti, text)
  
  const fetchTraduccio = await fetch(
    "http://server247.cfgs.esliceu.net/piano/nologin/google/translate",
    {
      method: "POST",
      body: JSON.stringify({
        languageFrom: idiomaOriginal,
        languageTo: "ca",
        text: text
      }),
      headers: {
        //"Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
      },
    }
  );

  const traduccio = await fetchTraduccio.text();
  return traduccio;

}