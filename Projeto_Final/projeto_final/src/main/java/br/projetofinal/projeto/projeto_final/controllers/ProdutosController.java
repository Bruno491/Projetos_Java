package br.projetofinal.projeto.projeto_final.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.projetofinal.projeto.projeto_final.models.Produtos;
import br.projetofinal.projeto.projeto_final.repository.ProdutosRepository;

@RestController
@RequestMapping("/produtos")
public class ProdutosController {
    @Autowired
    private ProdutosRepository repository;

    @PostMapping
    public Produtos inserir(@RequestBody Produtos entity) {
        repository.save(entity);
        return entity;
    }

    @PutMapping
    public Produtos alterar(@RequestBody Produtos entity) {
        repository.save(entity);
        return entity;
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable int id) {
        repository.deleteById(id);
    }

    @GetMapping
    public Iterable<Produtos> selecionar() {
        return repository.findAll();
    }
    
    @GetMapping("/selecionar/{id}")
    public Produtos selecionar(@PathVariable int id) {
        return repository.selecionar(id);
    }
}
