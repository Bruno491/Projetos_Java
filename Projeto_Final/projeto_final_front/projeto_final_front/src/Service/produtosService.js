import ApiService from "./apiService";

class produtosService extends ApiService {
    constructor(){
        super('/categoria')
    }

    listar(){
        return this.get('')
    }
}

export default produtosService;