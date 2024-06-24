import ApiService from "./apiService";

class ClienteService extends ApiService {
    constructor(){
        super('/usuario')
    }
    validarUsuario (email, senha){
        return this.get(`/autenticar/${email}/${senha}`)
    }
    
    salvar(usuario){
        if(usuario.id)
            return this.put('', usuario) //alterar
        else
            return this.post('', usuario) //incluir
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
    
    listar(){
        return this.get('')
    }

    recuperar(id){
        return this.get(`/selecionar/${id}`)
    }
}
export default ClienteService;
