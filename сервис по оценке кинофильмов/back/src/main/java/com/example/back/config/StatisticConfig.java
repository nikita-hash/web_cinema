package com.example.back.config;

import com.example.back.models.Film;
import com.example.back.models.LikesAction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatisticConfig {
    int number_user;
    int number_block;
    int number_film;
    List<Integer>list_like;
    List<Film>likesActions;
}
