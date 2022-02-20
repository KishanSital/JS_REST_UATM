package sr.uatm.services;

import sr.uatm.designpatterns.creational.builder.entities.bank.BankAccount;
import sr.uatm.designpatterns.creational.builder.entities.uatm.Transaction;
import sr.uatm.dto.BankDTO;
import sr.uatm.dto.MoneyTransferDTO;
import sr.uatm.dto.TransactionDTO;
import sr.uatm.dto.UserDTO;

import java.util.List;

public interface UatmControllerService {

    boolean login(UserDTO userDTO);

    boolean isUserLoggedIn();

    boolean logoutUser();

    boolean validateBankConnection();

    boolean disconnectFromBank();

    List<String> getBankOptions();

    boolean connectToBank(BankDTO bankDTO);

    List<TransactionDTO> getAllTransactions();

    List<Transaction> clearAllTransactions();

    List<BankAccount> getBankAccounts(Long accountNumber);

    boolean transferMoney(MoneyTransferDTO moneyTransferDTO);
}
