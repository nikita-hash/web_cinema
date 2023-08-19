package com.example.back.controllers;

import com.example.back.entity.AccountEntity;
import com.example.back.models.Account;
import com.example.back.repository.AccoutRpository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("autorization")
@CrossOrigin("*")
public class AutorizationController {

    @Autowired
    AccoutRpository accountRepository;

    @GetMapping("")
    private ResponseEntity<?> autorization(@RequestParam(name = "login")String login , @RequestParam (name = "password")String password){
        Account account=accountRepository.findAccountByLoginAndPassword(login, password);
        if(account==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Не удалось найти аккаунт");
        }
        else {
            if(account.getStatus().equals(AccountEntity.accountStatusBlock)){
                System.out.println(account.getStatus());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ващ аккаунт заблокирован");
            }
            else {
                if(account.getRole().equals(AccountEntity.accountRoleAdmin)){
                    return ResponseEntity.status(HttpStatus.OK).body(account);
                }
                else {
                    return ResponseEntity.status(HttpStatus.OK).body(account);
                }
            }
        }
    }
}
