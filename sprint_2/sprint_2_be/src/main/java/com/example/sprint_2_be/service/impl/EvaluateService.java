package com.example.sprint_2_be.service.impl;

import com.example.sprint_2_be.dto.IEvaluateDTO;
import com.example.sprint_2_be.model.Evaluate;
import com.example.sprint_2_be.repository.IEvaluateRepository;
import com.example.sprint_2_be.service.IEvaluateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class EvaluateService implements IEvaluateService {
    @Autowired
    private IEvaluateRepository iEvaluateRepository;

    @Override
    public Optional<Evaluate> findById(Long id) {
        return iEvaluateRepository.findById(id);
    }

    @Override
    public Iterator<Evaluate> findAll() {
        return null;
    }

    @Override
    public Evaluate save(Evaluate evaluate) {
        return iEvaluateRepository.save(evaluate);
    }

    @Override
    public void save1(Evaluate evaluate) {
        iEvaluateRepository.save(evaluate);
    }

    @Override
    public void deleteById(Long id) {
        iEvaluateRepository.deleteById(id);
    }

    @Override
    public List<IEvaluateDTO> getAllEvaluateDTOByProductId(Long id) {
        return iEvaluateRepository.getAllEvaluateDTOByProductId(id);
    }
}
