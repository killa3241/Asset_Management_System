package com.assetmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

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

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @PrePersist
    public void prePersist() {
        // Generate a unique maintenance ID based on timestamp and random UUID segment
        // Format: M-yyyyMMdd-randomChars (e.g., M-20250421-a7b9c)
        String datePart = LocalDate.now().toString().replace("-", "");
        String randomPart = UUID.randomUUID().toString().substring(0, 5);
        this.maintenanceId = "M-" + datePart + "-" + randomPart;

        // Set creation timestamp
        this.createdAt = LocalDateTime.now();

        // Set default status if not specified
        if (this.status == null || this.status.isEmpty()) {
            this.status = "Scheduled";
        }
    }

    /**
     * Mark the maintenance as completed
     */
    public void markCompleted() {
        this.status = "Completed";
        this.completedAt = LocalDateTime.now();
    }

    /**
     * Calculate if the maintenance is overdue
     * @return true if maintenance is scheduled in the past and not completed
     */
    @Transient
    public boolean isOverdue() {
        return !status.equals("Completed") &&
                scheduledDate.isBefore(LocalDate.now());
    }
}