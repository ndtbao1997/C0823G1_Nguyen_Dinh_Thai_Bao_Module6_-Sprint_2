package com.example.sprint_2_be.controller;

import com.example.sprint_2_be.config.JwtService;
import com.example.sprint_2_be.dto.IUserDTO;
import com.example.sprint_2_be.dto.UserClientDTO;
import com.example.sprint_2_be.dto.UserDTO;
import com.example.sprint_2_be.service.IUserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("Access-Control-Allow-Origin")
@RequestMapping("/api/user")
public class UserRestController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private IUserService iUserService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO, HttpServletResponse response) {
        if (iUserService.checkUserDTO(userDTO)) {
            UserClientDTO userClientDTO = new UserClientDTO();
            Optional<IUserDTO> iUserDTO = iUserService.findRoleByUserName(userDTO.getUserName());
            if (!iUserDTO.isPresent()){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            if (iUserDTO.get().getIsDeleted()){
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
            String jwtToken = jwtService.generateTokenLogin(userDTO.getUserName());
            Cookie cookie = new Cookie("jwtToken", jwtToken);
            cookie.setMaxAge(24 * 60 * 60 * 7);
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            response.addCookie(cookie);
            userClientDTO.setUserName(iUserDTO.get().getUserName());
            userClientDTO.setFullName(iUserDTO.get().getFullName());
            userClientDTO.setProfile(iUserDTO.get().getProfile());
            userClientDTO.setId(iUserDTO.get().getId());
            userClientDTO.setRole(iUserDTO.get().getRole());
            userClientDTO.setEmail(iUserDTO.get().getEmail());
            return new ResponseEntity<>(userClientDTO,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        Cookie cookie = new Cookie("jwtToken", "");
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
