package com.example.sprint_2_be.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    public static final String SECRET_KEY = "73608685541105edccb3ea757e3e6487d30f71977c74db789b5df252d85d598b";
    public static final long EXPIRE_TIME = 86400000;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsTFunction) {
        final Jws<Claims> claimsJws = Jwts.parser()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token);
        final Claims claims = claimsJws.getBody();
        return claimsTFunction.apply(claims);
    }

    public String generateTokenLogin(String username) {
        Date expiryDate = new Date(System.currentTimeMillis() + EXPIRE_TIME);
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(expiryDate)
                .signWith(getSignKey())
                .compact();
    }

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public Boolean validateTokenLogin(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = extractClaim(token, Claims::getExpiration);
        return expiration.before(new Date());
    }
}