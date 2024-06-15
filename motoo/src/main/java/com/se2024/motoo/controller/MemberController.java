package com.se2024.motoo.controller;

import com.se2024.motoo.domain.Member;
import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.dto.SignupResponseDTO;
import com.se2024.motoo.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;


import java.util.*;

@RestController
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    @ResponseBody
    public Map<String, String> join(@RequestBody SignupDTO signupDTO) {
        Map<String, String> response = new HashMap<>();
        try {
            SignupResponseDTO responseDTO = memberService.duplicationCheck(signupDTO);
            if (!responseDTO.isAvailable()) {
                response.put("status", "error");
                response.put("message", "중복된 아이디입니다.");
                return response;
            }
            // 중복된 아이디가 없을 경우 회원가입 진행
            memberService.save(signupDTO);
            response.put("status", "success");
            response.put("message", "회원가입이 정상적으로 처리되었습니다.");
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "회원가입이 비정상적으로 처리되었습니다.");
            e.printStackTrace();
        }
        return response;
    }

    @PostMapping("/login")
    @ResponseBody
    public Map<String, String> login(@RequestBody SignupDTO loginDTO) {
        Map<String, String> response = new HashMap<>();
        try {
            Optional<Member> memberOpt = memberService.findByUserID(loginDTO.getUserID());
            if (memberOpt.isPresent()) {
                Member member = memberOpt.get();
                if (member.getPwd() != null && member.getPwd().equals(loginDTO.getPwd())) {
                    response.put("status", "success");
                    response.put("message", "로그인 성공");
                } else {
                    response.put("status", "error");
                    response.put("message", "아이디 또는 비밀번호가 맞지 않습니다.");
                }
            } else {
                response.put("status", "error");
                response.put("message", "아이디 또는 비밀번호가 맞지 않습니다.");
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "로그인 처리 중 오류가 발생했습니다.");
            e.printStackTrace();
        }
        return response;
    }

    @PostMapping("/checkDuplicate")
    @ResponseBody
    public SignupResponseDTO checkDuplicate(@RequestBody SignupDTO signupDTO) {
        System.out.println("여기 중복 제대로 작동함!!!!!!!!!!");
        return memberService.duplicationCheck(signupDTO);
    }

    @GetMapping("/api/profile")
    public ResponseEntity<SignupDTO> getProfile(HttpSession session) {
        Member loggedInMember = (Member) session.getAttribute("loginID");
        if (loggedInMember != null) {
            SignupDTO memberDTO = SignupDTO.toSignupDTO(loggedInMember);
            return ResponseEntity.ok(memberDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

}
