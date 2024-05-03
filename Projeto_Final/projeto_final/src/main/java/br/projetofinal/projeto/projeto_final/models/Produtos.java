package br.projetofinal.projeto.projeto_final.models;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "produtos")
public class Produtos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String NomeProduto;
    private String Descricao;
    private double Preco;

    @OneToMany(mappedBy = "produto")
    private List<ItensPedidos> itensPedidos;
}
