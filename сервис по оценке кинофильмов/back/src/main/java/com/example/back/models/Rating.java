package com.example.back.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "account_id")
    Account account;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "film_id" )
    Film film;
    int rating;
    String date;
}
