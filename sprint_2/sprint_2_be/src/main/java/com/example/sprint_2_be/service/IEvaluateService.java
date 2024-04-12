package com.example.sprint_2_be.service;

import com.example.sprint_2_be.dto.IEvaluateDTO;
import com.example.sprint_2_be.model.Evaluate;

import java.util.List;

public interface IEvaluateService extends IGeneratedService<Evaluate>{
    List<IEvaluateDTO> getAllEvaluateDTOByProductId(Long id);
}
