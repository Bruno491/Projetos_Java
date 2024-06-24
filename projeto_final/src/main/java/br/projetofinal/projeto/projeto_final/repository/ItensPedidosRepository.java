package br.projetofinal.projeto.projeto_final.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import br.projetofinal.projeto.projeto_final.models.ItensPedidos;

public interface ItensPedidosRepository extends CrudRepository<ItensPedidos, Integer> {
    @Query(value = "select * from ItensPedidos where id=?1", nativeQuery = true)
    ItensPedidos selecionar(int id);
}
