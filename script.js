

function itemEscolhido(itemSelecionado, tipoItem) {
    let cont = 0;
    while (true) {
        const elemento = document.getElementsByClassName(tipoItem)[cont];

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

    if(podeFecharPedido()) {
        const fecharPedido = document.querySelector('.fechar-pedido');
        fecharPedido.innerHTML = 'Fechar Pedido'
        fecharPedido.style.backgroundColor = '#32B72F';
    }


}

const podeFecharPedido = () => {

    let temPrato = false;
    const pratos = document.getElementsByClassName('prato');
    for (let i=0; i < pratos.length; i++) {
        if(pratos[i].classList.contains('item-selecionado')) {
            temPrato = true;
            break;
        }
    }

    let temBebida = false;
    const bebidas = document.getElementsByClassName('bebida');
    for (let i=0; i < bebidas.length; i++) {
        if(bebidas[i].classList.contains('item-selecionado')) {
            temBebida = true;
            break;
        }
    }
    let temSobremesa = false;
    const sobremesas = document.getElementsByClassName('sobremesa');
    for (let i=0; i < sobremesas.length; i++) {
        if(sobremesas[i].classList.contains('item-selecionado')) {
            temSobremesa = true;
            break;
        }
    }

    if(temPrato && temBebida && temSobremesa) return true;
    else return false;
}