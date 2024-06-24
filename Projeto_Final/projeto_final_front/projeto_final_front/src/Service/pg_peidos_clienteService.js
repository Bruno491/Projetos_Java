import ApiService from "./apiService";

class pg_peidos_clienteService extends ApiService {

    constructor(){
        super('/pedidos')
    }
     

    salvar(venda){
        if(venda.id)
            return this.put('', venda)//alterar
        else
            return this.post('', venda)//incluir
        
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
export default pg_peidos_clienteService;