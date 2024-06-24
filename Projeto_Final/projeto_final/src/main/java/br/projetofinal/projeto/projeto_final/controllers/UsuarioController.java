package br.projetofinal.projeto.projeto_final.controllers;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.projetofinal.projeto.projeto_final.models.Usuarios;
import br.projetofinal.projeto.projeto_final.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
@CrossOrigin("*")
public class UsuarioController {
    @Autowired
    private UsuarioRepository repository;

    /*@PostMapping
    public Usuarios postMethodName(@RequestBody Usuarios usuarios){
        return repository.save(usuarios);
    }*/
    @PostMapping
    public ResponseEntity postMethodName(@RequestBody Usuarios usuarios) {
        try {
            return ResponseEntity.ok(repository.save(usuarios));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /*@GetMapping
    public Iterable<Usuarios> selecionar() {
        return repository.findAll();
    }*/
    @PutMapping
    public ResponseEntity alterar(@RequestBody Usuarios usuarios) {
        try {
            repository.save(usuarios);
            return ResponseEntity.ok(usuarios);
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

    /*@GetMapping("/selecionar/{id}")
    public Usuarios selecionar(@PathVariable int id) {
        return repository.selecionar(id);
    }*/
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

    @SuppressWarnings("rawtypes")
    @GetMapping("/autenticar/{email}/{senha}")
    public ResponseEntity autenticar(@PathVariable String email , @PathVariable String senha) {
        try {
            Usuarios usuario = repository.autenticar(email, senha);
            if(usuario!=null){
                return ResponseEntity.ok(usuario);
            }
            else{
                return ResponseEntity.badRequest().body("Dados Incorretos");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
