package sr.uatm.dto;

public class BankAccountDTO {
    private Long accountNumber;
    private String type;
    private String balance;
    private String currency;

    public BankAccountDTO() {
    }


    public BankAccountDTO(Long accountNumber, String type, String balance, String currency) {
        this.accountNumber = accountNumber;
        this.type = type;
        this.balance = balance;
        this.currency = currency;
    }

    public Long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
