package sr.uatm.controller;

import sr.uatm.designpatterns.creational.builder.entities.uatm.Transaction;
import sr.uatm.dto.*;
import sr.uatm.serviceImpl.CardSessionServiceImpl;
import sr.uatm.serviceImpl.UatmControllerServiceImpl;
import sr.uatm.services.UatmControllerService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("uatm")
public class UatmController {

    private UatmControllerService uatmControllerService = new UatmControllerServiceImpl();

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public boolean login(UserDTO userDTO) {
        return uatmControllerService.login(userDTO);
    }

    @Path("/login-session")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public boolean isUserLoggedIn() {
        return uatmControllerService.isUserLoggedIn();
    }

    @Path("/logout")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public boolean logoutUser() {
        return uatmControllerService.logoutUser();
    }


    @Path("/bank-session")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public boolean isBankConnected() {
        return uatmControllerService.validateBankConnection();
    }

    @Path("/end-bank-session")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public boolean disconnectFromBank() {
        return uatmControllerService.disconnectFromBank();
    }


    @Path("/bankoptions")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getBankOptions() {
        return uatmControllerService.getBankOptions();
    }

    @Path("/connect-bank")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public boolean connectToBank(BankDTO bankDTO) {
        return uatmControllerService.connectToBank(bankDTO);
    }


    @Path("/transactions")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public List<TransactionDTO> getAllTransactions(TransactionDTO transactionDTO) {

        return uatmControllerService.getAllTransactions(transactionDTO);
    }

    @Path("/clear-transactions/{transactionDate}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public List<Transaction> clearAllTransactions(@PathParam("transactionDate") Integer transactionYear) {
        return uatmControllerService.clearAllTransactions(transactionYear);
    }

    @Path("/bank-accounts")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<BankAccountDTO> getBankAccount(BankAccountDTO bankAccountDTO) {

        return uatmControllerService.getBankAccounts(bankAccountDTO != null && bankAccountDTO.getAccountNumber() != null ? bankAccountDTO.getAccountNumber() : CardSessionServiceImpl.currentAccountNumber);
    }

    @Path("/bank-balance")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<BankAccountDTO> getBankBalance(BankAccountDTO bankAccountDTO) {
        return uatmControllerService.getBankAccounts(bankAccountDTO != null &&
                bankAccountDTO.getAccountNumber() != null ? bankAccountDTO.getAccountNumber() :
                CardSessionServiceImpl.currentAccountNumber);
    }

    @Path("/transfer-money")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public boolean transferMoney(MoneyTransferDTO moneyTransferDTO) {
        boolean transferStatus = uatmControllerService.transferMoney(moneyTransferDTO);
        CardSessionServiceImpl.currentAccountNumber = null;
        return transferStatus;
    }
}
