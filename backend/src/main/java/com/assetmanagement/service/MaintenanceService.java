package com.assetmanagement.service;

import com.assetmanagement.dto.MaintenanceDTO;
import com.assetmanagement.entity.Asset;
import com.assetmanagement.entity.Maintenance;
import com.assetmanagement.repository.AssetRepository;
import com.assetmanagement.repository.MaintenanceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Autowired
    private AssetRepository assetRepository;

    public List<MaintenanceDTO> getAllMaintenance() {
        return maintenanceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MaintenanceDTO getMaintenanceById(Long id) {
        Maintenance maintenance = maintenanceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Maintenance not found with id: " + id));
        return convertToDTO(maintenance);
    }

    public MaintenanceDTO createMaintenance(MaintenanceDTO maintenanceDTO) {
        Asset asset = assetRepository.findById(maintenanceDTO.getAssetId())
                .orElseThrow(() -> new EntityNotFoundException("Asset not found with id: " + maintenanceDTO.getAssetId()));

        Maintenance maintenance = new Maintenance();
        maintenance.setAsset(asset);
        maintenance.setScheduledDate(maintenanceDTO.getScheduledDate());
        maintenance.setType(maintenanceDTO.getType());
        maintenance.setDescription(maintenanceDTO.getDescription());
        maintenance.setTechnician(maintenanceDTO.getTechnician());
        maintenance.setCost(maintenanceDTO.getCost());
        maintenance.setStatus("Scheduled");

        Maintenance savedMaintenance = maintenanceRepository.save(maintenance);
        return convertToDTO(savedMaintenance);
    }

    public MaintenanceDTO updateMaintenance(Long id, MaintenanceDTO maintenanceDTO) {
        Maintenance maintenance = maintenanceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Maintenance not found with id: " + id));

        Asset asset = assetRepository.findById(maintenanceDTO.getAssetId())
                .orElseThrow(() -> new EntityNotFoundException("Asset not found with id: " + maintenanceDTO.getAssetId()));

        maintenance.setAsset(asset);
        maintenance.setScheduledDate(maintenanceDTO.getScheduledDate());
        maintenance.setType(maintenanceDTO.getType());
        maintenance.setDescription(maintenanceDTO.getDescription());
        maintenance.setTechnician(maintenanceDTO.getTechnician());
        maintenance.setCost(maintenanceDTO.getCost());
        maintenance.setStatus(maintenanceDTO.getStatus());

        Maintenance updatedMaintenance = maintenanceRepository.save(maintenance);
        return convertToDTO(updatedMaintenance);
    }

    public void deleteMaintenance(Long id) {
        if (!maintenanceRepository.existsById(id)) {
            throw new EntityNotFoundException("Maintenance not found with id: " + id);
        }
        maintenanceRepository.deleteById(id);
    }

    private MaintenanceDTO convertToDTO(Maintenance maintenance) {
        MaintenanceDTO dto = new MaintenanceDTO();
        dto.setId(maintenance.getId());
        dto.setMaintenanceId(maintenance.getMaintenanceId());
        dto.setAssetId(maintenance.getAsset().getId());
        dto.setAssetName(maintenance.getAsset().getName());
        dto.setScheduledDate(maintenance.getScheduledDate());
        dto.setType(maintenance.getType());
        dto.setDescription(maintenance.getDescription());
        dto.setTechnician(maintenance.getTechnician());
        dto.setCost(maintenance.getCost());
        dto.setStatus(maintenance.getStatus());
        return dto;
    }
} 