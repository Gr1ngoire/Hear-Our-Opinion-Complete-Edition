package com.example.hearouropinion.Entities;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Petition {
    private final String creatorId;
    private final String title;
    private final String content;
    private int voicesDone;
    private final int requiredVoices;
    private final String publishDate;
    private final String[] signers;

    public Petition(PetitionBuilder builder) {
        this.creatorId = builder.creatorId;
        this.title = builder.title;
        this.content = builder.content;
        this.voicesDone = builder.voicesDone;
        this.requiredVoices = builder.requiredVoices;
        this.publishDate = builder.publishDate;
        this.signers = builder.signers;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public int getVoicesDone() { return voicesDone; }

    public int getRequiredVoices() { return requiredVoices;}

    public String getPublishDate() {
        return publishDate;
    }

    public String[] getSigners() {
        return signers;
    }

    public Map<String, String> asMap() {
        return new HashMap<String, String>(){{
            put("creatorId", creatorId);
            put("title", title);
            put("content", content);
            put("requiredVoices", Integer.toString(requiredVoices));
            put("publishDate", publishDate);
            put("signers", Arrays.toString(signers));
        }};
    }

    public static class PetitionBuilder {
        private final String title;
        private  String creatorId;
        private String content;
        private int voicesDone;
        private int requiredVoices;
        private String publishDate;
        private String[] signers;

        public PetitionBuilder(String title) {
            this.title = title;
        }

        public PetitionBuilder setCreatorId(String creatorId) {
            this.creatorId = creatorId;
            return this;
        }

        public PetitionBuilder setContent(String content) {
            this.content = content;
            return this;
        }

        public PetitionBuilder setVoicesDone(int voicesDone) {
            this.voicesDone = voicesDone;
            return this;
        }

        public PetitionBuilder setRequiredVoices(int requiredVoices) {
            this.requiredVoices = requiredVoices;
            return this;
        }

        public PetitionBuilder setPublishDate(String publishDate) {
            this.publishDate = publishDate;
            return this;
        }

        public PetitionBuilder setSigners(String[] signers) {
            this.signers = signers;
            return this;
        }

        public Petition build() {
            return new Petition(this);
        }
    }
}
