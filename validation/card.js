const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateDeckInput(data) {
  let errors = {};

  data.front = validText(data.front) ? data.front : '';
  data.back = validText(data.back) ? data.back : '';

  if (Validator.isEmpty(data.front)) {
    errors.front = 'Front of card is required';
  }
  if (Validator.isEmpty(data.back)) {
    errors.back = 'Back of card is required';
  }

  if (!Validator.isLength(data.front, { min: 2, max: 60 })) {
    errors.front = 'Front must be between 2 and 60 characters';
  }

  if (!Validator.isLength(data.back, { min: 2, max: 60 })) {
    errors.back = 'Back must be between 2 and 60 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};