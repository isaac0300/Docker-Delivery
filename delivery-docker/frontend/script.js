const API = "http://localhost:8083";


async function carregarPedidos() {

    const resposta = await fetch(`${API}/pedidos`);
    const pedidos = await resposta.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    pedidos.forEach(p => {
        lista.innerHTML += `
            <div class="pedido">
                <strong>${p.item}</strong> — ${p.cliente}
                <br><small>${p.endereco}</small>
                <br><span class="status">${p.status}</span>
            </div>
        `;
    });
}


async function salvarPedido() {

    const cliente = document.getElementById("cliente").value;
    const item = document.getElementById("item").value;
    const endereco = document.getElementById("endereco").value;

    if (cliente === "" || item === "") {
        return;
    }

    await fetch(`${API}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, item, endereco })
    });

    document.getElementById("cliente").value = "";
    document.getElementById("item").value = "";
    document.getElementById("endereco").value = "";

    carregarPedidos();
}


carregarPedidos();
