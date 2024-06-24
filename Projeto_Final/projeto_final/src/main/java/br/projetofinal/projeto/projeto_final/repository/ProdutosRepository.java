package br.projetofinal.projeto.projeto_final.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import br.projetofinal.projeto.projeto_final.models.Produtos;

public interface ProdutosRepository extends CrudRepository<Produtos, Integer> {
    @Query(value = "select * from produtos where id=?1", nativeQuery = true)
    Produtos selecionar(int id);
}
