import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css';
import {mensagemSucesso, mensagemErro} from '../../Configurations/mensagem';
import ClienteService from '../../Service/clienteService';

function Login(){

    const nav = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const service = new ClienteService()

    const logar = ()=> {
        if(!email || !senha){
            mensagemErro('Preencha todos os campos')
        }
        else{

            service.validarUsuario(email,senha).then(
                (response) => {
                    if(response && response.data){
                        console.log(response.data)
                        localStorage.setItem("usuario", JSON.stringify(response.data))
                        mensagemSucesso("Logado com sucesso");
                        return nav("/produtos")
                    }
                }
            ).catch(
                error =>{
                    
                        mensagemErro(error.response.data)
                        console.log(error.response.data)
                }
            );
        }
    }
    const cadastrar = ()=> {
        return nav("/registrar-se")
    }

    return(
        <div className='container'>
            <div>
                <h1 className="Titulo-Login">Login</h1>
                <div className='col-6 mx-auto cp_login'>
                    <label htmlFor="exampleInputEmail1" className="form-label mt-4 cp_login">Email</label>
                    <input type="email" className="form-control cp_login" id="email" aria-describedby="emailHelp" placeholder="Insira email" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                </div>
                <div className='col-6 mx-auto cp_login'>
                    <label htmlFor="exampleInputPassword1" className="form-label mt-4 cp_login">Senha</label>
                    <input type="password" className="form-control cp_login" id="senha" placeholder="Insira a senha" autocomplete="off" value={senha} onChange={e=>{setSenha(e.target.value)}}/>
                </div>
                <br />
                <div className='col-6 mx-auto cp_login'>
                    <button type="button" className="btn btn-link">Esqueci a senha</button>
                    <button type="button" className="btn btn-info" onClick={logar}>Login</button>
                    <br />
                    <button type="button" className="btn btn-secundary" onClick={cadastrar}>Registrar-se</button>
                </div>
            </div>
        </div>
    )
}

export default Login;