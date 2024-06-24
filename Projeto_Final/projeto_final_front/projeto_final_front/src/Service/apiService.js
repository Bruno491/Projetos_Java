import axios from 'axios'

const baseURL = 'http://localhost:8080'

export const httpClient = axios.create({
    baseURL: baseURL
})

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto, config){
        const requestUrl = `${this.apiurl}${url}`
    
        return httpClient.post(requestUrl, objeto, config);
    }

    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto);
    }
    
    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl)
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`
      
        return httpClient.get(requestUrl)
    }

    getImagem(url){
        const requestUrl = `${this.apiurl}${url}`
      
        return httpClient.get(requestUrl, {
            responseType: "arraybuffer"
          })
    }
}


export default ApiService;