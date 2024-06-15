package com.se2024.motoo.controller;

import com.se2024.motoo.domain.Quiz;
import com.se2024.motoo.repository.QuizRepository;
import com.se2024.motoo.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
public class QuizController {

    private final QuizRepository quizRepository;

    @Autowired
    public QuizController(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @GetMapping("/api/quiz")
    public ResponseEntity<List<Quiz>> getQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/api/quiz/random")
    public Quiz getRandomQuiz() {
        long count = quizRepository.count();
        int randomId = (int) (Math.random() * count) + 1;
        return quizRepository.findById((long) randomId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
    }
}
