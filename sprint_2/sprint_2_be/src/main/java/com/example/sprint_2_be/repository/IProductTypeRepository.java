package com.example.sprint_2_be.repository;

import com.example.sprint_2_be.dto.IProductTypeDTO;
import com.example.sprint_2_be.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductTypeRepository extends JpaRepository<ProductType,Long> {
    @Query(value = "select product_type.id as id,\n" +
            "product_type.name as name\n" +
            "from product_type", nativeQuery = true)
    List<IProductTypeDTO> findAllDTO();
}
