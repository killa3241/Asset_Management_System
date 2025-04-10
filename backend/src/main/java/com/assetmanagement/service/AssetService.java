package com.assetmanagement.service;

import com.assetmanagement.entity.Asset;
import com.assetmanagement.entity.User;
import com.assetmanagement.repository.AssetRepository;
import com.assetmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private UserRepository userRepository;  // Inject user repository

    public Asset addAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Optional<Asset> getAssetById(Long id) {
        return assetRepository.findById(id);
    }

    public Asset assignAssetToUser(Long assetId, Long userId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        asset.assignToUser(user);
        return assetRepository.save(asset);
    }

    public Asset updateAssetStatus(Long id, String status) {
        Asset asset = assetRepository.findById(id).orElseThrow();
        asset.updateStatus(status);
        return assetRepository.save(asset);
    }

    public Asset scheduleMaintenance(Long id, LocalDate date) {
        Asset asset = assetRepository.findById(id).orElseThrow();
        asset.scheduleMaintenance(date);
        return assetRepository.save(asset);
    }

    public Asset completeMaintenance(Long id) {
        Asset asset = assetRepository.findById(id).orElseThrow();
        asset.completeMaintenance();
        return assetRepository.save(asset);
    }

    public Asset markObsolete(Long id) {
        Asset asset = assetRepository.findById(id).orElseThrow();
        asset.markObsolete();
        return assetRepository.save(asset);
    }

    public Asset disposeAsset(Long id) {
        Asset asset = assetRepository.findById(id).orElseThrow();
        asset.disposeAsset();
        return assetRepository.save(asset);
    }

    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }
}
