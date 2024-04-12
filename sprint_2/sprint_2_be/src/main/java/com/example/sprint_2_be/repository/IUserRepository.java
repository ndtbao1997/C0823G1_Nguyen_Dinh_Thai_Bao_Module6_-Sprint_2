package com.example.sprint_2_be.repository;

import com.example.sprint_2_be.dto.IUserDTO;
import com.example.sprint_2_be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
@Query(value = "SELECT \n" +
        "    user.id AS id,\n" +
        "    user.email AS email,\n" +
        "    user.full_name AS fullName,\n" +
        "    user.is_deleted AS isDeleted,\n" +
        "    user.password AS password,\n" +
        "    user.profile AS profile,\n" +
        "    user.user_name AS userName,\n" +
        "    GROUP_CONCAT(role.name) AS role\n" +
        "FROM \n" +
        "    user \n" +
        "JOIN \n" +
        "    role_user_details ON role_user_details.user_id = user.id\n" +
        "JOIN \n" +
        "    role ON role.id = role_user_details.role_id \n" +
        "WHERE \n" +
        "    user.user_name = :userName \n" +
        "GROUP BY \n" +
        "    user.id, user.email, user.full_name, user.is_deleted, user.password, user.profile, user.user_name", nativeQuery = true)
    Optional<IUserDTO> findAllRoleByUserName(@Param("userName") String userName);

    Optional<User> findByUserName(String userName);
}
