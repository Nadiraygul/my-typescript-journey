import { gizliSayac } from "./counter";

document.addEventListener("DOMContentLoaded", () => {
  const sayac = gizliSayac();

  const sayacDiv = document.getElementById("sayac")!;
  const butonArtir = document.getElementById("artir")!;
  const butonAzalt = document.getElementById("azalt")!;
  const butonSifirla = document.getElementById("sifirla")!;

  function guncelle() {
    sayacDiv.textContent = sayac.goster().toString();
  }

  butonArtir.addEventListener("click", () => {
    sayac.artir();
    guncelle();
  });

  butonAzalt.addEventListener("click", () => {
    sayac.azalt();
    guncelle();
  });

  butonSifirla.addEventListener("click", () => {
    sayac.sifirla();
    guncelle();
  });

  guncelle();
});
