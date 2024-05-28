package com.se2024.motoo.controller;

import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class ApiController {
    private final MemberService memberService;

    @GetMapping("/save")
    public String saveForm(){
        return "save";
    }

    @PostMapping("/save")
    public String join(@ModelAttribute SignupDTO signupDTO){
        System.out.println("UserController.save");
        System.out.println("signupDTO = " + signupDTO);
        memberService.save(signupDTO);

        return "index";
    }
}
