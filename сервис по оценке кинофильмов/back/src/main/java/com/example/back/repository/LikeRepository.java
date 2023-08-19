package com.example.back.repository;

import com.example.back.models.Account;
import com.example.back.models.Film;
import com.example.back.models.LikesAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

public interface LikeRepository extends JpaRepository<LikesAction ,Integer> {
    /*@Query("DELETE FROM LikesAction WHERE LikesAction.account.id = :id_account AND LikesAction.film.id = :id_film")
    void deleteByAccountIdAndFilmId(@Param("id_account")int id_account,@Param("id_film")int id_film);*/
    LikesAction findByAccountIdAndFilmId(int id_account,int id_film);
    @Transactional
    void deleteByAccountIdAndFilmId(int account_id, int film_id);

}
