import ApiService from "./apiService";

class produtosService extends ApiService {
    constructor(){
        super('/produtos')
    }

    salvar(produtos){
        if(produtos.id)
            return this.put('', produtos) //alterar
        else
            return this.post('', produtos) //incluir
    }

    salvarFoto(id, foto){
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
        return this.post(`/salvarFoto/${id}`, foto, config)//incluir
        
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

export default produtosService;