package sr.uatm.dao;


import sr.uatm.designpatterns.creational.builder.entities.uatm.Transaction;
import sr.uatm.designpatterns.creational.builder.entities.uatm.User;
import sr.uatm.serviceImpl.UatmSessionServiceImpl;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;

public class UatmDAO {
    private EntityManager entityManager;

    public UatmDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public User findUserByUsername(String username) {
        String jpql = "select u from User u where u.username = :username";
        TypedQuery<User> query = entityManager.createQuery(jpql, User.class);
        query.setParameter("username", username);
        User user = query.getSingleResult();
        return user;
    }

    public User findUserByUsernameAndPassword(User user) {
        String jpql = "select u from User u where u.username = :username and u.password = :password";
        TypedQuery<User> query = entityManager.createQuery(jpql, User.class);
        query.setParameter("username", user.getUsername());
        query.setParameter("password", user.getPassword());
        user = null;
        try {
            user = query.getSingleResult();
        } catch (Exception e) {
        }
        return user;
    }

    public Transaction insertNewTransaction(Transaction transaction) {
        entityManager.getTransaction().begin();
        entityManager.merge(transaction);
        entityManager.getTransaction().commit();
        return transaction;
    }

    public List<Transaction> findAllTransactionsByUserId() {
        String jpql = "select c from Transaction c where c.user.id = :userId";
        TypedQuery<Transaction> query = entityManager.createQuery(jpql, Transaction.class);
        query.setParameter("userId", UatmSessionServiceImpl.user.getId());
        List<Transaction> transactions = query.getResultList();
        return transactions;
    }

    public int deleteAllTransactionsByUserId() {
        entityManager.getTransaction().begin();
        Query query = entityManager.createQuery("delete from Transaction c where c.user.id = :userId");
        query.setParameter("userId", UatmSessionServiceImpl.user.getId());
        int rowsDeleted = query.executeUpdate();
        entityManager.getTransaction().commit();
        return rowsDeleted;
    }

    public List<Transaction> findAllTransactionsByYear(String year) {
        Integer yearValue = Integer.valueOf(year);
        String jpql = "select c from Transaction c where c.user.id = :userId and  YEAR(c.transactionDate) =:year";
        TypedQuery<Transaction> query = entityManager.createQuery(jpql, Transaction.class);
        query.setParameter("userId", UatmSessionServiceImpl.user.getId());
        query.setParameter("year", yearValue);
        List<Transaction> transactions = query.getResultList();
        return transactions;
    }
}
