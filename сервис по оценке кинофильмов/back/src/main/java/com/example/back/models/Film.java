package com.example.back.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String name;
    String author;

    @Lob
    String description;

    @Lob
    String preview;
    String time;
    String genre;
    String years;

    @JsonManagedReference
    @OneToMany(mappedBy = "film")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    List<LikesAction> list;

    @JsonManagedReference
    @OneToMany(mappedBy = "film")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    List<Rating> list_rating;
}
