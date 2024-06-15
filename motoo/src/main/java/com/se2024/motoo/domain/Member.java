package com.se2024.motoo.domain;

import com.se2024.motoo.dto.SignupDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "user")
public class Member {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //자동으로 값 1씩 증가
    @Column(name = "_id")
    private Long id;

    @Column(name="userid")
    private String userID;

    @Column(length = 100)
    private String pwd;

    @Column
    private String userName;

    @Column
    private String userEmail;

    public static Member from(SignupDTO signupDTO) {
        Member member = new Member();
        member.setUserID(signupDTO.getUserID());
        member.setPwd(signupDTO.getPwd());
        member.setUserName(signupDTO.getUserName());
        member.setUserEmail(signupDTO.getUserEmail());
        return member;
    }

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