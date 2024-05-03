package br.projetofinal.projeto.projeto_final.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import br.projetofinal.projeto.projeto_final.models.Pedidos;

public interface PedidosRepository extends CrudRepository<Pedidos, Integer>{
    @Query(value = "select * from Pedidos where id=?1", nativeQuery = true)
    Pedidos selecionar(int id);
}
