package sr.uatm.designpatterns.structural.adapter;

import com.github.KishanSital.authenticator.models.DatabaseInfo;
import sr.uatm.designpatterns.creational.builder.entities.connection.Database;

public class DatabaseInfoAdapterImpl implements DatabaseInfoAdapter {

    private DatabaseInfo databaseInfo;
    private Database database;

    public DatabaseInfoAdapterImpl(DatabaseInfo databaseInfo) {
        this.databaseInfo = databaseInfo;
    }

    public DatabaseInfoAdapterImpl(Database database) {
        this.database = database;
    }

    @Override
    public DatabaseInfo getDatabaseInfo() {
        if (database != null) {
            return convertDatabaseToDatabaseInfo(this.database);
        }
        return this.databaseInfo;
    }

    //builder pattern
    private DatabaseInfo convertDatabaseToDatabaseInfo(Database database) {
        return new DatabaseInfo
                .DatabaseInfoBuilder()
                .dbUrl(database.getDbUrl())
                .dbUser(database.getDbUser())
                .dbPassword(database.getDbPassword())
                .tableName(database.getTableName())
                .userNameColumn(database.getUserNameColumn())
                .passwordColumn(database.getPasswordColumn())
                .build();
    }

    @Override
    public Database getDatabase() {
        if (databaseInfo != null) {
            return convertDatabaseInfoToDatabase(this.databaseInfo);
        }
        return this.database;
    }

    //builder pattern
    private Database convertDatabaseInfoToDatabase(DatabaseInfo databaseInfo) {
        return new Database
                .DatabaseBuilder()
                .dbUrl(databaseInfo.getDbUrl())
                .dbUser(databaseInfo.getDbUser())
                .dbPassword(databaseInfo.getDbPassword())
                .tableName(databaseInfo.getTableName())
                .userNameColumn(databaseInfo.getUserNameColumn())
                .passwordColumn(databaseInfo.getPasswordColumn())
                .build();
    }
}