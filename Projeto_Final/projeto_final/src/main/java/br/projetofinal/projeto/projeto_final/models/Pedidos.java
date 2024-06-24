package br.projetofinal.projeto.projeto_final.models;
import java.util.Date;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="pedidos")
public class Pedidos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date DataPedido;
    private String StatusPedido;
    private double TotalPedido;
    
    @ManyToMany(mappedBy = "pedidos")
    private List<Usuarios> usuarios;

    @OneToMany(mappedBy = "pedidos")
    private List<ItensPedidos> itensPedidos;
}