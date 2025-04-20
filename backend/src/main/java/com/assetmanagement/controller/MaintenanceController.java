package com.assetmanagement.controller;

import com.assetmanagement.dto.MaintenanceDTO;
import com.assetmanagement.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    @GetMapping
    public ResponseEntity<List<MaintenanceDTO>> getAllMaintenance() {
        return ResponseEntity.ok(maintenanceService.getAllMaintenance());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceDTO> getMaintenanceById(@PathVariable Long id) {
        return ResponseEntity.ok(maintenanceService.getMaintenanceById(id));
    }

    @PostMapping
    public ResponseEntity<MaintenanceDTO> createMaintenance(@RequestBody MaintenanceDTO maintenanceDTO) {
        return ResponseEntity.ok(maintenanceService.createMaintenance(maintenanceDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaintenanceDTO> updateMaintenance(
            @PathVariable Long id,
            @RequestBody MaintenanceDTO maintenanceDTO) {
        return ResponseEntity.ok(maintenanceService.updateMaintenance(id, maintenanceDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaintenance(@PathVariable Long id) {
        maintenanceService.deleteMaintenance(id);
        return ResponseEntity.ok().build();
    }
} 