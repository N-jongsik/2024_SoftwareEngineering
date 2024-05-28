package com.se2024.motoo.service;

import com.se2024.motoo.domain.Member;
import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
