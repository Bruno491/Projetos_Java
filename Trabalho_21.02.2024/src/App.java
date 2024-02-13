import Classes.ContaCorrente;

public class App {
    public static void main(String[] args) {

        ContaCorrente conta = new ContaCorrente(12345, 123, 1000.0, "Bruno Pereira Silva");

        System.out.println("Saldo inicial: R$" + conta.getSaldo());

        conta.sacar(500.0);
        conta.depositar(300.0);

        System.out.println("Saldo final: R$" + conta.getSaldo());

    }
}
