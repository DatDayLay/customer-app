export const validateForm = (formData) => {
  const errors = {};

  if (!formData.firstName) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName) {
    errors.lastName = "Last name is required";
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(formData.email)) {
    errors.email = "Invalid email address";
  }

  const phonePattern = /^[0-9]{11}$/;
  if (!formData.phoneNumber) {
    errors.phoneNumber = "Phone number is required(11 digits)";
  } else if (!phonePattern.test(formData.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 11 digits";
  }

  if (!formData.state) {
    errors.state = "State is required";
  }

  return errors;
};

export const validateButton = (formData, errors) => {
  return Object.keys(errors).length === 0;
};
