package com.se2024.motoo.dto;

import com.se2024.motoo.domain.Member;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SignupDTO {
    private Long id;
    private String userID;
    private String pwd;
    private String userName;
    private String userEmail;

    public SignupDTO(String userName, String userID, String userEmail) {
        this.userID = userID;
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public static SignupDTO toSignupDTO(Member member) {
        SignupDTO signupDTO = new SignupDTO();

        signupDTO.setUserID(member.getUserID());
        signupDTO.setPwd(member.getPwd());
        signupDTO.setUserEmail(member.getUserEmail());
        signupDTO.setUserName(member.getUserName());

        return signupDTO;
    }

    public SignupDTO(Long id, String userID, String pwd, String userName, String userEmail) {
        this.id = id;
        this.userID = userID;
        this.pwd = pwd;
        this.userName = userName;
        this.userEmail = userEmail;
    }
}
