package com.se2024.motoo.repository;

import com.se2024.motoo.domain.Member;
import com.se2024.motoo.domain.UserStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserStockRepository extends JpaRepository<UserStock, Long> {
    Optional<UserStock> findByUserIDAndSrtnCd(Member userID, String srtnCd);
}
