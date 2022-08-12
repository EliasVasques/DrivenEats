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
        fecharPedido.classList.add('liberado');
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

    if (!podeFecharPedido()) return;

    document.querySelector('.confirmar-pedido').classList.remove('nao-aparece');
    document.querySelector('.background-confirmar-pedido').classList.remove('nao-aparece');

    /* informação pra confirmar pedido */
    const nomesItens = pegarNomeOuValoresItensSelecionados(1);
    const valores = pegarNomeOuValoresItensSelecionados(2);

    const confirmarPedidoNomes = document.querySelectorAll('.item .nome');
    for (let i = 0; i < confirmarPedidoNomes.length; i++) {
        confirmarPedidoNomes[i].innerHTML = nomesItens[i];
    }

    const confirmarPedidoPrecos = document.querySelectorAll('.item .preco');
    for (let i = 0; i < confirmarPedidoPrecos.length; i++) {
        confirmarPedidoPrecos[i].innerHTML = `R$ ${valores[i]},00`;
    }

    /* calcular total */
    const total = valores.reduce((soma, valor) => {
        return soma += valor;
    }, 0)
    const confirmarPedidoTotal = document.querySelector('.total-info .preco');
    confirmarPedidoTotal.innerHTML = `R$ ${total},00`;
    
}

const cancelarPedido = () => {
    document.querySelector('.confirmar-pedido').classList.add('nao-aparece');
    document.querySelector('.background-confirmar-pedido').classList.add('nao-aparece');
}

const pegarNomeOuValoresItensSelecionados = (oqueQuer) => {
    const todosItens = [
        ...document.getElementsByClassName('prato'),
        ...document.getElementsByClassName('bebida'),
        ...document.getElementsByClassName('sobremesa')
    ];
    const nomesItens = [];
    const valores = [];
    for (let i = 0; i < todosItens.length; i++) {
        if (todosItens[i].classList.contains('item-selecionado')) {
            let precoString = todosItens[i].querySelector('.preco').innerHTML;
            valores.push(pegarValorInteiro(precoString));
            nomesItens.push(todosItens[i].querySelector('.nome').innerHTML)
        }
    }
    if(oqueQuer === 1) return nomesItens;
    else if(oqueQuer === 2) return valores;
    return;
}
const confirmarPedido = () => {

    if (!podeFecharPedido()) return;

    const nomesItens = pegarNomeOuValoresItensSelecionados(1);
    const valores = pegarNomeOuValoresItensSelecionados(2);

    /* calcular total */
    const total = valores.reduce((soma, valor) => {
        return soma += valor;
    }, 0)

    /* informação pra mensagem */
    const nome = prompt("Nome: ");
    const endereco = prompt("Endereço: ");
    const texto =
        `Olá, gostaria de fazer o pedido:
        - Prato: ${nomesItens[0]}
        - Bebida: ${nomesItens[1]}
        - Sobremesa: ${nomesItens[2]}
        Total: R$ ${total.toFixed(2)}
        
        Nome: ${nome}
        Endereço: ${endereco}`
    const url = 'https://wa.me/?text=' + encodeURIComponent(texto);

    /* enviar whatsaap */
    let enviarMsgWhats = window.open(url, '_blank');
    enviarMsgWhats.focus();
}

const pegarValorInteiro = (preco) => {
    return Number(preco.replace(',', '.').slice(2));
}