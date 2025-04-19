package com.assetmanagement.service;

import com.assetmanagement.dto.FinanceDTO;
import com.assetmanagement.entity.Asset;
import com.assetmanagement.entity.Finance;
import com.assetmanagement.repository.AssetRepository;
import com.assetmanagement.repository.FinanceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FinanceService {

    @Autowired
    private FinanceRepository financeRepository;

    @Autowired
    private AssetRepository assetRepository;

    public List<FinanceDTO> getAllFinanceRecords() {
        return financeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public FinanceDTO getFinanceRecordById(Long id) {
        Finance finance = financeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Finance record not found with id: " + id));
        return convertToDTO(finance);
    }

    public FinanceDTO createFinanceRecord(FinanceDTO financeDTO) {
        Finance finance = new Finance();
        finance.setOperationType(financeDTO.getOperationType());
        finance.setTransactionDate(financeDTO.getTransactionDate());
        finance.setNotes(financeDTO.getNotes());

        if (financeDTO.getAssetId() != null) {
            Asset asset = assetRepository.findById(financeDTO.getAssetId())
                    .orElseThrow(() -> new EntityNotFoundException("Asset not found with id: " + financeDTO.getAssetId()));
            finance.setAsset(asset);
        }

        switch (financeDTO.getOperationType()) {
            case "Loan Calculation":
                calculateLoanDetails(finance, financeDTO);
                break;
            case "Depreciation Calculation":
                calculateDepreciation(finance, financeDTO);
                break;
            case "Asset Sale":
                calculateProfitLoss(finance, financeDTO);
                break;
        }

        Finance savedFinance = financeRepository.save(finance);
        return convertToDTO(savedFinance);
    }

    private void calculateLoanDetails(Finance finance, FinanceDTO dto) {
        finance.setPrincipalAmount(dto.getPrincipalAmount());
        finance.setInterestRate(dto.getInterestRate());
        finance.setLoanTerm(dto.getLoanTerm());

        double monthlyRate = dto.getInterestRate() / 100 / 12;
        int numberOfPayments = dto.getLoanTerm() * 12;

        double monthlyPayment = (dto.getPrincipalAmount() * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))
                / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        double totalPayment = monthlyPayment * numberOfPayments;
        double totalInterest = totalPayment - dto.getPrincipalAmount();

        finance.setMonthlyPayment(monthlyPayment);
        finance.setTotalPayment(totalPayment);
        finance.setTotalInterest(totalInterest);
    }

    private void calculateDepreciation(Finance finance, FinanceDTO dto) {
        finance.setDepreciationMethod(dto.getDepreciationMethod());
        finance.setUsefulLife(dto.getUsefulLife());
        finance.setSalvageValue(dto.getSalvageValue());

        double annualDepreciation = 0;
        if ("Straight Line".equals(dto.getDepreciationMethod())) {
            annualDepreciation = (dto.getPurchasePrice() - dto.getSalvageValue()) / dto.getUsefulLife();
        } else if ("Double Declining".equals(dto.getDepreciationMethod())) {
            double rate = 2.0 / dto.getUsefulLife();
            annualDepreciation = dto.getPurchasePrice() * rate;
        }

        finance.setAnnualDepreciation(annualDepreciation);
        finance.setPurchasePrice(dto.getPurchasePrice());
    }

    private void calculateProfitLoss(Finance finance, FinanceDTO dto) {
        finance.setSalePrice(dto.getSalePrice());
        finance.setPurchasePrice(dto.getPurchasePrice());
        finance.setProfitLoss(dto.getSalePrice() - dto.getPurchasePrice());
    }

    public void deleteFinanceRecord(Long id) {
        if (!financeRepository.existsById(id)) {
            throw new EntityNotFoundException("Finance record not found with id: " + id);
        }
        financeRepository.deleteById(id);
    }

    private FinanceDTO convertToDTO(Finance finance) {
        FinanceDTO dto = new FinanceDTO();
        dto.setId(finance.getId());
        dto.setFinanceId(finance.getFinanceId());
        dto.setOperationType(finance.getOperationType());
        if (finance.getAsset() != null) {
            dto.setAssetId(finance.getAsset().getId());
            dto.setAssetName(finance.getAsset().getName());
        }
        dto.setPrincipalAmount(finance.getPrincipalAmount());
        dto.setInterestRate(finance.getInterestRate());
        dto.setLoanTerm(finance.getLoanTerm());
        dto.setMonthlyPayment(finance.getMonthlyPayment());
        dto.setTotalInterest(finance.getTotalInterest());
        dto.setTotalPayment(finance.getTotalPayment());
        dto.setDepreciationMethod(finance.getDepreciationMethod());
        dto.setUsefulLife(finance.getUsefulLife());
        dto.setSalvageValue(finance.getSalvageValue());
        dto.setAnnualDepreciation(finance.getAnnualDepreciation());
        dto.setSalePrice(finance.getSalePrice());
        dto.setPurchasePrice(finance.getPurchasePrice());
        dto.setProfitLoss(finance.getProfitLoss());
        dto.setTransactionDate(finance.getTransactionDate());
        dto.setNotes(finance.getNotes());
        return dto;
    }
} 