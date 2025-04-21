package com.assetmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceDTO {
    private Long assetId;
    private String maintenanceId;
    private String assetName;
    private String assetType;
    private String serialNumber;
    private LocalDate scheduledDate;
    private String maintenanceType;
    private String description;
    private String technician;
    private Double cost;
    private LocalDate lastMaintenanceDate;
    private String location;
    private String department;
}