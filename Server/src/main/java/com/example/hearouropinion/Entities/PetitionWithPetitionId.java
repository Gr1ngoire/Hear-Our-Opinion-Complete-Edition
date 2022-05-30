package com.example.hearouropinion.Entities;

public class PetitionWithPetitionId extends Petition {
    private final String petitionId;

    public PetitionWithPetitionId(ResponsePetitionBuilder builder) {
        super(builder);
        this.petitionId = builder.petitionId;
    }


    public String getPetitionId() {
        return petitionId;
    }


    public static class ResponsePetitionBuilder extends PetitionBuilder{
        private String petitionId;


        public ResponsePetitionBuilder(String title) {
            super(title);
        }

        public ResponsePetitionBuilder setPetitionId(String petitionId) {
            this.petitionId = petitionId;
            return this;
        }

        @Override
        public Petition build() {
            return new PetitionWithPetitionId(this);
        }
    }
}
