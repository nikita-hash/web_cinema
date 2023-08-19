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
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String login;
    String password;
    String status;
    String role;
    @Lob
    String avatar;

    @JsonManagedReference
    @OneToOne(cascade = CascadeType.ALL)
    Men men;

    @JsonIgnore
    @OneToMany(mappedBy = "account",fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    List<LikesAction> list;

    @JsonIgnore
    @OneToMany(mappedBy = "account",fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    List<LikesAction> list_rating;
}
