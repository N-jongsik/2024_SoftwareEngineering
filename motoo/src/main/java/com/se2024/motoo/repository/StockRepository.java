package com.se2024.motoo.repository;

import com.se2024.motoo.domain.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, String> {
}