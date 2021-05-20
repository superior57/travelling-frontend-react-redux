import Validator from 'validator';

export const validate = (fields, validationRules) => {
  let errors = {},
    isValid = true;
  validationRules.forEach((obj) => {
    const { field, validations } = obj;
    for (let i = 0; i < validations.length; i++) {
      const rule = validations[i].split(':');
      switch (rule[0]) {
        case 'email':
          if (!Validator.isEmpty('' + fields[field]) && !Validator.isEmail('' + fields[field])) {
            errors[field] = `${obj.name} is not a valid email.`;
            isValid = false;
            continue;
          }
          break;
        case 'required':
        default:
          if (Validator.isEmpty('' + fields[field])) {
            errors[field] = `${obj.name} is required.`;
            isValid = false;
            continue;
          }
          break;
      }
    }
  });

  return { isValid, errors };
};
