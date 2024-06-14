package com.se2024.motoo.domain;

import com.se2024.motoo.dto.SignupDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user")
public class Member {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //자동으로 값 1씩 증가
    @Column(name = "_id", unique = true, nullable = false)
    private Long id;

    @Column(unique = true, nullable = false, length = 100, name="userid")
    @NotNull(message = "아이디를 입력해주세요")
    private String userID;

    @Column(length = 100, nullable = false)
    @NotNull(message = "비밀번호를 입력해주세요")
    private String pwd;

    @Column(length = 100, nullable = false)
    @NotNull(message = "이름을 입력해주세요")
    private String userName;

    @Column(length = 100, unique = true, nullable = false)
    @NotNull(message = "이메일을 입력해주세요")
    private String userEmail;

    @Builder
    public static Member tomember(SignupDTO signupDTO){
        Member member = new Member();

        member.userID = signupDTO.getUserID();
        member.pwd = signupDTO.getPwd();
        member.userEmail = signupDTO.getUserEmail();
        member.userName = signupDTO.getUserName();

        return member;
    }
}