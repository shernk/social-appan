const isEmpty = (signup) => {
  if (signup.trim() === "") return true;
  else return false;
};

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

exports.validateSignUp = (signup) => {
  let errors = {};

  if (isEmpty(signup.email)) {
    errors.email = "Email is must not be empty";
  } else if (!isEmail(signup.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(signup.password)) {
    errors.password = "Must be not be Empty";
  } else if (signup.password !== signup.confirmPassword) {
    errors.confirmPassword = "Password must be match";
  }

  if (isEmpty(signup.handle)) errors.handle = "Must be not be Empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignIn = (signin) => {
  let errors = {};

  if (isEmpty(signin.email)) errors.email = "Must not be empty";
  if (isEmpty(signin.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.reduceUserDetails = (userData) => {
  let userDetails = {};

  if(!isEmpty(userData.bio.trim())) userDetails.bio = userData.bio;
  if(!isEmpty(userData.website.trim())) {
    // https://website.com
    if(userData.website.trim().substring(0, 4) !== 'http') {
      userDetails.website = `https://${userData.website.trim()}`;
    } else userDetails.website = userData.website;
  }
  if(!isEmpty(userData.location.trim())) userDetails.location = userData.location;

  return userDetails;
}
