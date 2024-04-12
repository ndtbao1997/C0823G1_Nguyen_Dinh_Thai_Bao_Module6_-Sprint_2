package com.example.sprint_2_be.service.impl;

import com.example.sprint_2_be.dto.IProductDetailsDTO;
import com.example.sprint_2_be.model.ProductDetails;
import com.example.sprint_2_be.repository.IProductDetailsRepository;
import com.example.sprint_2_be.service.IProductDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class ProductDetailsService implements IProductDetailsService {
    @Autowired
    private IProductDetailsRepository iProductDetailsRepository;


    @Override
    public Optional<ProductDetails> findById(Long id) {
        return iProductDetailsRepository.findById(id);
    }

    @Override
    public Iterator<ProductDetails> findAll() {
        return null;
    }

    @Override
    public ProductDetails save(ProductDetails productDetails) {
        return null;
    }

    @Override
    public void save1(ProductDetails productDetails) {
        iProductDetailsRepository.save(productDetails);
    }

    @Override
    public void deleteById(Long id) {

    }


    @Override
    public Page<IProductDetailsDTO> findAllProductDetailsLowestPriceByProductTypeId(Long id, Pageable pageable) {
        return iProductDetailsRepository.findAllProductDetailsLowestPriceByProductTypeId(id, pageable);
    }

    @Override
    public List<IProductDetailsDTO> findAllByProductIdDTO(Long id) {
        return iProductDetailsRepository.findAllByProductIdDTO(id);
    }

    @Override
    public Optional<IProductDetailsDTO> findByIdDTO(Long id) {
        return iProductDetailsRepository.findByIdDTO(id);
    }

    @Override
    public List<IProductDetailsDTO> findAllProductFromCartDTO(Long[] productArray) {
        List<IProductDetailsDTO> iProductDetailsDTOList = new ArrayList<>();
        for (Long l : productArray) {
            Optional<IProductDetailsDTO> iProductDetailsDTOOptional = iProductDetailsRepository.findByIdDTO(l);
            iProductDetailsDTOOptional.ifPresent(iProductDetailsDTOList::add);
        }
        return iProductDetailsDTOList;
    }
}
