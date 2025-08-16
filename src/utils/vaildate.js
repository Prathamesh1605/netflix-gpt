export const validateData = (email, password, fName, lName) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,}$/;
  const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
  let SuccessfullResponse = null;
  // const fNameResponse = nameRegex.test(fName.trim());
  // if (!fNameResponse) return "Enter Valid First Name";

  // const lNameResponse = nameRegex.test(lName.trim());
  // if (!lNameResponse) return "Enter Valid Last name";

  const response = emailRegex.test(email.trim());
  if (!response) return "Email not valid";

  const passwdResponse = passwordPolicy.test(password);
  if (!passwdResponse)
    return "Password should contain atleast 1 character , number ands Uppercase Letter.";

  return SuccessfullResponse;
};
