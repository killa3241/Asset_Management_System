package com.assetmanagement.repository;

import com.assetmanagement.entity.Asset;
import com.assetmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByAssignedUser(User user);

    // Find all assets with "Maintenance" status
    List<Asset> findByStatusIgnoreCase(String status);

    // Find assets with "Maintenance" status and optional filtering
    @Query("SELECT a FROM Asset a WHERE LOWER(a.status) = LOWER('Maintenance') " +
            "AND (:type IS NULL OR LOWER(a.type) = LOWER(:type)) " +
            "AND (:searchTerm IS NULL OR LOWER(a.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Asset> findMaintenanceAssets(@Param("type") String type, @Param("searchTerm") String searchTerm);

    // Find by maintenance technician
    List<Asset> findByStatusIgnoreCaseAndMaintenanceTechnicianContainingIgnoreCase(String status, String technician);

    // Find by maintenance type
    List<Asset> findByStatusIgnoreCaseAndMaintenanceTypeContainingIgnoreCase(String status, String type);
}