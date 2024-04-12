package com.example.sprint_2_be.service.impl;

import com.example.sprint_2_be.dto.IUserDTO;
import com.example.sprint_2_be.dto.UserDTO;
import com.example.sprint_2_be.model.User;
import com.example.sprint_2_be.repository.IUserRepository;
import com.example.sprint_2_be.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public Optional<User> findById(Long id) {
        return iUserRepository.findById(id);
    }

    @Override
    public Iterator<User> findAll() {
        return null;
    }

    @Override
    public User save(User user) {
        return iUserRepository.save(user);
    }

    @Override
    public void save1(User user) {

    }

    @Override
    public void deleteById(Long id) {

    }


    @Override
    public Boolean checkUserDTO(UserDTO userDTO) {
        Optional<User> user = iUserRepository.findByUserName(userDTO.getUserName());
        return user.filter(value -> passwordEncoder.matches(userDTO.getPassword(), value.getPassword())).isPresent();
    }

    @Override
    public Optional<IUserDTO> findRoleByUserName(String userName) {
        return iUserRepository.findAllRoleByUserName(userName);
    }
}
