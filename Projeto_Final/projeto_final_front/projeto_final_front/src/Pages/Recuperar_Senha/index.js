import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState } from 'react'
import './styles.css';

function Recuperar_Senha(){

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')

    return(
        <div className='container text-align'>
            <h1>Recuperar Senha</h1>
            <div className="row">
                <div className='col-6 mx-auto'>
                    <label for="inputNome" className="form-label mt-4 text-align">Nome</label>
                    <input type="text" className="form-control text-align" id="inputNome" placeholder="Insira seu nome" value={nome} onChange={e=>{setNome(e.target.value)}}/>
                </div>
            </div>
            <div className='col-6 mx-auto'>
                    <label for="inputEmail" className="form-label mt-4 text-align">Email</label>
                    <input type="email" className="form-control text-align" id="inputEmail" aria-describedby="emailHelp" placeholder="Insira seu email" value={email} onChange={e=>{setEmail(e.target.value)}}/>
            </div>
            <br/>
            <div className='col-6 mx-auto cp_login'>
                <button type="button" class="btn btn-danger">Cancelar</button>
                <button type="button" className="btn btn-info">Recuperar Senha</button>
            </div>
        </div>
    )
}

export default Recuperar_Senha;
