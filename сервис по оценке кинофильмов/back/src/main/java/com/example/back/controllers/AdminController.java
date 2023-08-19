package com.example.back.controllers;

import com.example.back.config.StatisticConfig;
import com.example.back.entity.AccountEntity;
import com.example.back.models.Account;
import com.example.back.models.Film;
import com.example.back.models.LikesAction;
import com.example.back.repository.AccoutRpository;
import com.example.back.repository.FilmRepository;
import com.example.back.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("admin_menu")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    AccoutRpository accountRepository;

    @Autowired
    FilmRepository filmRepository;

    @Autowired
    LikeRepository likeRepository;

    Account account;

    @GetMapping("/initialized_films")
    private List<Film>initialized_films(){
        Film film=new Film();
        return filmRepository.findAll();
    }

    @GetMapping("/initialized_statistic")
    private StatisticConfig initialized_statistic(){
        StatisticConfig statisticConfig=new StatisticConfig();
        statisticConfig.setNumber_block(accountRepository.countByStatus(AccountEntity.accountStatusBlock));
        statisticConfig.setNumber_user(accountRepository.findAll().size());
        statisticConfig.setNumber_film(filmRepository.findAll().size());
        List<LikesAction>list=likeRepository.findAll();
        AtomicInteger j= new AtomicInteger();
        AtomicInteger f= new AtomicInteger();
        AtomicInteger m= new AtomicInteger();
        AtomicInteger a= new AtomicInteger();
        AtomicInteger may= new AtomicInteger();
        AtomicInteger jun= new AtomicInteger();
        AtomicInteger jul= new AtomicInteger();
        AtomicInteger aug= new AtomicInteger();
        AtomicInteger sep= new AtomicInteger();
        AtomicInteger ot= new AtomicInteger();
        AtomicInteger nov= new AtomicInteger();
        AtomicInteger dec= new AtomicInteger();
        list.forEach(likesAction -> {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
            LocalDate localDate = LocalDate.parse(likesAction.getDate(), formatter);
            if(localDate.getMonth()== Month.JANUARY){
                j.getAndIncrement();
            }
            if(localDate.getMonth()==Month.FEBRUARY){
                f.getAndIncrement();
            }
            if(localDate.getMonth()==Month.MARCH){
                m.getAndIncrement();
            }
            if(localDate.getMonth()==Month.APRIL){
                a.getAndIncrement();
            }
            if(localDate.getMonth()==Month.MAY){
                may.getAndIncrement();
            }
            if(localDate.getMonth()==Month.JUNE){
                jun.getAndIncrement();
            }
            if(localDate.getMonth()==Month.JULY){
                jul.getAndIncrement();
            }
            if(localDate.getMonth()==Month.AUGUST){
                aug.getAndIncrement();
            }
            if(localDate.getMonth()==Month.SEPTEMBER){
                sep.getAndIncrement();
            }
            if(localDate.getMonth()==Month.OCTOBER){
                ot.getAndIncrement();
            }
            if(localDate.getMonth()==Month.NOVEMBER){
                nov.getAndIncrement();
            }
            if(localDate.getMonth()==Month.DECEMBER){
                dec.getAndIncrement();
            }
        });
        List<Integer>integerList=new ArrayList<>();
        integerList.addAll(Arrays.asList(j.intValue(),f.intValue(),m.intValue(),a.intValue(),may.intValue(),jun.intValue(),jul.intValue(),aug.intValue(),sep.intValue()
        ,ot.intValue(),nov.intValue(),dec.intValue()));
        statisticConfig.setList_like(integerList);
        statisticConfig.setLikesActions(filmRepository.findAll());
        Collections.sort(statisticConfig.getLikesActions(), new Comparator<Film>() {
            @Override
            public int compare(Film o1, Film o2) {
                return o2.getList().size()-o1.getList().size();
            }

        });
        return statisticConfig;
    }

    @PostMapping( value = "/add_film")
    private ResponseEntity<?>add_film(@RequestBody Film film){
        filmRepository.save(film);
        return ResponseEntity.status(HttpStatus.OK).body("Киноафиша успешно добавлена");
    }

    @GetMapping("/getFilm")
    private List<Film>getFilm(@RequestParam(name = "type")String type){
        if(type.equals("Все фильмы"))return filmRepository.findAll();
        else
        return filmRepository.findAllByGenre(type);
    }

    @GetMapping("/initialized_users")
    private List<Account>initialized_users(){
        return accountRepository.findAll();
    }

    @GetMapping("/initialized_settins")
    private Account initialized_settins(@RequestParam(name = "id")int id){
        Account ac=accountRepository.findById(id).get();
        account=ac;
        return ac;
    }

    @PutMapping("/update_settins")
    private ResponseEntity<?>update_settins(@RequestBody Account account){
        this.account.setAvatar(account.getAvatar());
        this.account.setLogin(account.getLogin());
        this.account.setPassword(account.getPassword());
        this.account.getMen().setName(account.getMen().getName());
        this.account.getMen().setLast_name(account.getMen().getLast_name());
        this.account.getMen().setPatronymic(account.getMen().getPatronymic());
        accountRepository.save(this.account);
        System.out.println(account);
        return ResponseEntity.status(HttpStatus.OK).body("Настройки успешно сохранены");
    }

    @GetMapping("/block_account")
    private ResponseEntity<?>blockAccount(@RequestParam (name = "id")int id){
        Account account=accountRepository.findById(id).get();
        account.setStatus(AccountEntity.accountStatusBlock);
        accountRepository.save(accountRepository.findById(id).get());
        return ResponseEntity.status(HttpStatus.OK).body("Пользователь "+account.getMen().getName()+" успешно заблокирован");
    }

    @GetMapping("/unblock_account")
    private ResponseEntity<?> unblockAccount(@RequestParam(name = "id")int id){
        Account account=accountRepository.findById(id).get();
        account.setStatus(AccountEntity.accountStatusActive);
        accountRepository.save(accountRepository.findById(id).get());
        return null;
    }

    @GetMapping("/take_admin")
    private ResponseEntity<?> take_admin(@RequestParam(name = "id")int id){
        Account account=accountRepository.findById(id).get();
        account.setRole(AccountEntity.accountRoleAdmin);
        accountRepository.save(account);
        return null;
    }

    @GetMapping("/take_user")
    private ResponseEntity<?> take_user(@RequestParam(name = "id")int id){
        Account account=accountRepository.findById(id).get();
        account.setRole(AccountEntity.accountRoleUser);
        accountRepository.save(account);
        return null;
    }

    @DeleteMapping("/remove_account")
    private ResponseEntity<?>removeAccount(@RequestParam(name="id")int id){
        Account account=accountRepository.findById(id).get();
        account.setStatus(AccountEntity.accountStatusBlock);
        accountRepository.deleteById(accountRepository.findById(id).get().getId());
        return ResponseEntity.status(HttpStatus.OK).body("Пользователь "+account.getMen().getName()+" успешно удален");
    }

}
