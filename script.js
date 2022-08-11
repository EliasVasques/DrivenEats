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

    if (podeFecharPedido()) {
        const fecharPedido = document.querySelector('.fechar-pedido');
        fecharPedido.innerHTML = 'Fechar Pedido'
        fecharPedido.style.backgroundColor = '#32B72F';
    }

}

const podeFecharPedido = () => {

    let temPrato = false;
    const pratos = document.getElementsByClassName('prato');
    for (let i = 0; i < pratos.length; i++) {
        if (pratos[i].classList.contains('item-selecionado')) {
            temPrato = true;
            break;
        }
    }
    let temBebida = false;
    const bebidas = document.getElementsByClassName('bebida');
    for (let i = 0; i < bebidas.length; i++) {
        if (bebidas[i].classList.contains('item-selecionado')) {
            temBebida = true;
            break;
        }
    }
    let temSobremesa = false;
    const sobremesas = document.getElementsByClassName('sobremesa');
    for (let i = 0; i < sobremesas.length; i++) {
        if (sobremesas[i].classList.contains('item-selecionado')) {
            temSobremesa = true;
            break;
        }
    }

    if (temPrato && temBebida && temSobremesa) return true;
    else return false;
}

const fecharPedido = () => {
    const todosItens = [
        ...document.getElementsByClassName('prato'), 
        ...document.getElementsByClassName('bebida'), 
        ...document.getElementsByClassName('sobremesa')
    ];
    
    /* pegar valor */
    let valor = 0;
    for(let i=0; i < todosItens.length; i++) {
        if(todosItens[i].classList.contains('item-selecionado')) {
            let precoString = todosItens[i].querySelector('.preco').innerHTML;
            valor += Number(pegarValorInteiro(precoString)); 
        }
    }

    if (podeFecharPedido()) {
        const texto = `Olá, gostaria de fazer o pedido:
        - Prato: Frango Yin Yang
        - Bebida: Coquinha Gelada
        - Sobremesa: Pudim
        Total: R$ ${valor.toFixed(2)}`
        const url = 'https://wa.me/?text=' + encodeURIComponent(texto);
        let enviarMsgWhats = window.open(url, '_blank');
        enviarMsgWhats.focus();
    }
}

const pegarValorInteiro = (preco) => {
    return preco.replace(',', '.').slice(2);
}