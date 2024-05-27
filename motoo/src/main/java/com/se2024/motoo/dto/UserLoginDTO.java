package com.se2024.motoo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserLoginDTO {//로그인
    private String userID;
    private String pwd;
}
