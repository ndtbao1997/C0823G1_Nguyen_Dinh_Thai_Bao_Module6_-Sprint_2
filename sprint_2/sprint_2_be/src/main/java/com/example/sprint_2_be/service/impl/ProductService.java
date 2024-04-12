package com.example.sprint_2_be.service.impl;

import com.example.sprint_2_be.model.Product;
import com.example.sprint_2_be.repository.IProductRepository;
import com.example.sprint_2_be.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.Optional;
@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository iProductRepository;


    @Override
    public Optional<Product> findById(Long id) {
        return iProductRepository.findById(id);
    }

    @Override
    public Iterator<Product> findAll() {
        return null;
    }

    @Override
    public Product save(Product product) {
        return null;
    }

    @Override
    public void save1(Product product) {

    }

    @Override
    public void deleteById(Long id) {

    }

}
