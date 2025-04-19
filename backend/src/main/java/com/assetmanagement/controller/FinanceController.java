package com.assetmanagement.controller;

import com.assetmanagement.dto.FinanceDTO;
import com.assetmanagement.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finance")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FinanceController {

    @Autowired
    private FinanceService financeService;

    @GetMapping
    public ResponseEntity<List<FinanceDTO>> getAllFinanceRecords() {
        return ResponseEntity.ok(financeService.getAllFinanceRecords());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinanceDTO> getFinanceRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(financeService.getFinanceRecordById(id));
    }

    @PostMapping
    public ResponseEntity<FinanceDTO> createFinanceRecord(@RequestBody FinanceDTO financeDTO) {
        return ResponseEntity.ok(financeService.createFinanceRecord(financeDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFinanceRecord(@PathVariable Long id) {
        financeService.deleteFinanceRecord(id);
        return ResponseEntity.ok().build();
    }
} 