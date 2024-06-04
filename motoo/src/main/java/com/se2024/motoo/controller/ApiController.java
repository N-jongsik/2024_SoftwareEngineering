package com.se2024.motoo.controller;

import com.se2024.motoo.domain.Board;
import com.se2024.motoo.domain.Member;
import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.repository.MemberRepository;
import com.se2024.motoo.service.BoardService;
import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.service.MemberService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.List;
import java.util.Optional;
import jakarta.servlet.http.HttpSession;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.RedirectView;
@Controller
@RequiredArgsConstructor
public class ApiController {
    private final BoardService boardService;
    private final MemberRepository memberRepository;

    @GetMapping({"/", "/post.html"})
    public String post(Model model) {
        List<BoardDTO>boardlist = boardService.getAllBoards();
        //System.out.println("\n\n\n"+boardlist.get(0).getTitle()+"\n\n\n");
        model.addAttribute("boards", boardlist);
        return "post";
    }

    @GetMapping("/discussion.html") //discussion이 게시물 글쓰고 업로드하는 뷰
    public String discussion(Model model) {
        //토큰에서 사용자 아이디 추출해야 함.
        //@RequestHeader
        model.addAttribute("board", new Board());
        return "discussion"; // discussion.html view template 반환
    }

    @GetMapping("/discussion.html/{board_id}") //게시물 수정
    public String discussion_modify(Model model, @PathVariable("board_id")Long board_id) {
        try{
            BoardDTO board = boardService.getBoardById(board_id);
            model.addAttribute("board", board);
            return "discussion";
        }
        catch(Exception e){
            e.printStackTrace();
            return "Error";
        }
    }

    @GetMapping("/boardview.html/{board_id}") //게시물 확인
    public String BoardView(Model model, @PathVariable("board_id")Long board_id) {
        try{
            BoardDTO board = boardService.getBoardById(board_id);
            model.addAttribute("board", board);
            return "boardview";
        }
        catch(Exception e){
            e.printStackTrace();
            return "Error";
        }
    }

    @PostMapping("/boardview.html/{board_id}/delete") //게시물 확인
    public RedirectView BoardDelete(Model model, @PathVariable("board_id")Long board_id) {
        try{
            boardService.deleteBoard(board_id);
            return new RedirectView("/post.html");
        }
        catch(Exception e){
            e.printStackTrace();
            return new RedirectView("error");
        }
    }

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
