package com.se2024.motoo.controller;

import com.se2024.motoo.domain.Quiz;
import com.se2024.motoo.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@Controller
@RequestMapping("/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping
    public String showQuiz(@RequestParam("id") Long id, Model model) {
        Quiz quiz = quizService.getQuizById(id).orElse(null);
        if (quiz == null) {
            throw new RuntimeException("Quiz not found");
        }
        model.addAttribute("quiz", quiz);
        return "quiz";
    }

    @PostMapping("/submitQuiz")
    public String submitQuiz(@RequestParam("id") Long id, @RequestParam("userAnswer") Boolean userAnswer, Model model) {
        Quiz quiz = quizService.getQuizById(id).orElse(null);
        if (quiz == null) {
            throw new RuntimeException("Quiz not found");
        }
        boolean isCorrect = quiz.getAnswer().equals(userAnswer);
        model.addAttribute("quiz", quiz);
        model.addAttribute("isCorrect", isCorrect);
        return "result";
    }

    private final Random random = new Random();

    @GetMapping("/random")
    public String getRandomQuiz(Model model) {
        int randomId = random.nextInt(10)+1; // 1부터 10까지의 랜덤한 정수 생성
        return "redirect:/quiz?id=" + randomId; // 랜덤으로 문제 보여줌
    }
}
