package com.example.sprint_2_be.controller;

import com.example.sprint_2_be.dto.EvaluateDTO;
import com.example.sprint_2_be.dto.IEvaluateDTO;
import com.example.sprint_2_be.model.Evaluate;
import com.example.sprint_2_be.model.Product;
import com.example.sprint_2_be.service.IEvaluateService;
import com.example.sprint_2_be.service.IProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("Access-Control-Allow-Origin")
@RequestMapping("/api/evaluate")
public class EvaluateRestController {
    @Autowired
    private IEvaluateService iEvaluateService;
    @Autowired
    private IProductService iProductService;

    @PostMapping("/create-evaluate")
    public ResponseEntity<?> createEvaluate(@RequestBody @Valid EvaluateDTO evaluateDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()){
            List<FieldError> errors = bindingResult.getFieldErrors();
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Optional<Product> product = iProductService.findById(evaluateDTO.getProductId());
        if (!product.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Evaluate evaluate = new Evaluate();
        evaluate.setProduct(product.get());
        evaluate.setEvaluateDate(LocalDateTime.now());
        evaluate.setContent(evaluateDTO.getContent().trim());
        evaluate.setEmail(evaluateDTO.getEmail().trim());
        evaluate.setFullName(evaluateDTO.getFullName().trim());
        evaluate.setStars(evaluateDTO.getStars());
        iEvaluateService.save(evaluate);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-all-evaluate/{id}")
    public ResponseEntity<?> getAllEvaluateDTOByProductId(@PathVariable Long id){
        List<IEvaluateDTO> iEvaluateDTOS = iEvaluateService.getAllEvaluateDTOByProductId(id);
        return new ResponseEntity<>(iEvaluateDTOS,HttpStatus.OK);
    }
}
