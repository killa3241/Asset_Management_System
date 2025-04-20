package com.assetmanagement.controller;

import com.assetmanagement.entity.Asset;
import com.assetmanagement.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @PostMapping("/add")
    public ResponseEntity<?> addAsset(@RequestBody Asset asset) {
        try {
            System.out.println("Received asset data: " + asset);
            
            // Validate required fields
            if (asset.getName() == null || asset.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Asset name is required"));
            }
            if (asset.getType() == null || asset.getType().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Asset type is required"));
            }
            if (asset.getPurchaseDate() == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Purchase date is required"));
            }
            if (asset.getValue() == null || asset.getValue() <= 0) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Valid asset value is required"));
            }

            // Ensure the asset starts with "Available" status
            asset.setStatus("Available");
            Asset savedAsset = assetService.addAsset(asset);
            return ResponseEntity.ok(savedAsset);
        } catch (Exception e) {
            System.out.println("Error processing asset: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/all")
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }

    @PutMapping("/assign/{assetId}")
    public Asset assignAsset(@PathVariable Long assetId, @RequestParam Long userId) {
        return assetService.assignAssetToUser(assetId, userId);
    }

    @PutMapping("/maintenance/schedule/{id}")
    public Asset scheduleMaintenance(@PathVariable Long id, @RequestParam String date) {
        return assetService.scheduleMaintenance(id, LocalDate.parse(date));
    }

    @PutMapping("/maintenance/complete/{id}")
    public Asset completeMaintenance(@PathVariable Long id) {
        return assetService.completeMaintenance(id);
    }

    @PutMapping("/obsolete/{id}")
    public Asset markObsolete(@PathVariable Long id) {
        return assetService.markObsolete(id);
    }

    @PutMapping("/status/{id}")
    public Asset updateStatus(@PathVariable Long id, @RequestParam String status) {
        return assetService.updateAssetStatus(id, status);
    }

    @PutMapping("/dispose/{id}")
    public Asset disposeAsset(@PathVariable Long id) {
        return assetService.disposeAsset(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAsset(@PathVariable Long id) {
        try {
            assetService.deleteAsset(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }
}
