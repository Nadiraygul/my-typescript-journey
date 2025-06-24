export function gizliSayac() {
    let deger = 0;
    return {
        artir: () => ++deger,
        azalt: () => --deger,
        sifirla: () => { deger = 0; },
        goster: () => deger
    };
}
