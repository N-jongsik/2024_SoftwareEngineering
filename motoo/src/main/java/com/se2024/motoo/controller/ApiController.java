package com.se2024.motoo.controller;

import com.se2024.motoo.domain.Board;
import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.service.BoardService;
import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.service.MemberService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Optional;
import jakarta.servlet.http.HttpSession;



@Controller
@RequiredArgsConstructor
public class ApiController {
    private final BoardService boardService;

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

    @GetMapping("/boardview.html/{board_id}") //discussion이 게시물 글쓰고 업로드하는 뷰
    public String BoardView(Model model, @PathVariable Long board_id) {
        try{
            BoardDTO board = boardService.getBoardById(board_id);
            model.addAttribute("board", board);
            return "boardview";
        }
        catch(Exception e){
            return "Error";
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
    public String login(@ModelAttribute SignupDTO signupDTO, HttpSession session, Model model){
        SignupDTO loginResult =memberService.login(signupDTO);

        if(loginResult != null){
            session.setAttribute("loginID", loginResult.getUserID());
            return "stock";
        }else{
            model.addAttribute("loginError", "회원 정보가 없습니다");
            System.out.println("로그인 실패!!!!!!!!!!");
            return "login";
        }//db에 있는 정보 입력해도 else문으로 감
    }

    // 로그아웃
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        System.out.println("사용자 로그아웃!!!!!!!!!!!");
        return "redirect:/login?logout=true";
    }



}
