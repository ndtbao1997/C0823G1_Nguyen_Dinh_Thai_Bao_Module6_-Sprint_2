package com.example.sprint_2_be.service.impl;

import com.example.sprint_2_be.model.Role;
import com.example.sprint_2_be.repository.IRoleRepository;
import com.example.sprint_2_be.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository iRoleRepository;


    @Override
    public Optional<Role> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Iterator<Role> findAll() {
        return null;
    }

    @Override
    public Role save(Role role) {
        return null;
    }

    @Override
    public void save1(Role role) {

    }

    @Override
    public void deleteById(Long id) {

    }

}
