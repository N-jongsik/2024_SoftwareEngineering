package com.se2024.motoo.domain;

import com.se2024.motoo.dto.SignupDTO;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user")
public class Member {
    @GeneratedValue(strategy = GenerationType.IDENTITY) //자동으로 값 1씩 증가해주며, pk 속성을 가짐
    @Id // primary key
    private String userID;

    @Column(length = 100)
    private String pwd;

    @Column(length = 100)
    private String userName;

    @Column(length = 100)
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
