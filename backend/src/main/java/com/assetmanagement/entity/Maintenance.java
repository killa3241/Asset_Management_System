package com.assetmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "maintenance")
public class Maintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "maintenance_id", unique = true, nullable = false)
    private String maintenanceId;

    @ManyToOne
    @JoinColumn(name = "asset_id", nullable = false)
    private Asset asset;

    @Column(name = "scheduled_date", nullable = false)
    private LocalDate scheduledDate;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "technician", nullable = false)
    private String technician;

    @Column(name = "cost", nullable = false)
    private Double cost;

    @Column(name = "status", nullable = false)
    private String status;

    @PrePersist
    public void generateMaintenanceId() {
        this.maintenanceId = "M" + String.format("%03d", this.id);
    }
} 