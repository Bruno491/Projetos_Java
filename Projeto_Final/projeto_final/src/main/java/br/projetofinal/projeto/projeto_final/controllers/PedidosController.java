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
import br.projetofinal.projeto.projeto_final.models.Pedidos;
import br.projetofinal.projeto.projeto_final.repository.PedidosRepository;

@RestController
@RequestMapping("/pedido")
public class PedidosController {
    @Autowired
    private PedidosRepository repository;

    @PostMapping
    public Pedidos inserir(@RequestBody Pedidos entity) {
        repository.save(entity);
        return entity;
    }

    @PutMapping
    public Pedidos alterar(@RequestBody Pedidos entity) {
        repository.save(entity);
        return entity;
    }

    @DeleteMapping("/id")
    public void excluir(@PathVariable int id) {
        repository.deleteById(id);
    }

    @GetMapping
    public Iterable<Pedidos> selecionar() {
        return repository.findAll();
    }
    
    @GetMapping("/selecionar/{id}")
    public Pedidos selecionar(@PathVariable int id) {
        return repository.selecionar(id);
    }
}
