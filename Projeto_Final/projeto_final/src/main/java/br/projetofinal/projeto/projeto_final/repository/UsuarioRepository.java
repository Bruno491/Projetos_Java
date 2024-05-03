package br.projetofinal.projeto.projeto_final.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import br.projetofinal.projeto.projeto_final.models.Usuarios;

public interface UsuarioRepository extends CrudRepository<Usuarios, Integer> {
    @Query(value = "select * from Usuarios where id=?1", nativeQuery = true)
    Usuarios selecionar(int id);

    @Query(value = "select * from usuarios where email=?1 and senha=?2", nativeQuery = true)
    Usuarios autenticar(String email, String senha);
}
