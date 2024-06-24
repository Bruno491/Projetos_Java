import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState, useEffect } from 'react'
import './styles.css';
import Header from '../../Componente/Header';
import ProdutoService from '../../Service/produtosService';
import { mensagemErro, mensagemSucesso } from '../../Configurations/mensagem';

function Exibir_Produtos(){
    const serviceProduto = new ProdutoService()

    const[listarProduto, setlistaProduto] = useState([])
    const[Foto, setFoto] = useState(null);

    useEffect(()=>{
        atualizarListaProduto()
        serviceProduto.listar().then((resposta)=>{
            resposta.data.sort((a,b) => a.descricao.localeCompare(b.descricao));
        }).catch((error)=>{ console.log(error.response.data) })
    }, [])

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
    /*const carregaFoto = (nomeFoto) => {
        if (nomeFoto) {
            serviceProduto.getImagem(`/getimagem/${nomeFoto}`).then(resposta => {
                setFoto(`data:image/jpeg;base64,${resposta.data}`);
            }).catch(error => {
                console.log(error.response.data)
            })
        } else {
            setFoto(null)
        }
    }*/
    

    const atualizarListaProduto = ()=>{
        serviceProduto.listar().then(
            resposta=>{
                setlistaProduto(resposta.data)

                carregaFoto(resposta.data.Foto)
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        ).catch(
            error =>{
                mensagemErro("Erro ao atualizar produtos" + error.response.data)
            }
        )
    }

    return(
        <div>
            <Header />
            <div className='container'>
                <div className="row">
                    {listarProduto.map((item) =>{
                        return(
                            <div className="card mb-3" key={item.id}>
                                <h3 className="card-header">{item.nome_produto}</h3>
                                <img src={`data:image/jpeg;charset=utf-8;base64,${Foto}`}  width="150px" height="150px"  className="img-fluid" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.descricao}</h5>
                                    <h6 className="card-subtitle text-muted">Preço: {item.preco}</h6>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-success">Comprar</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
    
}

export default Exibir_Produtos;