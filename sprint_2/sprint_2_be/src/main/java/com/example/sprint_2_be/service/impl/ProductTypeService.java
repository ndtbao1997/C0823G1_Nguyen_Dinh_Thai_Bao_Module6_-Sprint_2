package com.example.sprint_2_be.service.impl;

import com.example.sprint_2_be.dto.IProductTypeDTO;
import com.example.sprint_2_be.model.ProductType;
import com.example.sprint_2_be.repository.IProductTypeRepository;
import com.example.sprint_2_be.service.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class ProductTypeService implements IProductTypeService {
    @Autowired
    private IProductTypeRepository iProductTypeRepository;


    @Override
    public Optional<ProductType> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Iterator<ProductType> findAll() {
        return null;
    }

    @Override
    public ProductType save(ProductType productType) {
        return null;
    }

    @Override
    public void save1(ProductType productType) {

    }

    @Override
    public void deleteById(Long id) {

    }


    @Override
    public List<IProductTypeDTO> findAllDTO() {
        return iProductTypeRepository.findAllDTO();
    }
}
