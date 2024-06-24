import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import Exibir_Produtos from "./Pages/Exibir_Produtos";
import Pg_Pedidos_Clientes from "./Pages/Pg_Pedidos_Clientes";
import Cadastro_Cliente from "./Pages/Cadastro_Cliente";
import Cadastro_Produto from "./Pages/Cadastro_Produtos";
import Rec_senha from "./Pages/Recuperar_Senha";
function PrivateRoute( {children} ){
    const authenticated = localStorage.getItem("usuario")
    return authenticated ? children : <Navigate to="/" />
}

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/produtos" element={<PrivateRoute><Exibir_Produtos /></PrivateRoute>} />
            <Route path="/pedidos" element={<PrivateRoute><Pg_Pedidos_Clientes /></PrivateRoute>}/>
            <Route path="/registrar-se" element={<Cadastro_Cliente />}/>
            <Route path="/recuperar_senha" element={<Rec_senha />}/>
            <Route path="/Cadastrar_Produto" element={<PrivateRoute><Cadastro_Produto /></PrivateRoute>}/>
        </Routes>
    );
}

export default MainRoutes;