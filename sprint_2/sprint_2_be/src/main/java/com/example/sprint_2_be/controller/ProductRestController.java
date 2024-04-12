package com.example.sprint_2_be.controller;

import com.example.sprint_2_be.dto.IProductDetailsDTO;
import com.example.sprint_2_be.dto.IProductTypeDTO;
import com.example.sprint_2_be.service.IProductDetailsService;
import com.example.sprint_2_be.service.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("Access-Control-Allow-Origin")
@RequestMapping("/api/product")
public class ProductRestController {
    @Autowired
    private IProductTypeService iProductTypeService;
    @Autowired
    private IProductDetailsService iProductDetailsService;

    @GetMapping("/find-all")
    public ResponseEntity<List<IProductTypeDTO>> findAll(){
        List<IProductTypeDTO> iProductTypeDTOList = iProductTypeService.findAllDTO();
        if (iProductTypeDTOList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(iProductTypeDTOList, HttpStatus.OK);
        }
    }

    @GetMapping("/find-all-product-details-lowest-price/{id}")
    public ResponseEntity<?> findAllProductDetailsLowestPrice(@PathVariable Long id,@RequestParam(name = "page", defaultValue = "0") Integer page){
        Pageable pageable = PageRequest.of(page, 8);
        Page<IProductDetailsDTO> iProductDetailsDTOList = iProductDetailsService.findAllProductDetailsLowestPriceByProductTypeId(id,pageable);
        if (iProductDetailsDTOList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(iProductDetailsDTOList, HttpStatus.OK);
        }
    }

    @GetMapping("/find-all-by-product-id/{id}")
    public ResponseEntity<?> findAllByProductIdDTO(@PathVariable Long id){
        List<IProductDetailsDTO> iProductDetailsDTOList = iProductDetailsService.findAllByProductIdDTO(id);
        if (iProductDetailsDTOList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(iProductDetailsDTOList, HttpStatus.OK);
        }
    }
    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> findByIdDTO(@PathVariable Long id){
        Optional<IProductDetailsDTO> iProductDetailsDTO = iProductDetailsService.findByIdDTO(id);
        if (!iProductDetailsDTO.isPresent()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(iProductDetailsDTO,HttpStatus.OK);
        }
    }

    @PostMapping("/find-all-product-from-cart")
    public ResponseEntity<?> findAllProductFromCartDTO(@RequestBody Long[] productArray){
        List<IProductDetailsDTO> iProductDetailsDTOList = iProductDetailsService.findAllProductFromCartDTO(productArray);
        return new ResponseEntity<>(iProductDetailsDTOList, HttpStatus.OK);
    }

}
