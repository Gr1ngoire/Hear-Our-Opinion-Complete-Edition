import { nameValidator } from "./atomicFieldValidators/nameValidator";
import { contentValidator } from "./atomicFieldValidators/contentValidator";
import { emailValidator } from "./atomicFieldValidators/emailValidator";
import { passwordValidator } from "./atomicFieldValidators/passwordValidator";
import { requiredVoicesValdator } from "./atomicFieldValidators/requiredVoicesValdator";
import { titleValidator } from "./atomicFieldValidators/titleValidator";
import { privacyPolicyValidator } from "./atomicFieldValidators/privacyPolicyValidator";

const validate = (type, value) => {
    switch (type) {
        case "title":
            return titleValidator(value);
        case "content":
            return contentValidator(value);
        case "requiredVoices":
            return requiredVoicesValdator(value);
        case "name":
            return nameValidator(value);
        case "email":
            return emailValidator(value);
        case "password":
            return passwordValidator(value);
        case "privacyPolicy":
            return privacyPolicyValidator(value);
        default:
            break;
    }
};

export default validate;
