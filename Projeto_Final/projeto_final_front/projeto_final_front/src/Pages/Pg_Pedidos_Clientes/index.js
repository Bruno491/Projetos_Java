import React from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import { useEffect, useState } from 'react'
import './styles.css';
import Header from '../../Componente/Header';
import { mensagemErro, mensagemSucesso } from "../../Configurations/mensagem";
import Pg_peidos_clienteService from "../../Service/pg_peidos_clienteService";
import produtoService from "../../Service/produtosService";
import ClienteService from "../../Service/clienteService";

function validar(pedidos_cliente){
    let ret = true;
   
    ////......
    return ret;
}

function Pg_Pedidos_Clientes() {
    const service = new Pg_peidos_clienteService()
    const serviceproduto = new produtoService()
    const serviceCliente = new ClienteService()

    const[idproduto, setidProduto] = useState(0)
    const[qtde, setQtde] = useState(0)
    const[valor, setValor] = useState(0)
    const[nomeproduto, setnomeProduto] = useState('')
    const[listaItensProdutos, setItensProdutos] = useState([])
    const[listaProduto, setListaProdutos] = useState([])

    const[venda_produto, setVenda_produto] = useState({
        "id":null,
        "data": "",
        "total" : 0,
        "cliente" : {"id" : 0},
        "itensPedidos" : [{
          "id":0,
          "valor": 0,
          "qtde" : 0,
          "produto" : {
            "id":0
          }
        }]
    })

    useEffect( ()=>{
  
        serviceproduto.recuperar(idproduto).then(
            resposta=>{
                setValor(resposta.data.valor * qtde)
                setnomeProduto(resposta.data.descricao)
            }
        ).catch(
            error=>{
                console.log(error.response.data)
            }
        )
        
    }, [idproduto, qtde])

    useEffect(()=>{
        calcularTotal();
      }, [listaItensProdutos])

    useEffect(()=>{
       
        serviceproduto.listar().then((resposta)=>{
            resposta.data.sort((a,b) => a.descricao.localeCompare(b.descricao));
            setListaProdutos([...resposta.data])
        }).catch((error)=>{ console.log(error.response.data) })
        
        atualizarListaPedidos()
    },[])

    const limpar = ()=>{
        setItensProdutos([])
        setVenda_produto({
            "id":null,
            "data": "",
            "total" : 0,
            "cliente" : {"id" : 0},
            "itensPedidos" : [{
              "id":0,
              "valor": 0,
              "qtde" : 0,
              "produto" : {
                "id":0
              }
            }]
        })
    }
    const atualizarListaPedidos = ()=>{
        service.listar().then((resposta)=>{
            resposta.data.sort((a,b) => a.cliente.nome.localeCompare(b.cliente.nome));
            setListaProdutos([...resposta.data])
        }).catch((error)=>{ console.log(error.response.data) })
    }

    const excluir = (id)=>{ //Realizar quando possivel
        if(window.confirm('Confirma a exclusão?'))
        {
            service.deletar(id).then(
                resposta=>{
                    atualizarListaPedidos()
                    mensagemSucesso("Venda excluída com sucesso!")
                }
            ).catch(
            error=>{
                mensagemErro("Erro ao excluir. " + error.response.data)
                }
            )
        }
    }

    const salvar= ()=>{
        const ret = validar(venda_produto)
        if(ret){
            
            venda_produto.itensPedidos = listaItensProdutos;
            service.salvar(venda_produto).then(
                
                resposta =>{
                    setItensProdutos([])
                            atualizarListaPedidos()
                            mensagemSucesso('Dados salvos com sucesso! Código: '+ resposta.data.id )
                             setVenda_produto({
                                "id":null,
                                "data": "",
                                "total" : 0,
                                "cliente" : {"id" : 0},
                                "itensPedidos" : [{
                                  "id":0,
                                  "valor": 0,
                                  "qtde" : 0,
                                  "produto" : {
                                    "id":0
                                  }
                                }]
                              })
                        }
            ).catch(
                error => {
                    mensagemErro("Erro ao salvar. " + error.response.data)
                }
            )
        }
    }

    const adicionarItem = ()=>{

        if(qtde > 0 && idproduto > 0){
            const item = {
                "id":0,
                "valor": valor,
                "qtde" : qtde,
                "produto" : {
                    "id":idproduto,
                    "descricao" : nomeproduto
                }
            }
            setItensProdutos([...listaItensProdutos, item])
            setQtde(0)
            setValor(0)
            setidProduto(0)
            setnomeProduto('')
        }
    }

    const excluirItem = (index)=>{
        const itens = [...listaItensProdutos]
        itens.splice(index, 1)
        setItensProdutos(itens)
    }

    const calcularTotal = ()=>{
        let total = 0
        listaItensProdutos.forEach((item)=>{
            total += item.valor
        })
        setVenda_produto({...venda_produto, total:total})
    }

    return (
        <div>
            <Header />
            <div className='container'>
            <h1>Seus Pedidos</h1>
            <div className="mb-3">
                <label htmlFor="data" className="form-label">Agende a data para entrega do pedido</label>
                <input type="date" value={venda_produto.data} onChange={e=>{setVenda_produto({...venda_produto, data:e.target.value})}} className="form-control" id="data" />
            </div>

            <div className="mb-3">
                <hr/>
                <div className="row">
                    <div className="col-4">
                        <label htmlFor="produto" className="form-label">Produto</label>
                        <select className="form-control" id="produto"
                            value={idproduto}
                            onChange={e=>setidProduto(e.target.value)}>
                        
                            <option value='0'>Selecione uma opção....</option>
                            {listaProduto.map((item)=>{
                                return(
                                    <option value={item.id} key={item.id}>
                                        {item.descricao}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="col-3">
                        <label htmlFor="qtde" className="form-label">Qtde</label>
                        <input  
                        type="number" 
                        value={qtde}
                        onChange={e=>setQtde(e.target.value)}
                        
                        className="form-control" id="qtde" />
                    </div>

                    <div className="col-3">
                    <label htmlFor="valor" className="form-label">Valor</label>
                        <input   readOnly
                        type="number" 
                        value={valor}
                        onChange={e=>setValor(e.target.value)}
                        className="form-control" id="valor" />
                    </div>

                    <div className="col-2">
                        <button type="button" onClick={adicionarItem} className="btn btn-primary">+</button>
                    </div>


                </div>
            </div>
            <h2>Itens do Pedido</h2>
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Qtde</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Excluir</th>
                </tr>
            </thead>
            <tbody>
                
                {listaItensProdutos.map((item, index)=> { 
                    return (
                        <tr key={index}>
                            <th scope="row">{item.produto.id}</th>
                            <td>{item.produto.descricao}</td>
                            <td>{item.qtde}</td>
                            <td>{item.valor}</td>
                        </tr>
                    ) } )}
        </tbody>
    </table>

    <div className="mb-3">
                <label htmlFor="total" className="form-label">Total Geral</label>
                <input  value={venda_produto.total} readOnly
                onChange={e=>{             
                    setVenda_produto({...venda_produto, total:e.target.value})}}
                    type="number"
                    className="form-control" id="total" />
            </div>

            <div className="mb-3">
            <button type="button" onClick={salvar} className="btn btn-primary">
                Salvar</button> &nbsp;
                <button type="button" onClick={limpar} className="btn btn-warning">
                limpar</button>
            </div>
<hr/>
            <h2>Pedidos</h2>
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Excluir</th>
                </tr>
            </thead>
    </table>

        </div>
        </div>
    );
}

export default Pg_Pedidos_Clientes;
