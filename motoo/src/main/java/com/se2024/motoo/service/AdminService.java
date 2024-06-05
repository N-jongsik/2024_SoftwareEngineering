package com.se2024.motoo.service;

import com.se2024.motoo.dto.AdminResponseDTO;
import com.se2024.motoo.domain.Member;
import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final MemberRepository memberRepository;
    @Transactional
    public AdminResponseDTO deleteUser(Long id) {
        // 사용자 삭제 로직 구현
        if (memberRepository.existsById(id)) {
            memberRepository.deleteById(id);
            return new AdminResponseDTO("success", "User deleted successfully");
        }
        return new AdminResponseDTO("error", "User not found");
    }

    public List<SignupDTO> getAllUsers() {
        List<Member> members = memberRepository.findAll();
        return members.stream()
                .map(member -> new SignupDTO(member.getId(), member.getUserID(), member.getPwd(), member.getUserName(), member.getUserEmail()))
                .collect(Collectors.toList());
    }
}
