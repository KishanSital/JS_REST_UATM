package sr.uatm.serviceImpl;

import sr.uatm.dao.UatmDAO;
import sr.uatm.designpatterns.creational.builder.entities.bank.BankAccount;
import sr.uatm.designpatterns.creational.builder.entities.bank.BankCard;
import sr.uatm.designpatterns.creational.builder.entities.uatm.Transaction;
import sr.uatm.designpatterns.creational.builder.entities.uatm.User;
import sr.uatm.designpatterns.creational.factory.JPAConfiguration;
import sr.uatm.designpatterns.creational.factory.JPAConfigurationFactory;
import sr.uatm.dto.*;
import sr.uatm.services.UatmControllerService;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

public class UatmControllerServiceImpl implements UatmControllerService {

    private final Map<String, BigDecimal> overmaakKoersMap = new HashMap<>();
    private final Map<String, JPAConfiguration> JPAConfigurationMap = new HashMap<>();
    private final UatmDAO uatmDAO;
    private final Map<Integer, String> bankOptions = new LinkedHashMap();
    private final UatmServiceImpl uatmService;

    public UatmControllerServiceImpl() {
        overmaakKoersMap.put("USD->SRD", BigDecimal.valueOf(2.00));
        overmaakKoersMap.put("EURO->SRD", BigDecimal.valueOf(4.00));

        JPAConfigurationMap.put("UATM", new JPAConfigurationFactory().getJPAConfiguration("UATM"));
        JPAConfigurationMap.put("CBVS", new JPAConfigurationFactory().getJPAConfiguration("CBVS"));
        JPAConfigurationMap.put("DSB", new JPAConfigurationFactory().getJPAConfiguration("DSB"));
        JPAConfigurationMap.put("HKB", new JPAConfigurationFactory().getJPAConfiguration("HKB"));

        bankOptions.put(1, "DSB");
        bankOptions.put(2, "CBVS");
        bankOptions.put(3, "HKB");

        uatmDAO = new UatmDAO(JPAConfigurationMap.get("UATM").getEntityManager());
        uatmService = new UatmServiceImpl(JPAConfigurationMap, uatmDAO, bankOptions, overmaakKoersMap);
    }


    @Override
    public boolean login(UserDTO userDTO) {

        if (userDTO == null || userDTO.getUsername() == null || userDTO.getPassword() == null) {
            return false;
        }

        User user = new User
                .UserBuilder()
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .build();

        User foundUser = uatmDAO.findUserByUsernameAndPassword(user);
        if (foundUser != null) {
            UatmSessionServiceImpl.user = foundUser;
            UatmSessionServiceImpl.loginStatus = true;
            return true;
        }
        return false;
    }

    @Override
    public boolean isUserLoggedIn() {
        return (UatmSessionServiceImpl.loginStatus);
    }

    @Override
    public boolean logoutUser() {
        killBankConnection();
        UatmSessionServiceImpl.user = null;
        UatmSessionServiceImpl.loginStatus = false;

        return true;
    }

    private void killBankConnection() {
        CardSessionServiceImpl.isBankConnected = false;
        CardSessionServiceImpl.bankCard = null;
        CardSessionServiceImpl.selectedBank = null;
        CardSessionServiceImpl.currentAccountNumber = null;
    }

    @Override
    public boolean validateBankConnection() {
        return CardSessionServiceImpl.isBankConnected;
    }

    @Override
    public boolean disconnectFromBank() {
        killBankConnection();
        return true;
    }

    @Override
    public List<String> getBankOptions() {
        List<String> options = new ArrayList<>();
        for (Map.Entry<Integer, String> bankEntry : this.bankOptions.entrySet()) {
            options.add(bankEntry.getValue());
        }
        return options;
    }

    @Override
    public boolean connectToBank(BankDTO bankDTO) {
        if (bankDTO == null || bankDTO.getCardNumber() == null || bankDTO.getCardPin() == null || bankDTO.getSelectedBank() == null) {
            return false;
        }
        CardSessionServiceImpl.selectedBank = bankDTO.getSelectedBank();

        BankCard bankCard = uatmService.getBankCardByBankAndCardNumberAndBankPin(bankDTO.getCardNumber(), bankDTO.getCardPin());

        if (bankCard != null) {
            CardSessionServiceImpl.bankCard = bankCard;
            CardSessionServiceImpl.isBankConnected = true;
            return true;
        }

        CardSessionServiceImpl.selectedBank = null;

        return false;
    }

    @Override
    public List<TransactionDTO> getAllTransactions(TransactionDTO transactionDTO) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");

        if (transactionDTO != null && transactionDTO.getTransactionDate() != null) {
            return uatmService.getTransactionByYear(transactionDTO.getTransactionDate().trim()).stream().map(transaction ->
                    new TransactionDTO(transaction.getTransactionDate().format(formatter),
                            transaction.getTransactionAmount(),
                            transaction.getTransactionDescription(),
                            transaction.getTransactionSource())).collect(Collectors.toList());

        }


