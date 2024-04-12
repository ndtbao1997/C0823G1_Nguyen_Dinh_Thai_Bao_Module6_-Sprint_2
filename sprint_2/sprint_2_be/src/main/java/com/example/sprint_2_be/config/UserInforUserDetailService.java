package com.example.sprint_2_be.config;

import com.example.sprint_2_be.dto.IUserDTO;
import com.example.sprint_2_be.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Component
@Service
@RequiredArgsConstructor
public class UserInforUserDetailService implements UserDetailsService {
    @Autowired
    private IUserRepository iUserRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<IUserDTO> iAccountDTO = iUserRepository.findAllRoleByUserName(userName);
        return iAccountDTO.map(UserInforUserDetail::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found: " + userName));
    }
}
