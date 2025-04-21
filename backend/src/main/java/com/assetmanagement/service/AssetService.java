package com.assetmanagement.service;

import com.assetmanagement.entity.Asset;
import com.assetmanagement.entity.User;
import com.assetmanagement.repository.AssetRepository;
import com.assetmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private UserRepository userRepository;

    public Asset addAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Optional<Asset> getAssetById(Long id) {
        return assetRepository.findById(id);
    }

    @Transactional
    public Asset assignAssetToUser(Long assetId, Long userId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + assetId));

        // If asset is disposed, it cannot be assigned
        if ("Disposed".equals(asset.getStatus())) {
            throw new IllegalStateException("Cannot assign a disposed asset to a user");
        }

        // Find user by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Assign asset to user
        asset.assignToUser(user);

        return assetRepository.save(asset);
    }

    @Transactional
    public Asset unassignAsset(Long assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + assetId));

        // Only unassign if currently assigned
        if (asset.getAssignedUser() != null) {
            asset.unassignUser();
            return assetRepository.save(asset);
        }

        return asset;
    }

    public Asset updateAssetStatus(Long id, String status) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));
        asset.updateStatus(status);
        return assetRepository.save(asset);
    }

    public Asset scheduleMaintenance(Long id, LocalDate date) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));
        asset.scheduleMaintenance(date);
        return assetRepository.save(asset);
    }

    public Asset completeMaintenance(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));
        asset.completeMaintenance();
        return assetRepository.save(asset);
    }

    public Asset markObsolete(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));
        asset.markObsolete();
        return assetRepository.save(asset);
    }

    public Asset disposeAsset(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));
        asset.disposeAsset();
        return assetRepository.save(asset);
    }

    @Transactional
    public void deleteAsset(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));

        // First unassign any user if assigned
        if (asset.getAssignedUser() != null) {
            asset.unassignUser();
        }

        assetRepository.deleteById(id);
    }

    public List<Asset> getAssetsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        return assetRepository.findByAssignedUser(user);
    }
}