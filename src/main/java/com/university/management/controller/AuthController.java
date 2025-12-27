package com.university.management.controller;

import com.university.management.entity.RefreshToken;
import com.university.management.repository.RefreshTokenRepository;
import com.university.management.security.RefreshTokenService;
import com.university.management.security.jwt.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.userdetails.UserDetailsService;


import java.util.Map;
import com.university.management.dto.LoginRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.authentication.BadCredentialsException;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;


    private final UserDetailsService userDetailsService;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            RefreshTokenService refreshTokenService,
            RefreshTokenRepository refreshTokenRepository,
            UserDetailsService userDetailsService
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userDetailsService = userDetailsService;
    }



    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );

        // ✅ THIS IS CRITICAL
        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        String accessToken = jwtUtil.generateToken(userDetails);

        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(
                        userDetails.getUsername()
                );

        return Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken.getToken()
        );
    }




    @PostMapping("/refresh")
    public Map<String, String> refreshToken(@RequestParam String refreshToken) {

        RefreshToken token = refreshTokenService.verifyExpiration(refreshToken);

        String username = token.getUser().getUsername();

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(username);

        String newAccessToken = jwtUtil.generateToken(userDetails);

        return Map.of(
                "accessToken", newAccessToken
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam String refreshToken) {

        refreshTokenRepository.findByToken(refreshToken)
                .ifPresent(refreshTokenRepository::delete);

        return ResponseEntity.ok("Logged out successfully");
    }





}
