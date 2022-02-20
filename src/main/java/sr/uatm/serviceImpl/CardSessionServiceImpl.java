package sr.uatm.serviceImpl;


import sr.uatm.designpatterns.creational.builder.entities.bank.BankCard;
import sr.uatm.services.CardSessionService;

public class CardSessionServiceImpl implements CardSessionService {
    public static BankCard bankCard;
    public static String selectedBank;
    public static Long currentAccountNumber;
    public static boolean isBankConnected = false;

    public CardSessionServiceImpl(BankCard bankCard) {
        this.bankCard = bankCard;
    }
}
