package com.example.back.controllers;

import com.example.back.config.DateConfig;
import com.example.back.entity.AccountEntity;
import com.example.back.models.Account;
import com.example.back.repository.AccoutRpository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("registration")
@CrossOrigin("*")
public class RegistrationController {

    @Autowired
    AccoutRpository accountRepository;

    @PostMapping("/user")
    private ResponseEntity<?> registrationUser(@RequestBody Account account){
        account.setStatus(AccountEntity.accountStatusActive);
        account.setRole(AccountEntity.accountRoleUser);
        accountRepository.save(account);
        return null;
    }

}
