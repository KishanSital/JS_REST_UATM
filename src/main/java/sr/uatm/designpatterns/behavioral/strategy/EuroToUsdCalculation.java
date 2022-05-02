package sr.uatm.designpatterns.behavioral.strategy;


import sr.uatm.designpatterns.creational.builder.entities.bank.BankAccount;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;

public class EuroToUsdCalculation implements UatmOperation {

    private final Map<String, BigDecimal> overmaakKoersMap;

    public EuroToUsdCalculation(Map<String, BigDecimal> overmaakKoersMap) {

        this.overmaakKoersMap = overmaakKoersMap;
    }

    @Override
    public BigDecimal executeOperation(BankAccount receiversBankAccount, BigDecimal amountToSend) {
        return receiversBankAccount.getBankBalance().add(amountToSend.multiply(overmaakKoersMap.get("EURO").divide(overmaakKoersMap.get("USD"), RoundingMode.DOWN)));

    }
}
