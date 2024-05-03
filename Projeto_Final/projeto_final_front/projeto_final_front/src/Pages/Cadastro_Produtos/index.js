import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState } from 'react'
import './styles.css';

function Cadastro_Produto(){

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [imagem, setImagem] = useState('')

    const handleImageChange = (e) => {
        setImagem(URL.createObjectURL(e.target.files[0]))
    }

    return(
        <div className='container'>
            <h1 className="Titulo-Registrar">Cadastro de Produto</h1>
            <div className="row">
                <div className='col-6 mx-auto'>
                    <label for="inputNome" className="form-label mt-4">Nome do Produto</label>
                    <input type="text" className="form-control" id="inputNome" placeholder="Insira o nome do produto" value={nome} onChange={e=>{setNome(e.target.value)}}/>
                </div>
                <div className='col-6 mx-auto'>
                    <label for="inputDescricao" className="form-label mt-4">Descrição</label>
                    <input type="text" className="form-control" id="inputDescricao" placeholder="Insira a descrição do produto" value={descricao} onChange={e=>{setDescricao(e.target.value)}}/>
                </div>
            </div>
            <div className="row">
                <div className='col-6 mx-auto'>
                    <label for="inputPreco" className="form-label mt-4">Preço</label>
                    <input type="number" className="form-control" id="inputPreco" placeholder="Insira o preço do produto" value={preco} onChange={e=>{setPreco(e.target.value)}}/>
                </div>
                <div className='col-6 mx-auto'>
                    <label for="inputQuantidade" className="form-label mt-4">Quantidade em Estoque</label>
                    <input type="number" className="form-control" id="inputQuantidade" placeholder="Insira a quantidade em estoque" value={quantidade} onChange={e=>{setQuantidade(e.target.value)}}/>
                </div>
            </div>
            <div className="row">
                <div className='col-6 mx-2'>
                    <label for="inputImagem" className="form-label mt-4">Imagem do Produto</label>
                    <input type="file" className="form-control" id="inputImagem" onChange={handleImageChange}/>
                    {imagem && <img src={imagem} alt="Imagem do Produto" style={{width: '100%', marginTop: '10px'}}/>}
                </div>
            </div>
            <br/>
            <div className='col-6 mx-1'>
                    <button type="button" className="btn btn-info">Salvar Produto</button>
                    <button type="button" class="btn btn-danger">Cancelar Produto</button>
            </div>
        </div>
    )
}

export default Cadastro_Produto;
