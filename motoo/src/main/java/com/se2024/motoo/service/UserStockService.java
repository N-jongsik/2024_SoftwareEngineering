package com.se2024.motoo.service;

import com.se2024.motoo.domain.Member;
import com.se2024.motoo.domain.StockTransaction;
import com.se2024.motoo.domain.UserStock;
import com.se2024.motoo.dto.UserStockDTO;
import com.se2024.motoo.repository.MemberRepository;
import com.se2024.motoo.repository.UserStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserStockService {

    private final UserStockRepository userStockRepository;
    private final MemberRepository memberRepository; // 필요하다면 추가

    @Autowired
    public UserStockService(UserStockRepository userStockRepository, MemberRepository memberRepository) {
        this.userStockRepository = userStockRepository;
        this.memberRepository = memberRepository;
    }

    public void updateUserStock(UserStockDTO userStockDTO) {
        Member user = memberRepository.findById(userStockDTO.getUserID())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<UserStock> optionalUserStock = userStockRepository.findByUserIDAndSrtnCd(user, userStockDTO.getSrtnCd());

        if (optionalUserStock.isPresent()) {
            UserStock userStock = optionalUserStock.get();
            handleTransaction(userStock, userStockDTO);
            userStockRepository.save(userStock);
        } else {
            UserStock newUserStock = new UserStock();
            newUserStock.setUserID(user);
            newUserStock.setItemName(userStockDTO.getItemName());
            newUserStock.setSrtnCd(userStockDTO.getSrtnCd());
            newUserStock.setQuantity(0);
            handleTransaction(newUserStock, userStockDTO);
            userStockRepository.save(newUserStock);
        }
    }

    private void handleTransaction(UserStock userStock, UserStockDTO userStockDTO) {
        StockTransaction transaction = new StockTransaction();
        transaction.setPrice(userStockDTO.getPrice());
        transaction.setQuantity(userStockDTO.getQuantity());
        transaction.setTransactionType(userStockDTO.getTransactionType());

        userStock.getTransactions().add(transaction);

        if ("buy".equalsIgnoreCase(userStockDTO.getTransactionType())) {
            userStock.setQuantity(userStock.getQuantity() + userStockDTO.getQuantity());
        } else if ("sell".equalsIgnoreCase(userStockDTO.getTransactionType())) {
            if (userStock.getQuantity() >= userStockDTO.getQuantity()) {
                userStock.setQuantity(userStock.getQuantity() - userStockDTO.getQuantity());
            } else {
                throw new RuntimeException("매도 수량이 보유 수량보다 많습니다.");
            }
        }

        updateProfitLoss(userStock);
    }

    private void updateProfitLoss(UserStock userStock) {
        // 수익률 계산 로직을 여기에 구현
        // 예: (매도 수익 - 매수 비용) / 매수 비용 * 100
        double totalBuyCost = userStock.getTransactions().stream()
                .filter(t -> "buy".equalsIgnoreCase(t.getTransactionType()))
                .mapToDouble(t -> t.getPrice() * t.getQuantity())
                .sum();

        double totalSellRevenue = userStock.getTransactions().stream()
                .filter(t -> "sell".equalsIgnoreCase(t.getTransactionType()))
                .mapToDouble(t -> t.getPrice() * t.getQuantity())
                .sum();

        if (totalBuyCost > 0) {
            double profitLoss = ((totalSellRevenue - totalBuyCost) / totalBuyCost) * 100;
            userStock.setProfitLoss(profitLoss);
        }
    }
}
