package sr.uatm.designpatterns.behavioral.strategy;


import sr.uatm.designpatterns.creational.builder.entities.bank.BankAccount;

import java.math.BigDecimal;

public class UatmContext {

    private UatmOperation uatmOperation;

    public UatmContext(UatmOperation uatmOperation) {
        this.uatmOperation = uatmOperation;
    }

    public BigDecimal executeStrategy(BankAccount receiversBankAccount, BigDecimal amountToSend) {
        return this.uatmOperation.executeOperation(receiversBankAccount, amountToSend);
    }
}
