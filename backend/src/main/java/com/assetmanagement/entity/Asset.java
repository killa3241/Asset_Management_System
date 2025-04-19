package com.assetmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonFormat;

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

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate purchaseDate;
    
    private String status;
    private Double value;
    private String serialNumber;
    private String model;
    private String manufacturer;
    private String location;
    private String department;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate warrantyExpiration;
    
    private String notes;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User assignedUser;

    private LocalDate lastMaintenanceDate;
    private boolean obsolete = false;
    private boolean disposed = false;
    private boolean permanentlyRemoved = false;

    public Asset(String name, String type, LocalDate purchaseDate, String status, Double value) {
        this.name = name;
        this.type = type;
        this.purchaseDate = purchaseDate;
        this.status = status;
        this.value = value;
        this.permanentlyRemoved = false;
    }

    public void assignToUser(User user) {
        this.assignedUser = user;
        this.status = "Assigned";
    }

    public void updateStatus(String newStatus) {
        if (this.status.equals("Disposed")) {
            throw new IllegalArgumentException("Cannot change status of a disposed asset");
        }
        
        if (isValidStatusTransition(this.status, newStatus)) {
            this.status = newStatus;
            if (newStatus.equals("Obsolete")) {
                this.obsolete = true;
            } else if (newStatus.equals("Disposed")) {
                this.disposed = true;
            }
        } else {
            throw new IllegalArgumentException("Invalid status transition from " + this.status + " to " + newStatus);
        }
    }

    private boolean isValidStatusTransition(String currentStatus, String newStatus) {
        switch (currentStatus) {
            case "Available":
                return newStatus.equals("Obsolete") || newStatus.equals("Disposed");
            case "Obsolete":
                return newStatus.equals("Disposed");
            case "Disposed":
                return false; // No transitions allowed from Disposed
            default:
                return false;
        }
    }

    public void scheduleMaintenance(LocalDate date) {
        this.status = "Maintenance";
        this.lastMaintenanceDate = date;
    }

    public void completeMaintenance() {
        if (this.assignedUser != null) {
            this.status = "Assigned";
        } else {
            this.status = "Available";
        }
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
