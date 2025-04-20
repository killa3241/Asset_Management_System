package com.assetmanagement.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "finance")
public class Finance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "finance_id", unique = true)
    private String financeId;

    private String operationType;

    @ManyToOne
    @JoinColumn(name = "asset_id")
    private Asset asset;

    private Double principalAmount;
    private Double interestRate;
    private Integer loanTerm;
    private Double monthlyPayment;
    private Double totalInterest;
    private Double totalPayment;

    private String depreciationMethod;
    private Integer usefulLife;
    private Double salvageValue;
    private Double annualDepreciation;

    private Double salePrice;
    private Double purchasePrice;
    private Double profitLoss;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate transactionDate;

    private String notes;

    // Constructors
    public Finance() {}

    public Finance(String operationType, Asset asset, LocalDate transactionDate) {
        this.operationType = operationType;
        this.asset = asset;
        this.transactionDate = transactionDate;
    }

    // Business logic
    public void calculateProfitOrLoss() {
        if (salePrice != null && purchasePrice != null) {
            this.profitLoss = salePrice - purchasePrice;
        }
    }

    public void calculateDepreciation() {
        if ("Straight Line".equalsIgnoreCase(this.depreciationMethod)
                && purchasePrice != null && salvageValue != null && usefulLife != null && usefulLife > 0) {
            this.annualDepreciation = (purchasePrice - salvageValue) / usefulLife;
        }
    }

    @PrePersist
    public void generateFinanceId() {
        // Temporarily set ID-based format after insert, if not already set
        if (this.financeId == null) {
            this.financeId = "FIN-" + System.currentTimeMillis();
        }
    }

    // Getters and Setters (or use Lombok if preferred)
    public Long getId() {
        return id;
    }

    public String getFinanceId() {
        return financeId;
    }

    public void setFinanceId(String financeId) {
        this.financeId = financeId;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public Double getPrincipalAmount() {
        return principalAmount;
    }

    public void setPrincipalAmount(Double principalAmount) {
        this.principalAmount = principalAmount;
    }

    public Double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }

    public Integer getLoanTerm() {
        return loanTerm;
    }

    public void setLoanTerm(Integer loanTerm) {
        this.loanTerm = loanTerm;
    }

    public Double getMonthlyPayment() {
        return monthlyPayment;
    }

    public void setMonthlyPayment(Double monthlyPayment) {
        this.monthlyPayment = monthlyPayment;
    }

    public Double getTotalInterest() {
        return totalInterest;
    }

    public void setTotalInterest(Double totalInterest) {
        this.totalInterest = totalInterest;
    }

    public Double getTotalPayment() {
        return totalPayment;
    }

    public void setTotalPayment(Double totalPayment) {
        this.totalPayment = totalPayment;
    }

    public String getDepreciationMethod() {
        return depreciationMethod;
    }

    public void setDepreciationMethod(String depreciationMethod) {
        this.depreciationMethod = depreciationMethod;
    }

    public Integer getUsefulLife() {
        return usefulLife;
    }

    public void setUsefulLife(Integer usefulLife) {
        this.usefulLife = usefulLife;
    }

    public Double getSalvageValue() {
        return salvageValue;
    }

    public void setSalvageValue(Double salvageValue) {
        this.salvageValue = salvageValue;
    }

    public Double getAnnualDepreciation() {
        return annualDepreciation;
    }

    public void setAnnualDepreciation(Double annualDepreciation) {
        this.annualDepreciation = annualDepreciation;
    }

    public Double getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(Double salePrice) {
        this.salePrice = salePrice;
    }

    public Double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public Double getProfitLoss() {
        return profitLoss;
    }

    public void setProfitLoss(Double profitLoss) {
        this.profitLoss = profitLoss;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
