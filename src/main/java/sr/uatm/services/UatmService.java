package sr.uatm.services;


import sr.uatm.designpatterns.creational.builder.entities.bank.BankAccount;
import sr.uatm.designpatterns.creational.builder.entities.bank.BankCard;
import sr.uatm.designpatterns.creational.builder.entities.uatm.Transaction;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface UatmService {
    List<Transaction> getAllTransactions();

    int clearTransactionLog();

    List<BankAccount> getAllAccountByCardNumber();

    List<BankAccount> getAllAccountByCardNumber(String bank);

    BankAccount withDrawMoney(Long accountNumber, BigDecimal newBalance);

    BankAccount transferMoney(Long accountNumber,
                              BigDecimal newBalance,
                              String bank);

    BankAccount transferMoney(BankAccount sendersBankAccount, BankAccount receiversBankAccount, BigDecimal amountToSend, Integer selectedBank);

    BankCard getBankCardByBankAndCardNumberAndBankPin(Long cardNumber, Long bankPin);

    Transaction createTransationLog(Long transactionAccountNumber,
                                    BigDecimal transactionAmount,
                                    String transactionDescription);

    Map<Integer, String> getBankOptions();

    Map<String, BigDecimal> getOvermaakKoersMap();
}
