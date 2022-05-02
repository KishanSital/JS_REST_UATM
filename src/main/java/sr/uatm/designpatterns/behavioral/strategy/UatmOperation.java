package sr.uatm.designpatterns.behavioral.strategy;


import sr.uatm.designpatterns.creational.builder.entities.bank.BankAccount;

import java.math.BigDecimal;

public interface UatmOperation {

    BigDecimal executeOperation(BankAccount receiversBankAccount, BigDecimal amountToSend);
}
