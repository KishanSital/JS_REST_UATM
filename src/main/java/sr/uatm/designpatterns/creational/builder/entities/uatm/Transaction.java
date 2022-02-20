package sr.uatm.designpatterns.creational.builder.entities.uatm;

import javax.persistence.*;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDate;

@Table(name = "transaction")
@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
    @Column(name = "transaction_card_number")
    private Long transactionCardNumber;
    @Column(name = "transaction_account_number")
    private Long transactionAccountNumber;
    @Column(name = "transaction_date")
    private LocalDate transactionDate;
    @Column(name = "transaction_amount")
    private BigDecimal transactionAmount;
    @Column(name = "transaction_description")
    private String transactionDescription;
    @Column(name = "transaction_source")
    private String transactionSource;

    public Transaction(Long id, User user, Long transactionCardNumber, Long transactionAccountNumber, LocalDate transactionDate, BigDecimal transactionAmount, String transactionDescription, String transactionSource) {
        this.id = id;
        this.user = user;
        this.transactionCardNumber = transactionCardNumber;
        this.transactionAccountNumber = transactionAccountNumber;
        this.transactionDate = transactionDate;
        this.transactionAmount = transactionAmount;
        this.transactionDescription = transactionDescription;
        this.transactionSource = transactionSource;
    }

    public Transaction() {
    }

    public Transaction(TransactionBuilder transactionBuilder) {
        this.id = transactionBuilder.id;
        this.user = transactionBuilder.user;
        this.transactionCardNumber = transactionBuilder.transactionCardNumber;
        this.transactionAccountNumber = transactionBuilder.transactionAccountNumber;
        this.transactionDate = transactionBuilder.transactionDate;
        this.transactionAmount = transactionBuilder.transactionAmount;
        this.transactionDescription = transactionBuilder.transactionDescription;
        this.transactionSource = transactionBuilder.transactionSource;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getTransactionCardNumber() {
        return transactionCardNumber;
    }

    public void setTransactionCardNumber(Long transactionCardNumber) {
        this.transactionCardNumber = transactionCardNumber;
    }

    public Long getTransactionAccountNumber() {
        return transactionAccountNumber;
    }

    public void setTransactionAccountNumber(Long transactionAccountNumber) {
        this.transactionAccountNumber = transactionAccountNumber;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public BigDecimal getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(BigDecimal transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public String getTransactionDescription() {
        return transactionDescription;
    }

    public void setTransactionDescription(String transactionDescription) {
        this.transactionDescription = transactionDescription;
    }

    public String getTransactionSource() {
        return transactionSource;
    }

    public void setTransactionSource(String transactionSource) {
        this.transactionSource = transactionSource;
    }

    @Override
    public String toString() {
        return
                "transaction date = " + transactionDate +
                        "\n\ttransaction amount = " + NumberFormat.getCurrencyInstance().format(transactionAmount).replace("\u20AC","") +
                        "\n\ttransaction description = '" + transactionDescription + '\'' +
                        "\n\ttransaction bank source = " + transactionSource + "\n";
    }

    public static class TransactionBuilder {
        private Long id;
        private User user;
        private Long transactionCardNumber;
        private Long transactionAccountNumber;
        private LocalDate transactionDate;
        private BigDecimal transactionAmount;
        private String transactionDescription;
        private String transactionSource;

        public TransactionBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public TransactionBuilder user(User user) {
            this.user = user;
            return this;
        }

        public TransactionBuilder transactionCardNumber(Long transactionCardNumber) {
            this.transactionCardNumber = transactionCardNumber;
            return this;
        }

        public TransactionBuilder transactionAccountNumber(Long transactionAccountNumber) {
            this.transactionAccountNumber = transactionAccountNumber;
            return this;
        }

        public TransactionBuilder transactionDate(LocalDate transactionDate) {
            this.transactionDate = transactionDate;
            return this;
        }

        public TransactionBuilder transactionAmount(BigDecimal transactionAmount) {
            this.transactionAmount = transactionAmount;
            return this;
        }

        public TransactionBuilder transactionDescription(String transactionDescription) {
            this.transactionDescription = transactionDescription;
            return this;
        }

        public TransactionBuilder transactionSource(String transactionSource) {
            this.transactionSource = transactionSource;
            return this;
        }

        public Transaction build() {
            Transaction transaction = new Transaction(this);
            return transaction;
        }
    }
}
