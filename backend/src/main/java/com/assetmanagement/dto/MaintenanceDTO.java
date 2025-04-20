package com.assetmanagement.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class MaintenanceDTO {
    private Long id;
    private String maintenanceId;
    private Long assetId;
    private String assetName;
    private LocalDate scheduledDate;
    private String type;
    private String description;
    private String technician;
    private Double cost;
    private String status;
} 