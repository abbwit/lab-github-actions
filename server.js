const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let carrinho = {
    quantidadeTotal: 0,
    produtos: []
};

app.get('/api/carrinho', (req, res) => {
    res.json(carrinho);
});

app.post('/api/carrinho/adicionar', (req, res) => {
    const { produtoId, nome } = req.body;
    
    carrinho.quantidadeTotal += 1;
    carrinho.produtos.push({ id: produtoId, nome: nome, adicionadoEm: new Date() });
    
    console.log(`[Backend] Produto adicionado: ${nome}. Total no carrinho: ${carrinho.quantidadeTotal}`);
    
    res.json({
        sucesso: true,
        quantidadeTotal: carrinho.quantidadeTotal
    });
});

app.use(express.static(path.join(__dirname, '.')));

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend ativo na porta ${PORT}`);
});