import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState, useEffect } from 'react'
import './styles.css';
import ClienteService from '../../Service/clienteService';
import ProdutosService from '../../Service/produtosService';
import { mensagemErro, mensagemSucesso } from '../../Configurations/mensagem';

function validar(usuario){

    let net = true;
    if(!usuario.nome)
    {
        net = false;
        mensagemErro('Preencha o campo nome')
    }
    if(!usuario.email){
        net = false;
        mensagemErro('Preencha o campo email')
    }
    if(!usuario.senha){
        net = false;
        mensagemErro('Preencha o campo senha')
    }
    if(!usuario.dataNascimento){
        net = false;
        mensagemErro('Preencha o campo data de nascimento')
    }
    if(!usuario.cpf){
        net = false;
        mensagemErro('Preencha o campo CPF')
    }
    if(!usuario.cep){
        net = false;
        mensagemErro('Preencha o campo cep')
    }
    if(!usuario.rua){
        net = false;
        mensagemErro('Preencha o campo rua')
    }
    if(!usuario.descricao){
        net = false;
        mensagemErro('Preencha o campo descricao')
    }

    return net;
}

function Cadastro_Cliente(){
    const serviceCliente = new ClienteService()
    const serviceProduto = new ProdutosService()

    /*const[listacategoria, setListacategorias] =useState([])
    const[listarCliente, setlistarCliente] = useState([])*/

    const[usuario, setCliente] = useState({
        id: null,
        nome:'',
        email:'',
        senha:'',
        dataNascimento:'',
        cpf:'',
        cep:'',
        rua:'',
        descricao:''
    })
    
    const visualizar =(id)=>{
        serviceCliente.recuperar(id).then(
            resposta=>{
                setCliente(resposta.data)
                window.scrollTo({top:0, behavior: 'smooth'})
            }
        ).catch(
            error =>{
                mensagemErro("Erro ao atualizar clientes" + error.response.data)
            }
        )
    }

    const salvar= ()=>{
        const net = validar(usuario)
        if(net){
            serviceCliente.salvar(usuario).then(
                resposta =>{
                    mensagemSucesso('Dados salvos com sucesso! Código: ' + resposta.data.id)
                    setCliente({
                        id: null,
                        nome:'',
                        email:'',
                        senha:'',
                        dataNascimento:'',
                        cpf:'',
                        cep:'',
                        rua:'',
                        descricao:''
                    })
                }
            ).catch(
                error =>{
                    mensagemErro("Erro ao salvar" + error.response.data)
                }
            )
        }
    }

    return(
        <div className='container'>
            <h1 className="Titulo-Registrar">Registrar</h1>
            <div className="row">
                <div className='col-4 mx-auto'>
                    <label for="inputNome" className="form-label mt-4">Nome</label>
                    <input value={usuario.nome} onChange={e=>{setCliente({...usuario, nome:e.target.value})}} type="text" className="form-control" id="inputNome" placeholder="Insira nome"/>
                </div>
                <div className='col-4 mx-auto'>
                    <label for="inputEmail" className="form-label mt-4">Email</label>
                    <input value={usuario.email} onChange={e=>{setCliente({...usuario, email:e.target.value})}} type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Insira email"/>
                </div>
                <div className='col-4 mx-auto'>
                    <label for="inputSenha" className="form-label mt-4">Senha</label>
                    <input value={usuario.senha} onChange={e=>{setCliente({...usuario, senha:e.target.value})}} type="password" className="form-control" id="inputSenha" placeholder="Insira a senha" autocomplete="off"/>
                </div>
            </div>
            <div className="row">
                <div className='col-4 mx-auto'>
                    <label for="inputDataNascimento" className="form-label mt-4">Data de Nascimento</label>
                    <input value={usuario.dataNascimento} onChange={e=>{setCliente({...usuario, dataNascimento:e.target.value})}} type="date" className="form-control" id="inputDataNascimento"/>
                </div>
                <div className='col-4 mx-auto'>
                    <label for="inputCPF" className="form-label mt-4">CPF</label>
                    <input value={usuario.cpf} onChange={e=>{setCliente({...usuario, cpf:e.target.value})}} type="text" className="form-control" id="inputCPF" placeholder="Insira CPF"/>
                </div>
                <div className='col-4 mx-auto'>
                    <label for="inputCEP" className="form-label mt-4">CEP</label>
                    <input value={usuario.cep} onChange={e=>{setCliente({...usuario, cep:e.target.value})}} type="text" className="form-control" id="inputCEP" placeholder="Insira CEP"/>
                </div>
            </div>
            <div className="row">
                <div className='col-6 mx-auto'>
                    <label for="inputRua" className="form-label mt-4">Rua</label>
                    <input value={usuario.rua} onChange={e=>{setCliente({...usuario, rua:e.target.value})}} type="text" className="form-control" id="inputRua" placeholder="Insira Rua"/>
                </div>
                <div className='col-6 mx-auto'>
                    <label for="inputDescricao" className="form-label mt-4">Descrição</label>
                    <input value={usuario.descricao} onChange={e=>{setCliente({...usuario, descricao:e.target.value})}} type="text" className="form-control" id="inputDescricao" placeholder="Insira Descrição"/>
                </div>
            </div>
            <br></br>
            <div className='col-6 mx-1'>
                <button type="button" onClick={salvar} className="btn btn-primary">Registar</button>
            </div>
        </div>
    )
}

export default Cadastro_Cliente;
