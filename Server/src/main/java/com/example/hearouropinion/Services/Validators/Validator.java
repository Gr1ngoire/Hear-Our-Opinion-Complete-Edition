package com.example.hearouropinion.Services.Validators;

import java.util.Map;

public abstract class Validator {
    protected final ValidatorsStorage validators = new ValidatorsStorage(){{
        addValidationUnit(new NullValidationUnit());
        addValidationUnit(new EmptyValidationUnit());
    }};

    public void validate(Map<String, String> toValidate) throws IllegalArgumentException {
        for (Map.Entry<String, String> entry: toValidate.entrySet()) {
            for (ValidationSingleUnit vsu: validators.getValidators()) {
                vsu.validate(entry.getKey(), entry.getValue());
            }
        }
    }

    private class NullValidationUnit extends ValidationSingleUnit {

        @Override
        void validate(String parName, String toValidate) throws NullPointerException {
            if (toValidate == null) {
                throw new NullPointerException(String.format("%s can not be null", parName));
            }
        }
    }

    private class EmptyValidationUnit extends ValidationSingleUnit {

        @Override
        void validate(String parName, String toValidate) throws IllegalArgumentException {
            if (toValidate.length() == 0) {
                throw new IllegalArgumentException(String.format("%s can not be empty", parName));
            }
        }
    }
}
