function itemEscolhido(itemSelecionado) {
    let cont = 0;
    while (true) {
        const elemento = document.getElementsByClassName('prato')[cont];

        if (elemento === undefined) break

        cont++;
        elemento.classList.remove('item-selecionado');
    }

    if (itemSelecionado.classList.contains('item-selecionado')) {
        itemSelecionado.classList.remove('item-selecionado');
    }
    else {
        itemSelecionado.classList.add('item-selecionado');
    }
}