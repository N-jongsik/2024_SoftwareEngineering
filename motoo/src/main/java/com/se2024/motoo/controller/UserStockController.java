package com.se2024.motoo.controller;

import com.se2024.motoo.dto.UserStockDTO;
import com.se2024.motoo.service.UserStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserStockController {

    private final UserStockService userStockService;

    @Autowired
    public UserStockController(UserStockService userStockService) {
        this.userStockService = userStockService;
    }

    @PostMapping("/order")
    public void orderStock(@RequestBody UserStockDTO userStockDTO) {
        userStockService.updateUserStock(userStockDTO);
    }
}
