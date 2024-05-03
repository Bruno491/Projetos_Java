import React, { useEffect } from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import {Link} from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Header(){

    const [nome, setNome] = useState('')
    const nav = useNavigate()

    const logout = () => {
        localStorage.removeItem("usuario");
        return nav('/')
    }

    useEffect(()=>{

        const usuario = localStorage.getItem("usuario");
        if(usuario){
            setNome(JSON.parse(usuario).nome);
        }
    }, [])

    return(
        <div>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to="/produtos" className="navbar-brand">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <Link to="/produtos" className="nav-link active">Inicio
                        <span className="visually-hidden">(current)</span>
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/pedidos" className="nav-link">Pedidos</Link>
                    </li>
                </ul>
                <li className="nav-item">
                        {nome}
                </li>
                <button type="button" className="btn btn-secundary" onClick={logout}>Sair</button>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default Header;