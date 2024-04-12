package com.example.sprint_2_be.repository;

import com.example.sprint_2_be.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IProductRepository extends JpaRepository<Product,Long> {
}
