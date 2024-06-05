package com.se2024.motoo.controller;

import com.se2024.motoo.domain.Board;
import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.dto.SignupResponseDTO;
import com.se2024.motoo.repository.MemberRepository;
import com.se2024.motoo.service.BoardService;
import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.service.MemberService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpSession;

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

    @GetMapping("/noticeList.html") //공지글 list view
    public String noticeList(Model model) {
        List<BoardDTO>boardlist = boardService.getAllNotices(); //!!서비스에서 공지글만 받아오는 로직 만들기!!

        model.addAttribute("boards", boardlist);
        return "noticeList";
    }

    @GetMapping("/discussion.html") //discussion이 게시물 글쓰고 업로드하는 뷰
    public String discussion(Model model, HttpSession session) {
        String userId = (String)session.getAttribute("loginID");
        if(userId != null) { //로그인 안되어있을 경우엔 로그인화면으로
            model.addAttribute("board", new Board());
            return "discussion"; // discussion.html view template 반환
        }
        else{
            return "login";
        }
    }

    @GetMapping("/notice.html") //공지글 글쓰고 업로드하는 뷰
    public String notice(Model model) {
        model.addAttribute("board", new Board());
        return "notice";
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

    @GetMapping("/notice.html/{board_id}") //게시물 수정
    public String notice_modify(Model model, @PathVariable("board_id")Long board_id) {
        try{
            BoardDTO board = boardService.getBoardById(board_id);
            model.addAttribute("board", board);
            return "notice";
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
            boardService.updateViewcount(board_id);
            model.addAttribute("board", board);
            return "boardview";
        }
        catch(Exception e){
            e.printStackTrace();
            return "Error";
        }
    }

    @GetMapping("/noticeview.html/{board_id}") //공지글 확인
    public String noticeView(Model model, @PathVariable("board_id")Long board_id) {
        try{
            BoardDTO board = boardService.getBoardById(board_id);
            boardService.updateViewcount(board_id);
            model.addAttribute("board", board);
            return "noticeview";
        }
        catch(Exception e){
            e.printStackTrace();
            return "Error";
        }
    }

    @PostMapping("/boardview.html/{board_id}/delete") //게시물 삭제
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

    @PostMapping("/noticeview.html/{board_id}/delete") //공지글 삭제
    public RedirectView noticeDelete(Model model, @PathVariable("board_id")Long board_id) {
        try{
            boardService.deleteBoard(board_id);
            return new RedirectView("/noticeList.html");
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
    public String join(@ModelAttribute SignupDTO signupDTO, Model model){
        SignupResponseDTO response = memberService.duplicationCheck(signupDTO);
        if (!response.isAvailable()) {
            model.addAttribute("errorMessage", "중복된 아이디입니다.");
            return "signup";
        }
        // 중복된 아이디가 없을 경우 회원가입 진행
        System.out.println("UserController.signup");
        System.out.println("signupDTO = " + signupDTO);
        memberService.save(signupDTO);
        return "redirect:/login";
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
            return "redirect:/user/stock";
        }else{
            model.addAttribute("loginError", "회원 정보가 없습니다");
            System.out.println("로그인 실패!!!!!!!!!!");
            return "login";
        }
    }

    // 로그아웃
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        System.out.println("사용자 로그아웃!!!!!!!!!!!");
        return "redirect:/login?logout=true";
    }
    
    //아이디 중복확인
    @PostMapping("/checkDuplicate")
    @ResponseBody
    public SignupResponseDTO checkDuplicate(@RequestBody SignupDTO signupDTO) {
        return memberService.duplicationCheck(signupDTO);
    }

    @GetMapping("/user/stock")
    public String stockPage(){
        return "stock";
    }

    @GetMapping("/news")
    public String newsPage() {
        return "news";
    }

    @GetMapping("/ranking")
    public String rankingPage() {
        return "ranking";
    }

}
