package br.projetofinal.projeto.projeto_final.models;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="usuarios")
public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String Nome;
    private String Email;
    private String Senha;
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT-3")
    private Date data_nascimento;
    private String CPF;
    private String CEP;
    private String Rua;
    private String Descricao;
    private String Tipo_usuario;

    @ManyToMany
    @JoinTable(
        name = "usuario_pedido", 
        joinColumns = @JoinColumn(name = "usuario_id"), 
        inverseJoinColumns = @JoinColumn(name = "pedido_id")
    )
    private List<Pedidos> pedidos;
}