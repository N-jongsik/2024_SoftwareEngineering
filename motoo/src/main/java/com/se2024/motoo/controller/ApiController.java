package com.se2024.motoo.controller;

import com.se2024.motoo.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
@RequiredArgsConstructor
public class ApiController {
    private final BoardService boardService;

    @GetMapping({"/", "/post.html"})
    public String home(Model model) {
        return "post"; // login.html view template 반환
    }
}
