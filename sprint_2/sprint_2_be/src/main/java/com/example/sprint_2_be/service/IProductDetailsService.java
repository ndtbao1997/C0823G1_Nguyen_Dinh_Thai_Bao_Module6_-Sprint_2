package com.example.sprint_2_be.service;

import com.example.sprint_2_be.dto.IProductDetailsDTO;
import com.example.sprint_2_be.model.ProductDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IProductDetailsService extends IGeneratedService<ProductDetails>{
    Page<IProductDetailsDTO> findAllProductDetailsLowestPriceByProductTypeId(Long id, Pageable pageable);

    List<IProductDetailsDTO> findAllByProductIdDTO(Long id);

    Optional<IProductDetailsDTO> findByIdDTO(Long id);

    List<IProductDetailsDTO> findAllProductFromCartDTO(Long[] productArray);
}
