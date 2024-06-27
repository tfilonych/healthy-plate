const validation = () => {
  const rules = {
    username: {
      isEmpty: {
        message: 'Please enter username.',
        validate: (value) => !value
      },
      lessThenNum: {
        message: 'Username has to be longer than 6',
        validate: (value) => value.length < 6
      }
    },
    password: {
      isEmpty: {
        message: 'Please enter password.',
        validate: (value) => !value
      },
      lessThenNum: {
        message: 'Password has to be longer than 6',
        validate: (value) => value.length < 6
      }
    },
    confirmPassword: {
      isEmpty: {
        message: 'Please confirm password.',
        validate: (value) => !value
      },
      notMatch: {
        message: 'Password and Confirm Password do not match.',
        validate: (value, passwordValue) => value !== passwordValue
      }
    },
    email: {
      isEmpty: {
        message: 'Please enter an email.',
        validate: (value) => !value
      },
      validEmail: {
        message: 'Please enter a valid email.',
        validate: (value) => !/\S+@\S+\.\S+/.test(value)
      }
    }
  };

  const validateHandler = (name, value, additionalValue = '') => {
    const fieldRules = rules[name];

    if (fieldRules) {
      for (const ruleKey in fieldRules) {
        const rule = fieldRules[ruleKey];
        const validationResult = rule.validate(value, additionalValue);

        if (validationResult) {
          return rule.message;
        }
      }
    }
    return '';
  };

  return {
    validateHandler
  };
};
export default validation;