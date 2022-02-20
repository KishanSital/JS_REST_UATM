package sr.uatm.config;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAConfiguration {
    private EntityManagerFactory factory;
    private EntityManager entityManager;

    public JPAConfiguration(String persistenceUnitName) {

        this.factory = Persistence.createEntityManagerFactory(persistenceUnitName.trim());
        this.entityManager = factory.createEntityManager();
    }

    public EntityManagerFactory getEntityManagerFactory() {
        return factory;
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void shutdown() {
        if (entityManager != null) {
            entityManager.close();
        }
        if (factory != null) {
            factory.close();
        }
    }
}