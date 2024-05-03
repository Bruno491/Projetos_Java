import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState } from 'react'
import './styles.css';
import Header from '../../Componente/Header';

function Exibir_Produtos(){
    const [produtos, setProdutos] = useState([
        {id: 1, nome: 'Brownie 1', imagem: 'url da imagem 1', descricao: 'Descrição do produto 1'},
        {id: 2, nome: 'Brownie 2', imagem: 'url da imagem 2', descricao: 'Descrição do produto 2'},
    ])

    return(
        <div>
            <Header />
            <div className='container'>
                <div className="row">
                    {produtos.map(produto => (
                        <div className='col-4 mx-auto' key={produto.id}>
                            <img src={produto.imagem} alt={produto.nome} className="img-thumbnail" />
                            <h2>{produto.nome}</h2>
                            <button onClick={() => { /*página de detalhes do produto */ }}>Ver detalhes</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Exibir_Produtos;
