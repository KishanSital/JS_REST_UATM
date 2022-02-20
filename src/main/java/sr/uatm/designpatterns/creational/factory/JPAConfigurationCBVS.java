package sr.uatm.designpatterns.creational.factory;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAConfigurationCBVS implements JPAConfiguration{

    private static final String PERSISTENCE_UNIT_NAME = "CBVS";
    private static EntityManagerFactory factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
    private static EntityManager entityManager = factory.createEntityManager();

    public EntityManagerFactory getEntityManagerFactory() {
        return factory;
    }

    public EntityManager getEntityManager() {
        entityManager.clear();
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
