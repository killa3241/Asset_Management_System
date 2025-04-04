package com.assetmanagement.service;

import com.assetmanagement.entity.User;
import com.assetmanagement.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public String registerUser(String username, String password) {
        if (userRepo.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password)); // Encrypt password
        userRepo.save(user);

        return "User registered successfully";
    }

    public boolean loginUser(String username, String password) {
        Optional<User> userOptional = userRepo.findByUsername(username);
        return userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword());
    }
}
