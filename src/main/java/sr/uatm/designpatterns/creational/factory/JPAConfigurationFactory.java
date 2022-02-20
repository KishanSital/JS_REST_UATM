package sr.uatm.designpatterns.creational.factory;

public class JPAConfigurationFactory {

    public JPAConfiguration getJPAConfiguration(String persistenceUnitName) {
        if (persistenceUnitName == null) {
            return null;
        }
        if (persistenceUnitName.equalsIgnoreCase("UATM")) {
            return new JPAConfigurationUATM();
        }

        if (persistenceUnitName.equalsIgnoreCase("DSB")) {
            return new JPAConfigurationDSB();
        }

        if (persistenceUnitName.equalsIgnoreCase("CBVS")) {
            return new JPAConfigurationCBVS();
        }

        if (persistenceUnitName.equalsIgnoreCase("HKB")) {
            return new JPAConfigurationHKB();
        }

        return null;
    }
}
