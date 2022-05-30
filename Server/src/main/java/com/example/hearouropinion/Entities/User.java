package com.example.hearouropinion.Entities;

import java.util.ArrayList;
import java.util.List;

public class User {
    private String name;
    private String email;
    private final List<Petition> petitions;

    public User(String name, String email, List<Petition> petitions) {
        this.name = name;
        this.email = email;
        this.petitions = petitions;
    }

    public User(User user) {
        this.name = user.name;
        this.email = user.email;
        this.petitions = user.petitions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Petition> getPetitions() {
        return new ArrayList<>(petitions);
    }

    public void addPetition(Petition toAdd) {
        petitions.add(toAdd);
    }

    public void removePetition(Petition toRemove) {
        petitions.remove(toRemove);
    }
}
