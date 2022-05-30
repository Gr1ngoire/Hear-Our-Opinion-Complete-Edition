package com.example.hearouropinion.Services.Validators;


import java.util.Map;

public class LoginUserValidator extends Validator {

    @Override
    public void validate(Map<String, String> toValidate) throws IllegalArgumentException {
        validators.addValidationUnit(new EmailValidationUnit());
        validators.addValidationUnit(new PasswordValidationUnit());
        super.validate(toValidate);
    }

    private class EmailValidationUnit extends ValidationSingleUnit {

        @Override
        void validate(String parName, String toValidate) {
            if (parName.equals("email")) {
                if (!toValidate.matches("[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-z]+")) {
                    throw new IllegalArgumentException(String.format("%s must fit email format [example: abcd@example.text]", parName));
                }
            }
        }
    }

    private class PasswordValidationUnit extends ValidationSingleUnit{

        @Override
        void validate(String parName, String toValidate) {
            if (parName.equals("password")) {
                if (toValidate.length() < 8) {
                    throw new IllegalArgumentException("Password length must be at least 8 symbols");
                } else if (!toValidate.matches(".*[A-Z].*")) {
                    throw new IllegalArgumentException("Password must include at least one capital letter");
                } else if (!toValidate.matches(".*[a-z].*")) {
                    throw new IllegalArgumentException("Password must include at least one lower case letter");
                } else if (!toValidate.matches(".*[0-9].*")) {
                    throw new IllegalArgumentException("Password must include at least one digit");
                }
            }
        }
    }

}
