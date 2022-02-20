package sr.uatm.designpatterns.structural.adapter;

import com.github.KishanSital.authenticator.models.DatabaseInfo;
import sr.uatm.designpatterns.creational.builder.entities.connection.Database;


public interface DatabaseInfoAdapter {
    DatabaseInfo getDatabaseInfo();

    Database getDatabase();
}
