package controller;

import javafx.fxml.FXML;
import javafx.scene.control.TextField;

public class AssetController {
    @FXML
    private TextField assetNameField;

    @FXML
    private void addAsset() {
        String assetName = assetNameField.getText();
        System.out.println("Adding Asset: " + assetName);
        // Add database logic here
    }
}
