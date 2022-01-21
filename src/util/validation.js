module.exports.validatesigninUser = (username, password) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username should not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password should not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validatesignupUser = (
  fname,
  lname,
  phone,
  email,
  username,
  password,
  confirmPassword
) => {
  const errors = {};
  if (fname.trim() === '') {
    errors.fname = 'First Name should not be empty';
  }
  if (lname.trim() === '') {
    errors.lname = 'Last Name should not be empty';
  }
  if (phone === '') {
    errors.phone = 'Phone number should not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email should not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Enter a valid email address';
    }
  }
  if (username.trim() === '') {
    errors.username = 'Username should not be empty';
  }
  if (password === '') {
    errors.password = 'Password should not be empty';
  }
  if (confirmPassword === ''){
    errors.confirmPassword = 'Confirm password should not be empty';
  } 
  else if (password !== confirmPassword) {
    errors.confirmPassword = 'Both Passwords should need to be same';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateProfileUpdate = (fname, lname, email, phone) => {
  const errors = {};
  if (fname.trim() === '') {
    errors.fname = 'First Name should not be empty';
  }
  if (lname.trim() === '') {
    errors.lname = 'Last Name should not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Enter a valid email address';
    }
  }
  if (phone === '') {
    errors.phone = 'Phone number should not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateBook = (title, story) => {
  const errors = {};
  if (title.trim() === '') {
    errors.title = 'Title should not be empty';
  }
  if (story.trim() === '') {
    errors.story = 'Story should not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
