package com.example.sprint_2_be.service;

import com.example.sprint_2_be.dto.IUserDTO;
import com.example.sprint_2_be.dto.UserDTO;
import com.example.sprint_2_be.model.User;

import java.util.Optional;

public interface IUserService extends IGeneratedService<User>{
    Boolean checkUserDTO(UserDTO userDTO);

    Optional<IUserDTO> findRoleByUserName(String userName);
}
