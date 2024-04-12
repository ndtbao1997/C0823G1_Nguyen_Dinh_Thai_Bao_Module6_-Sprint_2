package com.example.sprint_2_be.repository;

import com.example.sprint_2_be.dto.IProductDetailsDTO;
import com.example.sprint_2_be.model.ProductDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IProductDetailsRepository extends JpaRepository<ProductDetails,Long> {
    @Query(value = "SELECT \n" +
            "pd.id AS id,\n" +
            "pd.is_deleted AS isDeleted,\n" +
            "pd.price AS price,\n" +
            "pd.profile AS profile,\n" +
            "pd.quantity AS quantity,\n" +
            "pd.weight AS weight,\n" +
            "p.id AS productId,\n" +
            "p.benefit AS benefit,\n" +
            "p.evaluate AS evaluate,\n" +
            "p.infor AS infor,\n" +
            "p.instruct AS instruct,\n" +
            "p.note AS note,\n" +
            "p.product_name AS productName,\n" +
            "p.trademark AS trademark,\n" +
            "pt.name AS productTypeName,\n" +
            "avg(evaluate.stars) as avgStars\n" +
            "FROM product_details pd\n" +
            "JOIN (SELECT product_id, MIN(price) AS min_price FROM product_details GROUP BY product_id) pd_min\n" +
            "ON pd.product_id = pd_min.product_id AND pd.price = pd_min.min_price\n" +
            "JOIN product p ON pd.product_id = p.id \n" +
            "JOIN product_type pt ON p.product_type_id = pt.id\n" +
            "LEFT JOIN evaluate on evaluate.product_id = p.id\n" +
            "WHERE pd.is_deleted = false and pt.id = :id \n" +
            "GROUP BY \n" +
            "    pd.id,\n" +
            "    pd.is_deleted,\n" +
            "    pd.price,\n" +
            "    pd.profile,\n" +
            "    pd.quantity,\n" +
            "    pd.weight,\n" +
            "    p.id,\n" +
            "    p.benefit,\n" +
            "    p.evaluate,\n" +
            "    p.infor,\n" +
            "    p.instruct,\n" +
            "    p.note,\n" +
            "    p.product_name,\n" +
            "    p.trademark,\n" +
            "    pt.name", nativeQuery = true)
    Page<IProductDetailsDTO> findAllProductDetailsLowestPriceByProductTypeId(@Param("id") Long id, Pageable pageable);

    @Query(value = "SELECT pd.id AS id,\n" +
            "pd.is_deleted AS isDeleted,\n" +
            "pd.price AS price,\n" +
            "pd.profile AS profile,\n" +
            "pd.quantity AS quantity,\n" +
            "pd.weight AS weight,\n" +
            "p.id AS productId,\n" +
            "p.benefit AS benefit,\n" +
            "p.evaluate AS evaluate,\n" +
            "p.infor AS infor,\n" +
            "p.instruct AS instruct,\n" +
            "p.note AS note,\n" +
            "p.product_name AS productName,\n" +
            "p.trademark AS trademark,\n" +
            "pt.name AS productTypeName,\n" +
            "avg(evaluate.stars) as avgStars\n" +
            "FROM product_details pd\n" +
            "JOIN product p ON pd.product_id = p.id\n" +
            "JOIN product_type pt ON p.product_type_id = pt.id\n" +
            "LEFT JOIN evaluate on evaluate.product_id = p.id\n" +
            "WHERE pd.is_deleted = false and p.id = :id \n" +
            "GROUP BY \n" +
            "    pd.id,\n" +
            "    pd.is_deleted,\n" +
            "    pd.price,\n" +
            "    pd.profile,\n" +
            "    pd.quantity,\n" +
            "    pd.weight,\n" +
            "    p.id,\n" +
            "    p.benefit,\n" +
            "    p.evaluate,\n" +
            "    p.infor,\n" +
            "    p.instruct,\n" +
            "    p.note,\n" +
            "    p.product_name,\n" +
            "    p.trademark,\n" +
            "    pt.name\n" +
            "ORDER BY pd.price", nativeQuery = true)
    List<IProductDetailsDTO> findAllByProductIdDTO(@Param("id") Long id);

    @Query(value = "SELECT \n" +
            "    pd.id AS id,\n" +
            "    pd.is_deleted AS isDeleted,\n" +
            "    pd.price AS price,\n" +
            "    pd.profile AS profile,\n" +
            "    pd.quantity AS quantity,\n" +
            "    pd.weight AS weight,\n" +
            "    p.id AS productId,\n" +
            "    p.benefit AS benefit,\n" +
            "    p.evaluate AS evaluate,\n" +
            "    p.infor AS infor,\n" +
            "    p.instruct AS instruct,\n" +
            "    p.note AS note,\n" +
            "    p.product_name AS productName,\n" +
            "    p.trademark AS trademark,\n" +
            "    pt.name AS productTypeName\n" +
            "FROM \n" +
            "    product_details pd\n" +
            "JOIN \n" +
            "    product p ON pd.product_id = p.id\n" +
            "JOIN \n" +
            "    product_type pt ON p.product_type_id = pt.id\n" +
            "WHERE \n" +
            "    pd.is_deleted = false and pd.id = :id " +
            "ORDER BY pd.price", nativeQuery = true)
    Optional<IProductDetailsDTO> findByIdDTO(@Param("id") Long id);
}
