package com.assetmanagement.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class FinanceDTO {
    private Long id;
    private String financeId;
    private String operationType;
    private Long assetId;
    private String assetName;
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
    private LocalDate transactionDate;
    private String notes;
} 