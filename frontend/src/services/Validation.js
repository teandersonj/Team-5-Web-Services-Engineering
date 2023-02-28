export const InputValidationRules = {
    email: {
        type: "email",
        // required: true,
        pattern: {
            // eslint-disable-next-line no-useless-escape
            // eslint-disable-next-line no-control-regex
            value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: "Invalid email address"
        },
    },
    username: {
        type: "text",
        // required: true,
        minLength: {
            value: 8,
            message: "Username must be at least 8 characters"
        },
        maxLength: {
            value: 100,
            message: "Username must be less than 100 characters"
        },
        pattern: {
            value: "^[a-zA-Z0-9]+$",
            message: "Username must only contain letters and numbers"
        }
    },
    password: {
        type: "password",
        // required: true,
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
        },
        maxLength: {
            value: 100,
            message: "Password must be less than 100 characters"
        },
        pattern: {
            value: "^[a-zA-Z0-9!.,+\\-$@]+$",
            message: "Password must only contain letters, numbers, and $@!.,+-"
        }
    },
    confirmPassword: {
        // Same as password, except we'll pass in the password value to compare to instead of specifying the pattern
        type: "password",
        // required: true,
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
        },
        maxLength: {
            value: 100,
            message: "Password must be less than 100 characters"
        }
    },
    fName: {
        type: "text",
        // required: true,
        minLength: {
            value: 3,
            message: "First name must be at least 3 characters"
        },
        maxLength: {
            value: 100,
            message: "First name must be less than 100 characters"
        },
        pattern: {
            value: "^[a-zA-Z]+$",
            message: "First name must only contain letters"
        }
    },
    lName: {
        type: "text",
        // required: true,
        minLength: {
            value: 3,
            message: "Last name must be at least 3 characters"
        },
        maxLength: {
            value: 100,
            message: "Last name must be less than 100 characters"
        },
        pattern: {
            value: "^[a-zA-Z]+$",
            message: "Last name must only contain letters"
        }
    },
    playstyle: {
        // required: true
        // One of the following values: Casual, Semi-Competitive, Competitive
    },
};

/**
 * Validates a single element based on the rules defined in InputValidationRules
 * @param {HTMLElement} element - The element to validate, should have ID, type, and value properties aligning with the InputValidationRules object 
 * @param {string} overrideType - Allows the type of the element to be overridden, useful for when the element type is not the same as the validation type
 * @param {string} overridePattern - Allows the pattern of the element to be overridden, useful for when the desired pattern is not the same as one of the predefined patterns
 * -- Use it like {value: "^[a-zA-Z]+$", message: "Last name must only contain letters"}
 * @returns An object of errors {[validationRule1]: "Error Message for Rule 1", ...} for the specific element or an empty object if no errors
 */
export default function validateElement(element, overrideType=null, overridePattern=null) {
    const elValue = element.value;
    const elRules = InputValidationRules[overrideType || element.id];
    let errs = {};
    switch (overrideType || element.type) {
        case "email":
            if (!elValue.match(new RegExp(overridePattern?.value || elRules.pattern.value))) {
                errs = { ...errs, pattern: overridePattern?.message || elRules.pattern.message };
            }
            break;
        case "text":
            // Need to allow multiple errors to be associated with a single element
            // and also be able to remove them when the rule is satisfied
            if (elValue.length < elRules.minLength.value) {
                errs = { ...errs, minLength: elRules.minLength.message };
            } else if (elValue.length > elRules.maxLength.value) {
                errs = { ...errs, maxLength: elRules.maxLength.message };
            }
            if (elValue.length > 0 && !elValue.match(new RegExp(overridePattern?.value || elRules.pattern.value))) {
                errs = { ...errs, pattern: overridePattern?.message || elRules.pattern.message };
            }
            break;
        case "password":
            if (elValue.length < elRules.minLength.value) {
                errs = { ...errs, minLength: elRules.minLength.message };
            } else if (elValue.length > elRules.maxLength.value) {
                errs = { ...errs, maxLength: elRules.maxLength.message };
            }
            if (elValue.length > 0 && !elValue.match(new RegExp(overridePattern?.value || elRules.pattern.value))) {
                errs = { ...errs, pattern: overridePattern?.message || elRules.pattern.message };
            }
            break;
        default:
            break;
    }
    
    if (Object.keys(errs).length > 0) {
        return errs;
    } else {
        return {};
    }
};
