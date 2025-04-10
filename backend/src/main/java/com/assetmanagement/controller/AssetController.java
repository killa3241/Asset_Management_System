package com.assetmanagement.controller;

import com.assetmanagement.entity.Asset;
import com.assetmanagement.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:3000")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @PostMapping("/add")
    public Asset addAsset(@RequestBody Asset asset) {
        return assetService.addAsset(asset);
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
}
