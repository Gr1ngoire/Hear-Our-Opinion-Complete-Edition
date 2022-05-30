package com.example.hearouropinion.Utils.DataTransformers;

import com.example.hearouropinion.Entities.Petition;
import com.example.hearouropinion.Entities.PetitionWithPetitionId;
import com.google.gson.Gson;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DataTransformer {
    private final Gson gson = new Gson();

    public Petition transformIntoPetition(ResultSet resultSet) throws SQLException {
        Petition toReturn = null;
        while (resultSet.next()) {
            toReturn = new Petition.PetitionBuilder(resultSet.getString("title"))
                    .setCreatorId(resultSet.getString("creator_id"))
                    .setContent(resultSet.getString("content"))
                    .setVoicesDone(Integer.parseInt(resultSet.getString("voices_done")))
                    .setRequiredVoices(Integer.parseInt(resultSet.getString("voices_required")))
                    .setPublishDate(resultSet.getString("publish_date"))
                    .setSigners(gson.fromJson(resultSet.getString("signers"), String[].class))
                    .build();
        }
        return toReturn;
    }

    public List<PetitionWithPetitionId> transformIntoResponsePetitionList(ResultSet resultSet) throws SQLException {
        List<PetitionWithPetitionId> toReturn = new ArrayList<>();
        while (resultSet.next()) {
            toReturn.add((PetitionWithPetitionId) new PetitionWithPetitionId.ResponsePetitionBuilder(resultSet.getString("title"))
                    .setPetitionId(resultSet.getString("petition_id"))
                    .setCreatorId(resultSet.getString("creator_id"))
                    .setContent(resultSet.getString("content"))
                    .setVoicesDone(Integer.parseInt(resultSet.getString("voices_done")))
                    .setRequiredVoices(Integer.parseInt(resultSet.getString("voices_required")))
                    .setPublishDate(resultSet.getString("publish_date"))
                    .setSigners(gson.fromJson(resultSet.getString("signers"), String[].class))
                    .build());
        }
        return toReturn;
    }

    public PetitionWithPetitionId transformIntoPetitionWithPetitionId(ResultSet resultSet) throws SQLException {
        PetitionWithPetitionId toReturn = null;
        while (resultSet.next()) {
            toReturn = (PetitionWithPetitionId) new PetitionWithPetitionId.ResponsePetitionBuilder(resultSet.getString("title"))
                    .setPetitionId(resultSet.getString("petition_id"))
                    .setCreatorId(resultSet.getString("creator_id"))
                    .setContent(resultSet.getString("content"))
                    .setVoicesDone(Integer.parseInt(resultSet.getString("voices_done")))
                    .setRequiredVoices(Integer.parseInt(resultSet.getString("voices_required")))
                    .setPublishDate(resultSet.getString("publish_date"))
                    .setSigners(gson.fromJson(resultSet.getString("signers"), String[].class))
                    .build();
        }
        return toReturn;
    }

}