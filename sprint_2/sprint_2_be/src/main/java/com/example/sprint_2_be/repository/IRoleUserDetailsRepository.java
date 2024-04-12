package com.example.sprint_2_be.repository;

import com.example.sprint_2_be.model.RoleUserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleUserDetailsRepository extends JpaRepository<RoleUserDetails,Long> {
}
