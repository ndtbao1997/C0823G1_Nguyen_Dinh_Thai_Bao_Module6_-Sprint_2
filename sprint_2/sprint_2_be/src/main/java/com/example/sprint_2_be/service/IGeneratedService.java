package com.example.sprint_2_be.service;

import java.util.Iterator;
import java.util.Optional;

public interface IGeneratedService<T> {
    Optional<T> findById(Long id);
    Iterator<T> findAll();
    T save(T t);
    void save1(T t);
    void deleteById(Long id);
}
