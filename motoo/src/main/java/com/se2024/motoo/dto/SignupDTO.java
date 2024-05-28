package com.se2024.motoo.dto;

import com.se2024.motoo.domain.Member;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SignupDTO {
    private String userID;
    private String pwd;
    private String userName;
    private String userEmail;

    public static SignupDTO signupDTO(Member member){
        SignupDTO signupDTO = new SignupDTO();

        signupDTO.setUserID(member.getUserID());
        signupDTO.setPwd(member.getPwd());
        signupDTO.setUserEmail(member.getUserEmail());
        signupDTO.setUserName(member.getUserName());

        return signupDTO;
    }
}
