package com.assetmanagement.service;

import com.assetmanagement.dto.MaintenanceDTO;
import com.assetmanagement.entity.Asset;
import com.assetmanagement.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaintenanceService {

    @Autowired
    private AssetRepository assetRepository;

    public List<MaintenanceDTO> getAllMaintenance() {
        return assetRepository.findByStatusIgnoreCase("Maintenance")
                .stream()
                .map(this::convertToMaintenanceDTO)
                .collect(Collectors.toList());
    }

    public List<MaintenanceDTO> getMaintenanceByFilter(String type, String searchTerm) {
        return assetRepository.findMaintenanceAssets(type, searchTerm)
                .stream()
                .map(this::convertToMaintenanceDTO)
                .collect(Collectors.toList());
    }

    public MaintenanceDTO getMaintenanceById(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));

        if (!"Maintenance".equalsIgnoreCase(asset.getStatus())) {
            throw new RuntimeException("Asset with ID " + id + " is not in maintenance");
        }

        return convertToMaintenanceDTO(asset);
    }

    @Transactional
    public MaintenanceDTO createMaintenance(MaintenanceDTO maintenanceDTO) {
        Asset asset = assetRepository.findById(maintenanceDTO.getAssetId())
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + maintenanceDTO.getAssetId()));

        asset.scheduleMaintenance(
                maintenanceDTO.getScheduledDate(),
                maintenanceDTO.getMaintenanceType(),
                maintenanceDTO.getTechnician(),
                maintenanceDTO.getCost(),
                maintenanceDTO.getDescription()
        );

        Asset savedAsset = assetRepository.save(asset);
        return convertToMaintenanceDTO(savedAsset);
    }

    @Transactional
    public MaintenanceDTO updateMaintenance(Long id, MaintenanceDTO maintenanceDTO) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));

        if (!"Maintenance".equalsIgnoreCase(asset.getStatus())) {
            throw new RuntimeException("Cannot update maintenance for an asset not in maintenance status");
        }

        asset.setScheduledMaintenanceDate(maintenanceDTO.getScheduledDate());
        asset.setMaintenanceType(maintenanceDTO.getMaintenanceType());
        asset.setMaintenanceTechnician(maintenanceDTO.getTechnician());
        asset.setMaintenanceCost(maintenanceDTO.getCost());
        asset.setMaintenanceDescription(maintenanceDTO.getDescription());

        Asset savedAsset = assetRepository.save(asset);
        return convertToMaintenanceDTO(savedAsset);
    }

    @Transactional
    public void completeMaintenance(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));

        if (!"Maintenance".equalsIgnoreCase(asset.getStatus())) {
            throw new RuntimeException("Cannot complete maintenance for an asset not in maintenance status");
        }

        asset.completeMaintenance();
        assetRepository.save(asset);
    }

    @Transactional
    public void deleteMaintenance(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));

        if (!"Maintenance".equalsIgnoreCase(asset.getStatus())) {
            throw new RuntimeException("Cannot delete maintenance for an asset not in maintenance status");
        }

        // Return the asset to Available or Assigned status
        asset.completeMaintenance();
        assetRepository.save(asset);
    }

    private MaintenanceDTO convertToMaintenanceDTO(Asset asset) {
        MaintenanceDTO dto = new MaintenanceDTO();
        dto.setAssetId(asset.getId());
        dto.setMaintenanceId(asset.getMaintenanceId());
        dto.setAssetName(asset.getName());
        dto.setAssetType(asset.getType());
        dto.setSerialNumber(asset.getSerialNumber());
        dto.setScheduledDate(asset.getScheduledMaintenanceDate());
        dto.setMaintenanceType(asset.getMaintenanceType());
        dto.setDescription(asset.getMaintenanceDescription());
        dto.setTechnician(asset.getMaintenanceTechnician());
        dto.setCost(asset.getMaintenanceCost());
        dto.setLastMaintenanceDate(asset.getLastMaintenanceDate());
        dto.setLocation(asset.getLocation());
        dto.setDepartment(asset.getDepartment());
        return dto;
    }
}