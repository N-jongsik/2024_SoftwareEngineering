package com.se2024.motoo.service;

import com.se2024.motoo.domain.Quiz;
import com.se2024.motoo.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizService {
    @Autowired
    private QuizRepository quizRepository;

    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    public void saveQuiz(Quiz quiz) {
        quizRepository.save(quiz);
    }
}
