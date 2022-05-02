package sr.uatm.services;

import sr.uatm.designpatterns.creational.builder.entities.bank.BankAccount;
import sr.uatm.designpatterns.creational.builder.entities.uatm.CurrencyConfig;
import sr.uatm.designpatterns.creational.builder.entities.uatm.Transaction;
import sr.uatm.dto.*;

import java.util.List;

public interface UatmControllerService {

    boolean login(UserDTO userDTO);

    boolean isUserLoggedIn();

    boolean logoutUser();

    boolean validateBankConnection();

    boolean disconnectFromBank();

    List<String> getBankOptions();

    boolean connectToBank(BankDTO bankDTO);

    List<TransactionDTO> getAllTransactions( TransactionDTO transactionDTO);

    List<Transaction> clearAllTransactions(Integer transactionDTO);

    List<BankAccountDTO> getBankAccounts(Long accountNumber);

    boolean transferMoney(MoneyTransferDTO moneyTransferDTO);

    List<CurrencyConfig> getCurrencyExchangeRates();
}
