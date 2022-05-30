package com.example.hearouropinion.DatabaseConnection.DAOs;

import com.example.hearouropinion.Entities.Petition;
import com.example.hearouropinion.Entities.PetitionWithPetitionId;
import com.example.hearouropinion.Utils.DataTransformers.DataTransformer;
import com.google.gson.Gson;

import java.sql.*;
import java.util.List;

public class MysqlDAO extends DAO {
    private final DataTransformer dataTransformer;
    private final Connection connection;
    private final Gson gson;

    public MysqlDAO(Connection connection) {
        dataTransformer = new DataTransformer();
        gson = new Gson();
        this.connection = connection;
    }

    public List<PetitionWithPetitionId> getAll() throws ClassNotFoundException, SQLException {

        String query = "SELECT * FROM petition";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        ResultSet resultSet = preparedStatement.executeQuery();

        List<PetitionWithPetitionId> toReturn = dataTransformer.transformIntoResponsePetitionList(resultSet);

        preparedStatement.close();
        return toReturn;
    }

    public PetitionWithPetitionId getById(int id) throws ClassNotFoundException, SQLException {

        String query = "SELECT * FROM petition WHERE petition_id=?";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1, id);
        ResultSet resultSet = preparedStatement.executeQuery();

        PetitionWithPetitionId toReturn = dataTransformer.transformIntoPetitionWithPetitionId(resultSet);

        preparedStatement.close();
        return toReturn;
    }

    public PetitionWithPetitionId create(Petition toCreate) throws ClassNotFoundException, SQLException {
        String query = "INSERT INTO petition (creator_id, title, content, voices_done, voices_required, publish_date, signers) VALUES (?, ?, ?, ?, ?, ?, ?)";

        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, toCreate.getCreatorId());
        preparedStatement.setString(2, toCreate.getTitle());
        preparedStatement.setString(3, toCreate.getContent());
        preparedStatement.setInt(4, toCreate.getVoicesDone());
        preparedStatement.setInt(5, toCreate.getRequiredVoices());
        preparedStatement.setString(6, toCreate.getPublishDate());
        preparedStatement.setString(7, gson.toJson(toCreate.getSigners()));
        preparedStatement.execute();

        PreparedStatement resultStatement = connection.prepareStatement("SELECT * FROM petition WHERE title=?");
        resultStatement.setString(1, toCreate.getTitle());
        ResultSet resultSet = resultStatement.executeQuery();
        PetitionWithPetitionId toReturn = dataTransformer.transformIntoPetitionWithPetitionId(resultSet);

        preparedStatement.close();
        return toReturn;
    }

    // Update method updates only quantity of voted users(id array) and increments or decrements quantity of them (voted)
    public PetitionWithPetitionId update(int id, Petition payload) throws ClassNotFoundException, SQLException {

        String query = "UPDATE petition SET voices_done = ?, signers = ? WHERE petition_id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        System.out.println(payload.getVoicesDone());
        System.out.println(gson.toJson(payload.getSigners()));
        System.out.println(id);

        preparedStatement.setInt(1, payload.getVoicesDone());
        preparedStatement.setString(2, gson.toJson(payload.getSigners()));
        preparedStatement.setInt(3, id);
        System.out.println("Before execution");
        preparedStatement.execute();

        PetitionWithPetitionId toReturn = getById(id);

        preparedStatement.close();
        return toReturn;
    }

    public PetitionWithPetitionId delete(int id) throws ClassNotFoundException, SQLException {

        PetitionWithPetitionId toReturn = getById(id);

        String query = "DELETE FROM petition WHERE petition_id=?";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1, id);
        preparedStatement.execute();

        preparedStatement.close();
        return toReturn;
    }

}
