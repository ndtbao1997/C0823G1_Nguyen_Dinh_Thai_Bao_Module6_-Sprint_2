package com.example.sprint_2_be.repository;

import com.example.sprint_2_be.dto.IEvaluateDTO;
import com.example.sprint_2_be.model.Evaluate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IEvaluateRepository extends JpaRepository<Evaluate, Long> {
    @Query(value = "select evaluate.id as id,\n" +
            "evaluate.content as content,\n" +
            "evaluate.product_id as productId,\n" +
            "evaluate.email as email,\n" +
            "evaluate.full_name as fullName,\n" +
            "evaluate.stars as stars,\n" +
            "evaluate.evaluate_date as evaluateDate \n" +
            "from evaluate where product_id = :productId \n" +
            "ORDER BY evaluateDate desc limit 5",nativeQuery = true)
    List<IEvaluateDTO> getAllEvaluateDTOByProductId(@Param("productId") Long id);
}
