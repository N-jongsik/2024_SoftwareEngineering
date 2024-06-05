package com.se2024.motoo.service;

import com.nimbusds.jose.shaded.gson.annotations.Since;
import com.se2024.motoo.domain.Member;
import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.dto.SignupResponseDTO;
import com.se2024.motoo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository; // jpa, MySQL dependency 추가
    public void save(SignupDTO signupDTO) {
        // request -> DTO -> Entity -> Repository에서 save
        Member member = Member.tomember(signupDTO);
        memberRepository.save(member);
        //Repository의 save메서드 호출 (조건. entity객체를 넘겨줘야 함)
    }

    public SignupDTO login(SignupDTO signupDTO) {
        Optional<Member> byUserID = memberRepository.findByUserID(signupDTO.getUserID());
        if(byUserID.isPresent()){//db에 회원정보 있을 때
            Member member = byUserID.get();
            if(member.getPwd().equals(signupDTO.getPwd())){
                //비밀번호 일치
                SignupDTO dto = SignupDTO.toSignupDTO(member);
                return dto;
            }else{//비밀번호 불일치
                return null;
            }
        }else{//db에 회원정보 없을 때
            return null;
        }
    }

    public SignupResponseDTO duplicationCheck(SignupDTO signupDTO) {
        SignupResponseDTO response = new SignupResponseDTO();

        Optional<Member> byUserID = memberRepository.findByUserID(signupDTO.getUserID());
        if (byUserID.isPresent()) {
            response.setAvailable(false);
            response.setMessage("중복된 아이디입니다.");
        } else {
            response.setAvailable(true);
            response.setMessage("사용 가능한 아이디입니다.");
        }

        return response;
    }
}
