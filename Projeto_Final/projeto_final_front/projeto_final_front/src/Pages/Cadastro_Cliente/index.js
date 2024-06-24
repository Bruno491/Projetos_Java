import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState, useEffect } from 'react'
import './styles.css';
import { mensagemErro, mensagemSucesso } from '../../Configurations/mensagem';
import ClienteService from '../../Service/clienteService';

function validar(usuario){

    let net = true;
    if(!usuario.nome)
    {
        net = false;
        mensagemErro('Preencha o campo nome')
    }
    if(!usuario.email)
    {
        net = false;
        mensagemErro('Preencha o campo email')
    }
    if(!usuario.senha){
        net = false;
        mensagemErro('Preencha o campo senha')
    }
    if(!usuario.data_nascimento){
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

    const[usuario, setCliente] = useState({
        id: null,
        nome:'',
        email:'',
        senha:'',
        data_nascimento:'',
        cpf:'',
        cep:'',
        rua:'',
        descricao:'',
        tipo_usuario:'2'
    })

    const salvar= ()=>{
        const net = validar(usuario)
        if(net){
            usuario.data_nascimento = new Date(usuario.data_nascimento);

            serviceCliente.salvar(usuario).then(
                resposta =>{
                    mensagemSucesso('Dados salvos com sucesso! Código: ' + resposta.data.id)
                    setCliente({
                        id: null,
                        nome:'',
                        email:'',
                        senha:'',
                        data_nascimento:'',
                        cpf:'',
                        cep:'',
                        rua:'',
                        descricao:'',
                        tipo_usuario:'2'
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
                    <label htmlFor="inputNome" className="form-label mt-4">Nome</label>
                    <input value={usuario.nome} onChange={e=>{setCliente({...usuario, nome:e.target.value})}} type="text" className="form-control" id="inputNome" placeholder="Insira nome"/>
                </div>
                <div className='col-4 mx-auto'>
                    <label htmlFor="inputEmail" className="form-label mt-4">Email</label>
                    <input value={usuario.email} onChange={e=>{setCliente({...usuario, email:e.target.value})}} type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Insira email"/>
                </div>
                <div className='col-4 mx-auto'>
                    <label htmlFor="inputSenha" className="form-label mt-4">Senha</label>
                    <input value={usuario.senha} onChange={e=>{setCliente({...usuario, senha:e.target.value})}} type="password" className="form-control" id="inputSenha" placeholder="Insira a senha" autocomplete="off"/>
                </div>
            </div>
            <div className="row">
                <div className='col-4 mx-auto'>
                    <label htmlFor="inputData_Nascimento" className="form-label mt-4">Data de Nascimento</label>
                    <input value={usuario.data_nascimento} onChange={e=>{setCliente({...usuario, data_nascimento:e.target.value})}} type="date" className="form-control" id="inputData_Nascimento"/>
                </div>
                <div className='col-4 mx-auto'>
                    <label htmlFor="inputCPF" className="form-label mt-4">CPF</label>
                    <input value={usuario.cpf} onChange={e=>{setCliente({...usuario, cpf:e.target.value})}} type="text" className="form-control" id="inputCPF" placeholder="Insira CPF"/>
                </div>
                <div className='col-4 mx-auto'>
                    <label htmlFor="inputCEP" className="form-label mt-4">CEP</label>
                    <input value={usuario.cep} onChange={e=>{setCliente({...usuario, cep:e.target.value})}} type="text" className="form-control" id="inputCEP" placeholder="Insira CEP"/>
                </div>
            </div>
            <div className="row">
                <div className='col-6 mx-auto'>
                    <label htmlFor="inputRua" className="form-label mt-4">Rua</label>
                    <input value={usuario.rua} onChange={e=>{setCliente({...usuario, rua:e.target.value})}} type="text" className="form-control" id="inputRua" placeholder="Insira Rua"/>
                </div>
                <div className='col-6 mx-auto'>
                    <label htmlFor="inputDescricao" className="form-label mt-4">Descrição</label>
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
