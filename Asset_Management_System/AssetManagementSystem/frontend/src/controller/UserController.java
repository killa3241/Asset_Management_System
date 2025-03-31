package controller;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class UserController {
    @FXML
    private Label welcomeLabel;

    public void initialize() {
        welcomeLabel.setText("Welcome, User!");
    }

    @FXML
    private void handleViewAssets(ActionEvent event) {
        System.out.println("Viewing assigned assets...");
        // Add scene switching logic here
    }
}
