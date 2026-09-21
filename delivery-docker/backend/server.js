const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const banco = mysql.createPool({
    host: "banco",
    user: "root",
    password: "123456",
    database: "delivery"
});

app.get("/pedidos", (req, res) => {
    banco.query("SELECT * FROM pedidos ORDER BY id DESC", (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao buscar pedidos" });
        }
        res.json(resultados);
    });
});

app.post("/pedidos", (req, res) => {
    const { cliente, item, endereco } = req.body;

    banco.query(
        "INSERT INTO pedidos (cliente, item, endereco, status) VALUES (?, ?, ?, 'recebido')",
        [cliente, item, endereco],
        (erro) => {
            if (erro) {
                return res.status(500).json({ erro: "Erro ao salvar pedido" });
            }
            res.json({ mensagem: "Pedido registrado" });
        }
    );
});

app.listen(3003, () => {
    console.log("Backend do Delivery Express rodando na porta 3003");
});
