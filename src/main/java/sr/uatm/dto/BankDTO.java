package sr.uatm.dto;

public class BankDTO {
    private String selectedBank;
    private Long cardNumber;
    private Long cardPin;

    public String getSelectedBank() {
        return selectedBank;
    }

    public void setSelectedBank(String selectedBank) {
        this.selectedBank = selectedBank;
    }

    public Long getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(Long cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Long getCardPin() {
        return cardPin;
    }

    public void setCardPin(Long cardPin) {
        this.cardPin = cardPin;
    }
}
