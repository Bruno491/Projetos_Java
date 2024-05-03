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
import br.projetofinal.projeto.projeto_final.models.ItensPedidos;
import br.projetofinal.projeto.projeto_final.repository.ItensPedidosRepository;

@RestController
@RequestMapping("itenspedidos")
public class ItensPedidosController {
    @Autowired
    private ItensPedidosRepository repository;

    @PostMapping
    public ItensPedidos inserir(@RequestBody ItensPedidos entity) {
        repository.save(entity);
        return entity;
    }

    @PutMapping
    public ItensPedidos alterar(@RequestBody ItensPedidos entity) {
        repository.save(entity);
        return entity;
    }

    @DeleteMapping("/id")
    public void excluir(@PathVariable int id) {
        repository.deleteById(id);
    }

    @GetMapping
    public Iterable<ItensPedidos> selecionar() {
        return repository.findAll();
    }
    
    @GetMapping("/selecionar/{id}")
    public ItensPedidos selecionar(@PathVariable int id) {
        return repository.selecionar(id);
    }
}
