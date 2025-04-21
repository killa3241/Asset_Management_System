package com.assetmanagement.controller;

import com.assetmanagement.entity.Asset;
import com.assetmanagement.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/{id}")
    public ResponseEntity<?> getAssetById(@PathVariable Long id) {
        try {
            Optional<Asset> asset = assetService.getAssetById(id);
            if (asset.isPresent()) {
                return ResponseEntity.ok(asset.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getAssetsByUser(@PathVariable Long userId) {
        try {
            List<Asset> assets = assetService.getAssetsByUser(userId);
            return ResponseEntity.ok(assets);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/assign/{assetId}")
    public ResponseEntity<?> assignAsset(@PathVariable Long assetId, @RequestParam Long userId) {
        try {
            Asset asset = assetService.assignAssetToUser(assetId, userId);
            return ResponseEntity.ok(asset);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/unassign/{assetId}")
    public ResponseEntity<?> unassignAsset(@PathVariable Long assetId) {
        try {
            Asset asset = assetService.unassignAsset(assetId);
            return ResponseEntity.ok(asset);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/maintenance/schedule/{id}")
    public ResponseEntity<?> scheduleMaintenance(@PathVariable Long id, @RequestParam String date) {
        try {
            Asset asset = assetService.scheduleMaintenance(id, LocalDate.parse(date));
            return ResponseEntity.ok(asset);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/maintenance/complete/{id}")
    public ResponseEntity<?> completeMaintenance(@PathVariable Long id) {
        try {
            Asset asset = assetService.completeMaintenance(id);
            return ResponseEntity.ok(asset);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/obsolete/{id}")
    public ResponseEntity<?> markObsolete(@PathVariable Long id) {
        try {
            Asset asset = assetService.markObsolete(id);
            return ResponseEntity.ok(asset);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            Asset asset = assetService.updateAssetStatus(id, status);
            return ResponseEntity.ok(asset);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/dispose/{id}")
    public ResponseEntity<?> disposeAsset(@PathVariable Long id) {
        try {
            Asset asset = assetService.disposeAsset(id);
            return ResponseEntity.ok(asset);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAsset(@PathVariable Long id) {
        try {
            assetService.deleteAsset(id);
            return ResponseEntity.ok().body(Map.of("message", "Asset deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }
}