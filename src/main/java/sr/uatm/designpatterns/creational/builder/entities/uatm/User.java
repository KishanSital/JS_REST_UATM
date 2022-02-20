package sr.uatm.designpatterns.creational.builder.entities.uatm;

import javax.persistence.*;
import java.util.List;

@Table(name = "user")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "User_id")
    private List<Transaction> transactions;

    public User() {
    }


    public User(Long id, String username, String password, List<Transaction> transactions) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.transactions = transactions;
    }

    public User(UserBuilder userBuilder) {
        this.id = userBuilder.id;
        this.password = userBuilder.password;
        this.transactions = userBuilder.transactions;
        this.username = userBuilder.username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public static class UserBuilder {
        private Long id;
        private String username;
        private String password;
        private List<Transaction> transactions;

        public UserBuilder() {

        }

        public UserBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserBuilder username(String username) {
            this.username = username;
            return this;
        }

        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder transactions(List<Transaction> transactions) {
            this.transactions = transactions;
            return this;
        }

        public User build() {
            User user = new User(this);
            return user;
        }
    }
}
