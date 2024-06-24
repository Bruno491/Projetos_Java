package br.projetofinal.projeto.projeto_final.controllers;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import br.projetofinal.projeto.projeto_final.models.Produtos;
import br.projetofinal.projeto.projeto_final.repository.ProdutosRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/produtos")
@CrossOrigin("*")
public class ProdutosController {
    @Autowired
    private ProdutosRepository repository;
    
    @PostMapping("/salvarFoto/{id}")
    public ResponseEntity salvarFoto(@PathVariable int id,@RequestParam("file") MultipartFile file) {
        try {
            Produtos produtos= repository.selecionar(id);

            String nomeArquivo = produtos.getId()+ "_" +  file.getOriginalFilename();
            produtos.setFoto(nomeArquivo);
            repository.save(produtos);
            try {
                byte[] bytes = file.getBytes();
                Path path = Paths.get(System.getProperty("user.dir") +"\\src\\main\\resources\\static\\image\\" + nomeArquivo);
                Files.write(path, bytes);
                return ResponseEntity.ok(produtos);
             } catch (IOException e) {
                e.printStackTrace(); 
                return ResponseEntity.
                badRequest().body(e.getMessage());      
            }

        } catch (Exception e) {
            return ResponseEntity.
            badRequest().body(e.getMessage());
        }
    }
    
	  @GetMapping(value = "/getimagem/{nome}")
	    public HttpEntity<byte[]> download(@PathVariable(value = "nome") String nome) throws IOException {
	        byte[] arquivo =Files.readAllBytes( Paths.get(System.getProperty("user.dir") +"\\src\\main\\resources\\static\\image\\" + nome));
	        HttpHeaders httpHeaders = new HttpHeaders();
	        switch (nome.substring(nome.lastIndexOf(".") + 1).toUpperCase()) {
		case "JPG":
			httpHeaders.setContentType(MediaType.IMAGE_JPEG);break;
		case "GIF":
			httpHeaders.setContentType(MediaType.IMAGE_GIF); break;
		case "PNG":
			httpHeaders.setContentType(MediaType.IMAGE_PNG); break;
		default:
		break;
	}        httpHeaders.setContentLength(arquivo.length);
	        HttpEntity<byte[]> entity = new HttpEntity<byte[]>( arquivo, httpHeaders);
	        return entity;}
    
    @PostMapping
    public ResponseEntity postMethodName(@RequestBody Produtos produtos) {
        try {
            return ResponseEntity.ok(repository.save(produtos));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity alterar(@RequestBody Produtos produtos) {
        try {
            repository.save(produtos);
            return ResponseEntity.ok(produtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity excluir(@PathVariable int id){
        try {
            repository.deleteById(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.
            badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity selecionar() {
        try {
            return ResponseEntity.ok(repository.findAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/selecionar/{id}")
    public ResponseEntity selecionar(@PathVariable int id) {
        try {
            return ResponseEntity.ok(repository.selecionar(id));
        } catch (Exception e) {
            return ResponseEntity.
            badRequest().body(e.getMessage());
        }
    }
}
