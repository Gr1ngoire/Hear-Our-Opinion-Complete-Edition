package com.example.hearouropinion.Services.Validators;

import java.util.ArrayList;
import java.util.List;

public class ValidatorsStorage {
    private List<ValidationSingleUnit> validators = new ArrayList<>();

    public List<ValidationSingleUnit> getValidators() {
        return new ArrayList<>(validators);
    }

    public void addValidationUnit(ValidationSingleUnit vsu) {
        validators.add(vsu);
    }

    public void setValidators(List<ValidationSingleUnit> validators) {
        this.validators = validators;
    }
}
