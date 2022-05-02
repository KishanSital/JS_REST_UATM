package sr.uatm.designpatterns.creational.builder.entities.uatm;

import javax.persistence.*;
import java.math.BigDecimal;

@Table(name = "currency_config")
@Entity
public class CurrencyConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(name = "currency_code", unique = true, nullable = false)
    private String currencyCode;

    @Column(name = "exchange_rate", nullable = false)
    private BigDecimal exchangeRate;

    public CurrencyConfig() {
    }

    public CurrencyConfig(CurrencyConfigBuilder currencyConfigBuilder) {
        this.id = currencyConfigBuilder.id;
        this.currencyCode = currencyConfigBuilder.currencyCode;
        this.exchangeRate = currencyConfigBuilder.exchangeRate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public BigDecimal getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(BigDecimal exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public static class CurrencyConfigBuilder {

        private Long id;

        private String currencyCode;
        private BigDecimal exchangeRate;

        public CurrencyConfigBuilder id() {
            this.id = id;
            return this;
        }

        public CurrencyConfigBuilder currencyCode() {
            this.currencyCode = currencyCode;
            return this;
        }

        public CurrencyConfigBuilder exchangeRate() {
            this.exchangeRate = exchangeRate;
            return this;
        }

        public CurrencyConfig build() {
            CurrencyConfig currencyConfig = new CurrencyConfig(this);
            return currencyConfig;
        }

    }
}
