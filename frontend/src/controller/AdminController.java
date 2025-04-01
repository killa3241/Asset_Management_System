package controller;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class AdminController {
    @FXML
    private Label welcomeLabel;

    public void initialize() {
        welcomeLabel.setText("Welcome, Admin!");
    }

    @FXML
    private void handleManageAssets(ActionEvent event) {
        System.out.println("Navigating to Manage Assets...");
        // Add scene switching logic here
    }

    @FXML
    private void handleViewReports(ActionEvent event) {
        System.out.println("Viewing Reports...");
        // Add scene switching logic here
    }
}
