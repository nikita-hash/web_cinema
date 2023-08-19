package com.example.back.repository;

import com.example.back.models.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmRepository extends JpaRepository<Film,Integer> {
    List<Film> findAllByGenre(String genre);
}
