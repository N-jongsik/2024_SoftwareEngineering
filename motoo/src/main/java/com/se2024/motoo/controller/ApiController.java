package com.se2024.motoo.controller;

import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class ApiController {
    private final MemberService memberService;

    @GetMapping("/signup")
    public String saveForm(){
        return "signup";
    }

    @PostMapping("/signup")
    public String join(@ModelAttribute SignupDTO signupDTO){
        System.out.println("UserController.signup");
        System.out.println("signupDTO = " + signupDTO);
        memberService.save(signupDTO);

        return "login";
    }

    @GetMapping("/login")
    public String loginForm(){
        return "login";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute SignupDTO signupDTO, HttpSession session){
        SignupDTO loginResult =memberService.login(signupDTO);

        if(loginResult != null){
            session.setAttribute("loginID", loginResult.getUserID());
            return "stock";
        }else{
            return "login";
        }//db에 있는 정보 입력해도 else문으로 감
    }
}