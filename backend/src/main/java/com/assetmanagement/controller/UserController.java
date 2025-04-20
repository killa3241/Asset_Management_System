package com.assetmanagement.controller;

import com.assetmanagement.entity.User;
import com.assetmanagement.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();

            // Convert users to DTO format to avoid sending password
            List<Map<String, Object>> usersDto = users.stream()
                    .map(user -> {
                        Map<String, Object> userMap = new HashMap<>();
                        userMap.put("id", user.getId());
                        userMap.put("username", user.getUsername());
                        // You can calculate or fetch assetCount here if needed
                        userMap.put("assetCount", 0); // Placeholder for now
                        return userMap;
                    })
                    .collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("users", usersDto);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to fetch users: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
        try {
            Optional<User> userOpt = userRepository.findById(id);

            if (userOpt.isPresent()) {
                userRepository.deleteById(id);

                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "User deleted successfully");

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "User not found with id: " + id);

                return ResponseEntity.status(404).body(response);
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete user: " + e.getMessage());

            return ResponseEntity.internalServerError().body(response);
        }
    }
}