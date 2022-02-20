package sr.uatm.dto;

import java.math.BigDecimal;

public class TransactionDTO {
    private String transactionDate;

    private BigDecimal transactionAmount;

    private String transactionDescription;

    private String transactionSource;

    public TransactionDTO(String transactionDate, BigDecimal transactionAmount, String transactionDescription, String transactionSource) {
        this.transactionDate = transactionDate;
        this.transactionAmount = transactionAmount;
        this.transactionDescription = transactionDescription;
        this.transactionSource = transactionSource;
    }

    public TransactionDTO() {
    }


    public String getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(String transactionDate) {
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
}