        return uatmService.getAllTransactions().stream().map(transaction ->
                new TransactionDTO(transaction.getTransactionDate().format(formatter),
                        transaction.getTransactionAmount(),
                        transaction.getTransactionDescription(),
                        transaction.getTransactionSource())).collect(Collectors.toList());
    }

    @Override
    public List<Transaction> clearAllTransactions(Integer transactionYear) {
        uatmService.clearTransactionLog(transactionYear);
        return uatmService.getAllTransactions();

    }

    @Override
    public List<BankAccountDTO> getBankAccounts(Long accountNumber) {

        List<BankAccountDTO> bankAccounts;

        if (accountNumber == null) {
            bankAccounts = uatmService.getBankCardByBankAndCardNumberAndBankPin(CardSessionServiceImpl.bankCard.getCardNumber(),
                    CardSessionServiceImpl.bankCard.getBankPin()).getBankAccounts().stream()
                    .map(bankAccount -> new BankAccountDTO(bankAccount.getAccountNumber(),
                            bankAccount.getBankAccountType().getBankAccountTypeDescription(),
                            bankAccount.getBankBalance().toString(),
                            bankAccount.getBankCurrency().getCurrencyCode()))
                    .collect(Collectors.toList());
            return bankAccounts;
        }
        bankAccounts = uatmService.getBankCardByBankAndCardNumberAndBankPin(CardSessionServiceImpl.bankCard.getCardNumber(),
                CardSessionServiceImpl.bankCard.getBankPin()).getBankAccounts().stream()
                .map(bankAccount -> new BankAccountDTO(bankAccount.getAccountNumber(),
                        bankAccount.getBankAccountType().getBankAccountTypeDescription(),
                        bankAccount.getBankBalance().toString(),
                        bankAccount.getBankCurrency().getCurrencyCode()))
                .filter(bankAccount -> bankAccount.getAccountNumber().equals(accountNumber))
                .collect(Collectors.toList());
        return bankAccounts;
    }

    @Override
    public boolean transferMoney(MoneyTransferDTO moneyTransferDTO) {
        if (moneyTransferDTO == null ||
                moneyTransferDTO.getAmount() == null ||
                moneyTransferDTO.getDestinationAccountNumber() == null ||
                moneyTransferDTO.getDestinationBank() == null ||
                moneyTransferDTO.getSourceAccountNumber() == null) {
            return false;
        }

        CardSessionServiceImpl.currentAccountNumber = moneyTransferDTO.getSourceAccountNumber();
        BankAccount receiversBankAccount = retrieveBankAccount(moneyTransferDTO.getDestinationBank(), moneyTransferDTO.getDestinationAccountNumber());

        if (receiversBankAccount == null) {
            return false;
        }

        BankAccount bankAccount = uatmService.getAllAccountByCardNumber()
                .stream()
                .filter(bA -> bA.getAccountNumber().equals(moneyTransferDTO.getSourceAccountNumber()))
                .findFirst()
                .get();

        BigDecimal sendersBalanceAfterWithdrawal = bankAccount.getBankBalance().subtract(moneyTransferDTO.getAmount());
        boolean isAmountSufficient = sendersBalanceAfterWithdrawal.compareTo(BigDecimal.valueOf(0)) >= 0;
        if (!isAmountSufficient) {
            return false;
        }

        Integer bank = null;
        for (Map.Entry<Integer, String> bankEntry : this.bankOptions.entrySet()) {
            if (bankEntry.getValue().equalsIgnoreCase(moneyTransferDTO.getDestinationBank())) {
                bank = bankEntry.getKey();
                break;
            }
        }

        if (isAmountSufficient) {
            BankAccount sendersBankAccount = uatmService.withDrawMoney(bankAccount.getAccountNumber(), sendersBalanceAfterWithdrawal);
            receiversBankAccount = uatmService.transferMoney(sendersBankAccount, receiversBankAccount, moneyTransferDTO.getAmount(), bank);
            uatmService.createTransationLog(sendersBankAccount.getAccountNumber(),
                    moneyTransferDTO.getAmount(),
                    "money has been transferred to "
                            + moneyTransferDTO.getDestinationBank() + "-"
                            + receiversBankAccount.getBankCurrency().getCurrencyCode() + "-"
                            + receiversBankAccount.getAccountNumber()
                            + "\n\ttransaction currency = " + sendersBankAccount.getBankCurrency().getCurrencyCode());


            return true;
        }
        return false;
    }

    private BankAccount retrieveBankAccount(String bank, Long receipientAccountNumber) {

        if (CardSessionServiceImpl.selectedBank.equalsIgnoreCase(bank) && tryingToSendMoneyToSameAccount(receipientAccountNumber)) {
            return null;
        }

        boolean isAccountNumberValid = uatmService.getAllAccountByCardNumber(bank)
                .stream()
                .anyMatch(bankAccount -> bankAccount.getAccountNumber().equals(receipientAccountNumber));

        if (isAccountNumberValid) {
            return uatmService.getAllAccountByCardNumber(bank).stream().filter(bA -> bA.getAccountNumber().equals(receipientAccountNumber)).findFirst().get();
        }

        return null;
    }

    private boolean tryingToSendMoneyToSameAccount(Long receipientAccountNumber) {
        return CardSessionServiceImpl.currentAccountNumber.equals(receipientAccountNumber);
    }
}
