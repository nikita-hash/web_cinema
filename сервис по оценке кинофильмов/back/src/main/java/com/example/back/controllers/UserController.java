package com.example.back.controllers;

import com.example.back.config.DateConfig;
import com.example.back.models.Account;
import com.example.back.models.Film;
import com.example.back.models.LikesAction;
import com.example.back.models.Rating;
import com.example.back.repository.AccoutRpository;
import com.example.back.repository.FilmRepository;
import com.example.back.repository.LikeRepository;
import com.example.back.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user_menu")
@CrossOrigin("*")
public class UserController {

    @Autowired
    AccoutRpository accountRepository;

    Account account;

    @Autowired
    FilmRepository filmRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    RatingRepository ratingRepository;


    @GetMapping("/add_rating")
    private ResponseEntity<?> add_rating(@RequestParam(name = "id")int id,@RequestParam(name = "id_film")int id_films,@RequestParam(name = "rating")int rat){
        Rating rating=new Rating();
        rating.setDate(DateConfig.getDateConfigure().nowDate());
        rating.setFilm(filmRepository.findById(id_films).get());
        rating.setAccount(accountRepository.findById(id).get());
        rating.setRating(rat);

        ratingRepository.save(rating);
        return ResponseEntity.status(HttpStatus.OK).body("Оценка успешно добавлена");
    }

    @PutMapping("/update_settins")
    private ResponseEntity<?> update_settins(@RequestBody Account account){
        this.account.setAvatar(account.getAvatar());
        this.account.setLogin(account.getLogin());
        this.account.setPassword(account.getPassword());
        this.account.getMen().setName(account.getMen().getName());
        this.account.getMen().setLast_name(account.getMen().getLast_name());
        this.account.getMen().setPatronymic(account.getMen().getPatronymic());
        accountRepository.save(this.account);
        System.out.println(account);
        return null;
    }

    @GetMapping("/initialized_films")
    private List<Film> initialized_films(){
        Film film=new Film();
        return filmRepository.findAll();
    }

    @GetMapping("/add_like")
    private String add_like(@RequestParam(name = "id_films")int id_films,@RequestParam(name = "id")int id){
        account=accountRepository.findById((id)).get();
        LikesAction like=new LikesAction();
        like.setAccount(account);
        like.setDate(DateConfig.getDateConfigure().nowDate());
        like.setFilm(filmRepository.findById(id_films).get());
        likeRepository.save(like);
        return null;
    }

    @DeleteMapping("/remove_like")
    private String remove_like(@RequestParam(name = "id_films")int id_films,@RequestParam(name = "id")int id){
        account=accountRepository.findById((id)).get();
        likeRepository.deleteByAccountIdAndFilmId(id,id_films);
        return null;
    }

    @GetMapping("/getFilm")
    private List<Film>getFilm(@RequestParam(name = "type")String type){
        if(type.equals("Все фильмы"))return filmRepository.findAll();
        else
            return filmRepository.findAllByGenre(type);
    }

}
