package sr.uatm.designpatterns.creational.factory;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

public interface JPAConfiguration {

    EntityManagerFactory getEntityManagerFactory();

    EntityManager getEntityManager();

    void shutdown();
}
