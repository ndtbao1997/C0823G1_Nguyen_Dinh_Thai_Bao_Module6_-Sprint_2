package com.example.sprint_2_be.service;

import com.example.sprint_2_be.dto.IProductTypeDTO;
import com.example.sprint_2_be.model.ProductType;
import jakarta.persistence.GeneratedValue;

import java.util.List;

public interface IProductTypeService extends IGeneratedService<ProductType> {
    List<IProductTypeDTO> findAllDTO();
}
