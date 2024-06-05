package com.se2024.motoo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminResponseDTO {
    private String status;  // 응답 상태 (예: "success", "error")
    private String message; // 응답 메시지 (예: "Operation completed successfully")
    private Object data;    // 응답 데이터

    public AdminResponseDTO(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
