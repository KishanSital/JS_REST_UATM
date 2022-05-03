package sr.uatm.dto;

import java.math.BigDecimal;

public class TransactionDTO {
    private String transactionDate;

    private BigDecimal transactionAmount;

    private String transactionDescription;

    private String transactionSource;

    private Integer quarter;

    private Integer year;

    public TransactionDTO() {
    }

    public TransactionDTO(String transactionDate, BigDecimal transactionAmount, String transactionDescription, String transactionSource, Integer quarter) {
        this.transactionDate = transactionDate;
        this.transactionAmount = transactionAmount;
        this.transactionDescription = transactionDescription;
        this.transactionSource = transactionSource;
        this.quarter = quarter;
    }

    public TransactionDTO(String transactionDate, BigDecimal transactionAmount, String transactionDescription, String transactionSource) {
        this.transactionDate = transactionDate;
        this.transactionAmount = transactionAmount;
        this.transactionDescription = transactionDescription;
        this.transactionSource = transactionSource;
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

    public Integer getQuarter() {
        return quarter;
    }

    public void setQuarter(Integer quarter) {
        this.quarter = quarter;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
