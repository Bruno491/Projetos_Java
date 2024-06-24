package br.projetofinal.projeto.projeto_final.models;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "itenspedido")
public class ItensPedidos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int Quantidade;
    private double Preco;

    @ManyToOne
    @JoinColumn(name="pedido_id", nullable=false)
    private Pedidos pedidos;

    @ManyToOne
    @JoinColumn(name="produto_id", nullable=false)
    private Produtos produto;
}