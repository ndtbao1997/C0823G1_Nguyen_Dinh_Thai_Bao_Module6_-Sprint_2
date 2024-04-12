package com.example.sprint_2_be.service.impl;

import com.example.sprint_2_be.model.RoleUserDetails;
import com.example.sprint_2_be.repository.IRoleUserDetailsRepository;
import com.example.sprint_2_be.service.IRoleUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.Optional;

@Service
public class RoleUserDetailsService implements IRoleUserDetailsService {
    @Autowired
    private IRoleUserDetailsRepository iRoleUserDetailsRepository;

    @Override
    public Optional<RoleUserDetails> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Iterator<RoleUserDetails> findAll() {
        return null;
    }

    @Override
    public RoleUserDetails save(RoleUserDetails roleUserDetails) {
        return null;
    }

    @Override
    public void save1(RoleUserDetails roleUserDetails) {

    }

    @Override
    public void deleteById(Long id) {

    }

}
