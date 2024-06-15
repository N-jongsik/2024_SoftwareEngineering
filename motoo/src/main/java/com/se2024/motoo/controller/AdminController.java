package com.se2024.motoo.controller;

import com.se2024.motoo.dto.AdminResponseDTO;
import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    // 사용자 삭제
    @DeleteMapping("/api/members/{id}")
    public ResponseEntity<AdminResponseDTO> deleteUser(@PathVariable("id") Long id) {
        AdminResponseDTO response = adminService.deleteUser(id);
        return ResponseEntity.ok(response);
    }

    // Admin 페이지 렌더링
    @GetMapping("/api/members")
    public ResponseEntity<List<SignupDTO>> getAllMembers(){
        List<SignupDTO> userlist = adminService.getAllUsers();
        return ResponseEntity.ok(userlist);
    }
}
