package sr.uatm.designpatterns.creational.builder.entities.connection;

public final class Database extends Object {
    String dbUrl;
    String dbUser;
    String dbPassword;
    String tableName;
    String userNameColumn;
    String passwordColumn;

    public Database(String dbUrl,
                    String dbUser,
                    String dbPassword,
                    String tableName,
                    String userNameColumn,
                    String passwordColumn) {
        this.dbUrl = dbUrl;
        this.dbUser = dbUser;
        this.dbPassword = dbPassword;
        this.tableName = tableName;
        this.userNameColumn = userNameColumn;
        this.passwordColumn = passwordColumn;
    }

    public Database(Database database) {
        this.dbUrl = database.dbUrl;
        this.dbUser = database.dbUser;
        this.dbPassword = database.dbPassword;
        this.tableName = database.tableName;
        this.userNameColumn = database.userNameColumn;
        this.passwordColumn = database.passwordColumn;
    }

    public Database(DatabaseBuilder databaseBuilder) {
        this.dbUrl = databaseBuilder.dbUrl;
        this.dbUser = databaseBuilder.dbUser;
        this.dbPassword = databaseBuilder.dbPassword;
        this.tableName = databaseBuilder.tableName;
        this.userNameColumn = databaseBuilder.userNameColumn;
        this.passwordColumn = databaseBuilder.passwordColumn;
    }

    public String getDbUrl() {
        return dbUrl;
    }

    public void setDbUrl(String dbUrl) {
        this.dbUrl = dbUrl;
    }

    public String getDbUser() {
        return dbUser;
    }

    public void setDbUser(String dbUser) {
        this.dbUser = dbUser;
    }

    public String getDbPassword() {
        return dbPassword;
    }

    public void setDbPassword(String dbPassword) {
        this.dbPassword = dbPassword;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getUserNameColumn() {
        return userNameColumn;
    }

    public void setUserNameColumn(String userNameColumn) {
        this.userNameColumn = userNameColumn;
    }

    public String getPasswordColumn() {
        return passwordColumn;
    }

    public void setPasswordColumn(String passwordColumn) {
        this.passwordColumn = passwordColumn;
    }

    public static class DatabaseBuilder {

        String dbUrl;
        String dbUser;
        String dbPassword;
        String tableName;
        String userNameColumn;
        String passwordColumn;

        public DatabaseBuilder dbUrl(String dbUrl) {
            this.dbUrl = dbUrl;
            return this;
        }

        public DatabaseBuilder dbUser(String dbUser) {
            this.dbUser = dbUser;
            return this;
        }

        public DatabaseBuilder dbPassword(String dbPassword) {
            this.dbPassword = dbPassword;
            return this;
        }

        public DatabaseBuilder tableName(String tableName) {
            this.tableName = tableName;
            return this;
        }

        public DatabaseBuilder userNameColumn(String userNameColumn) {
            this.userNameColumn = userNameColumn;
            return this;
        }

        public DatabaseBuilder passwordColumn(String passwordColumn) {
            this.passwordColumn = passwordColumn;
            return this;
        }

        public Database build() {
            Database database = new Database(this);
            return database;
        }

    }

}