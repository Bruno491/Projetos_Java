import React from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState } from 'react'
import './styles.css';
import Header from '../../Componente/Header';

function Pg_Pedidos_Clientes() {
    const pedidos = [
        { id: 1, produtos: ['Produto 1', 'Produto 2'], total: 100, status: 'Em processamento' },
        // outros pedidos aqui
    ];

    return (
        <div>
            <Header />
            <h1>Seus Pedidos</h1>
            {pedidos.map(pedido => (
                <div key={pedido.id}>
                    <h2>Pedido #{pedido.id}</h2>
                    <p>Produtos: {pedido.produtos.join(', ')}</p>
                    <p>Total: {pedido.total}</p>
                    <p>Status: {pedido.status}</p>
                </div>
            ))}
        </div>
    );
}

export default Pg_Pedidos_Clientes;
