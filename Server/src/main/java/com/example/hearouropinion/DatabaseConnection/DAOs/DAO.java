package com.example.hearouropinion.DatabaseConnection.DAOs;

import com.example.hearouropinion.Entities.Petition;
import com.example.hearouropinion.Entities.PetitionWithPetitionId;

import java.sql.SQLException;
import java.util.List;

public abstract class DAO {
    public abstract PetitionWithPetitionId getById(int id) throws ClassNotFoundException, SQLException;
    public abstract List<PetitionWithPetitionId> getAll() throws ClassNotFoundException, SQLException;
    public abstract PetitionWithPetitionId create(Petition toCreate) throws ClassNotFoundException, SQLException;
    public abstract PetitionWithPetitionId update(int id, Petition payload) throws ClassNotFoundException, SQLException;
    public abstract PetitionWithPetitionId delete(int id) throws ClassNotFoundException, SQLException;
}
