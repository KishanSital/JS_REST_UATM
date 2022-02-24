package sr.uatm.serviceImpl;



import sr.uatm.dao.BankDAO;
import sr.uatm.dao.UatmDAO;
import sr.uatm.designpatterns.behavioral.strategy.*;
import sr.uatm.designpatterns.creational.builder.entities.bank.BankAccount;
import sr.uatm.designpatterns.creational.builder.entities.bank.BankCard;
import sr.uatm.designpatterns.creational.builder.entities.uatm.Transaction;
import sr.uatm.designpatterns.creational.factory.JPAConfiguration;
import sr.uatm.services.UatmService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class UatmServiceImpl implements UatmService {

    private final Map<String, JPAConfiguration> jpaConfigurationsMap;
    private final UatmDAO uatmDAO;
    private final Map<Integer, String> bankOptions;
    private final Map<String, BigDecimal> overmaakKoersMap;
    private UatmContext uatmContext;

    public UatmServiceImpl(Map<String, JPAConfiguration> jpaConfigurationsMap,
                           UatmDAO uatmDAO, Map<Integer, String> bankOptions, Map<String, BigDecimal> overmaakKoersMap) {
        this.jpaConfigurationsMap = jpaConfigurationsMap;
        this.uatmDAO = uatmDAO;
        this.bankOptions = bankOptions;
        this.overmaakKoersMap = overmaakKoersMap;
    }

    public Map<String, JPAConfiguration> getJpaConfigurationsMap() {
        return this.jpaConfigurationsMap;
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return uatmDAO.findAllTransactionsByUserId();
    }

    @Override
    public int clearTransactionLog() {
        return uatmDAO.deleteAllTransactionsByUserId();
    }

    @Override
    public List<BankAccount> getAllAccountByCardNumber() {
        BankDAO bankDAO = new BankDAO(jpaConfigurationsMap.get(CardSessionServiceImpl.selectedBank).getEntityManager());
        return bankDAO.findBankAccountsByCardNumber();
    }

    @Override
    public List<BankAccount> getAllAccountByCardNumber(String bank) {
        BankDAO bankDAO = new BankDAO(jpaConfigurationsMap.get(bank).getEntityManager());
        return bankDAO.findBankAccountsByCardNumber();
    }

    @Override
    public BankAccount withDrawMoney(Long accountNumber,
                                     BigDecimal newBalance) {
        BankDAO bankDAO = updateAccountBalance(null, accountNumber, newBalance);
        return bankDAO.findBankAccountByAccountNumber(accountNumber);

    }

    private BankDAO updateAccountBalance(String bank, Long accountNumber, BigDecimal newBalance) {
        BankDAO bankDAO = new BankDAO(jpaConfigurationsMap.get(bank != null && !bank.isEmpty() ? bank : CardSessionServiceImpl.selectedBank).getEntityManager());
        bankDAO.updateAccountBalance(accountNumber, newBalance);
        return bankDAO;
    }

    @Override
    public BankAccount transferMoney(Long accountNumber,
                                     BigDecimal newBalance,
                                     String bank) {
        BankDAO bankDAO = updateAccountBalance(bank, accountNumber, newBalance);
        return bankDAO.findBankAccountByAccountNumber(accountNumber);

    }

    @Override
    public BankAccount transferMoney(BankAccount sendersBankAccount, BankAccount receiversBankAccount, BigDecimal amountToSend, Integer selectedBank) {
        if (sendersBankAccount.getBankCurrency().getCurrencyCode().equals(receiversBankAccount.getBankCurrency().getCurrencyCode())) {
            receiversBankAccount = transferMoney(receiversBankAccount.getAccountNumber(),
                    (receiversBankAccount.getBankBalance().add(amountToSend)),
                    bankOptions.get(selectedBank));
        } else {
            if (sendersBankAccount.getBankCurrency().getCurrencyCode().equals("EURO")) {
                if (receiversBankAccount.getBankCurrency().getCurrencyCode().equals("SRD")) {

                    uatmContext = new UatmContext(new EuroToSrdCalculation(getOvermaakKoersMap()));
                    receiversBankAccount = getReceiversBankAccountAfterTransferCalculation(receiversBankAccount, amountToSend, selectedBank);

                }
                if (receiversBankAccount.getBankCurrency().getCurrencyCode().equals("USD")) {

                    uatmContext = new UatmContext(new EuroToUsdCalculation(getOvermaakKoersMap()));
                    receiversBankAccount = getReceiversBankAccountAfterTransferCalculation(receiversBankAccount, amountToSend, selectedBank);

                }
            }
            if (sendersBankAccount.getBankCurrency().getCurrencyCode().equals("USD")) {

                if (receiversBankAccount.getBankCurrency().getCurrencyCode().equals("SRD")) {

                    uatmContext = new UatmContext(new UsdToSrdCalculation(getOvermaakKoersMap()));
                    receiversBankAccount = getReceiversBankAccountAfterTransferCalculation(receiversBankAccount, amountToSend, selectedBank);

                }
                if (receiversBankAccount.getBankCurrency().getCurrencyCode().equals("EURO")) {

                    uatmContext = new UatmContext(new UsdToEuroCalculation(getOvermaakKoersMap()));
                    receiversBankAccount = getReceiversBankAccountAfterTransferCalculation(receiversBankAccount, amountToSend, selectedBank);

                }
            }
            if (sendersBankAccount.getBankCurrency().getCurrencyCode().equals("SRD")) {

                if (receiversBankAccount.getBankCurrency().getCurrencyCode().equals("USD")) {

                    uatmContext = new UatmContext(new SrdToUsdCalculation(getOvermaakKoersMap()));
                    receiversBankAccount = getReceiversBankAccountAfterTransferCalculation(receiversBankAccount, amountToSend, selectedBank);

                }

                if (receiversBankAccount.getBankCurrency().getCurrencyCode().equals("EURO")) {

                    uatmContext = new UatmContext(new SrdToEuroCalculation(getOvermaakKoersMap()));
                    receiversBankAccount = getReceiversBankAccountAfterTransferCalculation(receiversBankAccount, amountToSend, selectedBank);

                }
            }
        }
        return receiversBankAccount;
    }

    private BankAccount getReceiversBankAccountAfterTransferCalculation(BankAccount receiversBankAccount,
                                                                        BigDecimal amountToSend,
                                                                        Integer selectedBank) {
        return transferMoney(receiversBankAccount.getAccountNumber(),
                uatmContext.executeStrategy(receiversBankAccount, amountToSend),
                bankOptions.get(selectedBank));
    }


    @Override
    public BankCard getBankCardByBankAndCardNumberAndBankPin(Long cardNumber,
                                                             Long bankPin) {
        BankDAO bankDAO = new BankDAO(jpaConfigurationsMap.get(CardSessionServiceImpl.selectedBank).getEntityManager());
        return bankDAO.findBankCardByCardNumberAndBankPin(cardNumber, bankPin);
    }

    @Override
    public Transaction createTransationLog(Long transactionAccountNumber,
                                           BigDecimal transactionAmount,
                                           String transactionDescription) {
        return uatmDAO.insertNewTransaction(new Transaction
                .TransactionBuilder()
                .transactionAccountNumber(transactionAccountNumber)
                .transactionAmount(transactionAmount)
                .transactionCardNumber(CardSessionServiceImpl.bankCard.getCardNumber())
                .transactionDate(LocalDate.now())
                .transactionDescription(transactionDescription)
                .user(UatmSessionServiceImpl.user)
                .transactionSource(CardSessionServiceImpl.selectedBank)
                .build());

    }

    @Override
    public Map<Integer, String> getBankOptions() {
        return bankOptions;
    }

    @Override
    public Map<String, BigDecimal> getOvermaakKoersMap() {
        return overmaakKoersMap;
    }

    @Override
    public List<Transaction> getTransactionByYear(String year) {
        return uatmDAO.findAllTransactionsByYear(year);
    }
}
