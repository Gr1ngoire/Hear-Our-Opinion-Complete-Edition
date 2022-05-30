package com.example.hearouropinion.Services.Validators;

import java.util.Map;

public class MyPetitionValidator extends Validator {

    @Override
    public void validate(Map<String, String> toValidate) throws IllegalArgumentException {
        validators.addValidationUnit(new RequiredVoicesValidationUnit());
        validators.addValidationUnit(new SignersValidationUnit());
        super.validate(toValidate);
    }

    private class RequiredVoicesValidationUnit extends ValidationSingleUnit {

        @Override
        void validate(String parName, String toValidate) {
            if (parName.equals("requiredVoices")) {
                if (!toValidate.matches("\\d+")) {
                    throw new IllegalArgumentException("Invalid votes format");
                }
                else if (Integer.parseInt(toValidate) < 100 || Integer.parseInt(toValidate) > 1000000) {
                    throw new IllegalArgumentException("Required voices diapason must be between 100 and 1000000");
                }
            }
        }
    }

    private class SignersValidationUnit extends ValidationSingleUnit {

        @Override
        void validate(String parName, String toValidate) {
            if (parName.equals("signers")) {
                String toOperate = toValidate.replace("[", "").replace("]", "").replaceAll(" ", "");
                if (toOperate.split(",").length == 0) {
                    throw new IllegalArgumentException("Signers array can not be empty");
                }
            }
        }
    }
}
