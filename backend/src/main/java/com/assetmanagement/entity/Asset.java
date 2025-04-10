package com.assetmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private LocalDate purchaseDate;
    private String status;
    private Double value;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User assignedUser;

    private LocalDate lastMaintenanceDate;

    private boolean obsolete = false;
    private boolean disposed = false;

    public Asset(String name, String type, LocalDate purchaseDate, String status, Double value) {
        this.name = name;
        this.type = type;
        this.purchaseDate = purchaseDate;
        this.status = status;
        this.value = value;
    }

    public void assignToUser(User user) {
        this.assignedUser = user;
    }

    public void updateStatus(String newStatus) {
        this.status = newStatus;
    }

    public void scheduleMaintenance(LocalDate date) {
        this.status = "Scheduled for Maintenance";
        this.lastMaintenanceDate = date;
    }

    public void completeMaintenance() {
        this.status = "Active";
    }

    public void markObsolete() {
        this.status = "Obsolete";
        this.obsolete = true;
    }

    public void disposeAsset() {
        this.status = "Disposed";
        this.disposed = true;
    }
}
