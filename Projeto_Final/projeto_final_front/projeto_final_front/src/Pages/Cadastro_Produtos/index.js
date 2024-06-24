import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState, useEffect } from 'react'
import './styles.css';
import { mensagemErro, mensagemSucesso } from '../../Configurations/mensagem';
import ProdutoService from '../../Service/produtosService';
import Header from '../../Componente/Header';

function validar(produto){

    let net = true;
    if(!produto.nome_produto)
    {
        net = false;
        mensagemErro("Preencha o campo nome");
    }
    if(!produto.descricao)
    {
        net = false;
        mensagemErro("Preencha todos a descrição");
    }
    if(!produto.preco)
    {
        net = false;
        mensagemErro("Preencha todos o preco");
    }
    if(!produto.quantidade)
    {
        net = false;
        mensagemErro("Preencha todos a quantidade");
    }
    return net;
}

function Cadastro_Produto(){

    const serviceProduto = new ProdutoService()

    const[listarProduto, setlistaProduto] = useState([])
    const [file, setFile] = useState(null);
    const[foto, setFoto] = useState(null);
    

    const[produto, setProduto] = useState({
        id: null,
        nome_produto: '',
        descricao: '',
        preco: '',
        quantidade: '',
        Foto:null,
    })

    useEffect(()=>{
        atualizarListaProduto()
        serviceProduto.listar().then((resposta)=>{
            resposta.data.sort((a,b) => a.descricao.localeCompare(b.descricao));
        }).catch((error)=>{ console.log(error.response.data) })
    }, [])

    const atualizarListaProduto = ()=>{
        serviceProduto.listar().then(
            resposta=>{
                setlistaProduto(resposta.data)
            }
        ).catch(
            error =>{
                mensagemErro("Erro ao atualizar produtos" + error.response.data)
            }
        )
    }

    const carregaFoto = (nomeFoto)=>{
        if(nomeFoto){

        serviceProduto.getImagem(`/getimagem/${nomeFoto}`).then(resposta=>{
           
            const base64 = btoa(
                new Uint8Array(resposta.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              )
           
              setFoto(base64)
          


        }).catch(error=>{
            console.log(error.response.data)
        })
    }
    else    setFoto(null)
    }
    

    const excluir = (id) => {
        serviceProduto.deletar(id).then(resposta => {
            if(window.confirm("Confirma a exclusão?")){
                mensagemSucesso('Produto excluido com sucesso!')
                atualizarListaProduto()
            }
        }).catch(error => {
            mensagemErro("Erro ao atualizar produto" + error.response.data)
        })
    }

    const visualizar =(id)=>{
        serviceProduto.recuperar(id).then(
            resposta=>{
                setProduto(resposta.data)
                carregaFoto(resposta.data.foto)
                window.scrollTo({top:0, behavior: 'smooth'})
            }
        ).catch(
            error =>{
                mensagemErro("Erro ao atualizar produto" + error.response.data)
            }
        )
    }

    const salvar= ()=>{
        const net = validar(produto)
        if(net){
            serviceProduto.salvar(produto).then(
                resposta =>{
                    if(file){
                        let formData = new FormData()
                        formData.append('file', file)
                        serviceProduto.salvarFoto(resposta.data.id, formData).then(
                            resposta=>{
                                mensagemSucesso('Dados salvos com sucesso! Código: ' + resposta.data.id)
                                setFoto(null)
                                /*atualizarListaProduto()*/
                                setProduto({
                                    id: null,
                                    nome_produto: '',
                                    descricao: '',
                                    preco: '',
                                    quantidade: '',
                                    Foto: null
                                })
                            }
                        ).catch(error => {
                            mensagemErro("Erro ao salvar foto " + 
                            error.response.data)
                        })
                        
                    }
                    else{
                        atualizarListaProduto()
                        setProduto({
                            id: null,
                            nome_produto: '',
                            descricao: '',
                            preco: '',
                            quantidade: '',
                            Foto: null
                        })
                    }
                }
            ).catch(
                (error) =>{
                    mensagemErro("Erro ao salvar" + error.response.data)
                }
            )
        }
    }

    return(
        <div>

            <Header />

            <div className='container'>
            <h1 className="Titulo-Registrar">Cadastro de Produto</h1>
            <div className="row">
                <div className='col-6 mx-auto'>
                    <label htmlFor="inputNome" className="form-label mt-4">Nome do Produto</label>
                    <input value={produto.nome_produto} onChange={e=>{setProduto({...produto, nome_produto:e.target.value})}} type="text" className="form-control" id="inputNome" placeholder="Insira o nome do produto"/>
                </div>
                <div className='col-6 mx-auto'>
                    <label htmlFor="inputDescricao" className="form-label mt-4">Descrição</label>
                    <input value={produto.descricao} onChange={e=>{setProduto({...produto, descricao:e.target.value})}} type="text" className="form-control" id="inputDescricao" placeholder="Insira a descrição do produto"/>
                </div>
            </div>
            <div className="row">
                <div className='col-6 mx-auto'>
                    <label htmlFor="inputPreco" className="form-label mt-4">Preço</label>
                    <input value={produto.preco} onChange={e=>{setProduto({...produto, preco:e.target.value})}} type="number" className="form-control" id="inputPreco" placeholder="Insira o preço do produto"/>
                </div>
                <div className='col-6 mx-auto'>
                    <label htmlFor="inputQuantidade" className="form-label mt-4">Quantidade</label>
                    <input value={produto.quantidade} onChange={e=>{setProduto({...produto, quantidade:e.target.value})}} type="number" className="form-control" id="inputQuantidade" placeholder="Insira o quantidade do produto"/>
                </div>
                <div className="mb-3">
                <label htmlFor="foto" className="form-label">Foto</label>
                <input  onChange= {(e) => setFile(e.target.files[0])} value ={""} type="file" className="form-control" id="foto" />
                    <img src={`data:image/jpeg;charset=utf-8;base64,${foto}`}  width="150px" height="150px"  className="img-fluid" />
                </div>
            </div>
            <br/>
            <div className='col-6 mx-1'>
                <button type="button" className="btn btn-primary" onClick={salvar}>Salvar Produto</button>
            </div>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Código</th>
                <th scope="col">Nome</th>
                <th scope="col">Alterar</th>
                <th scope="col">Excluir</th>
                </tr>
            </thead>
            <tbody>
                {listarProduto.map((item) =>{
                    return(
                        <tr Key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.nome_produto}</td>
                            <td><button type="button" onClick={()=>(visualizar(item.id))} className="btn btn-success">Vizualizar</button></td>
                            <td><button type="button" onClick={()=>(excluir(item.id))} className="btn btn-danger">Excluir</button></td>
                        </tr>
                    )
                }
                )}
            </tbody>
            </table>
        </div>

        </div>
    )
}

export default Cadastro_Produto;
