// This file validate typo error

const signUpForm = document.getElementById('signUpForm');

signUpForm.addEventListener('submit', (e) => {
  let errors = {};

  // Prevent submitting
  e.preventDefault();
  
  // Select element
  const account = signUpForm.querySelector("input[name='account']").value.trim();
  const password = signUpForm.querySelector("input[name='password']").value;
  const cPassword = signUpForm.querySelector("input[name='cPassword']").value;

  // Define account errors
  if (accountTesting(account) !== '')
    errors.account = accountTesting(account);
  if (passwordTesting(password) !== '')
    errors.password = passwordTesting(password);
  if (cPasswordTesting(cPassword, password) !== '')
    errors.cPassword = cPasswordTesting(cPassword, password);
  
  // Display typo errors
  if (Object.keys(errors).length) {
    // Change error text
    for (key in errors) showErrorText(key, errors[key]);
  }
  // Redirect or display database invalid post
  else axios.post('/register', { account, password })
  .then(res => {
    console.log(res.data);
    window.location.href = "/login";
  })
  .catch(err => showErrorText('account', err.response.data));
})

function accountTesting(accTrimmed){
  let finalError = '';

  if (!NO_SPECIAL_CHAR.test(accTrimmed))
    finalError = ACCOUNT_HAS_SPECIAL_CHARACTER;

  if (!(accTrimmed.length >= 4 && accTrimmed.length < 20))
    finalError = ACCOUNT_LENGTH_NOT_APPRORIATE;

  if (accTrimmed.length < 1)
    finalError = ACCOUNT_REQUIRE;
  
  return finalError;
}

function passwordTesting(pass){
  let finalError = '';

  if (!(pass.length >= 7 && pass.length < 20))
    finalError = PASSWORD_LENGTH_NOT_APPRORIATE;

  if (pass.length < 1 )
    finalError = PASSWORD_REQUIRE;

  return finalError;
}

function cPasswordTesting(cPass, pass){
  let finalError = '';

  if (cPass !== pass) 
    finalError = CONFIRM_DOES_NOT_MATCH_WITH_PASSWORD;

  if (cPass.length < 1 )
    finalError = CONFIRM_PASSWORD_REQUIRE;

  return finalError;
}

function showErrorText(field, value){
  const errorMessage = signUpForm.querySelector(`[data-name=${field}]`);
  errorMessage.classList.add('show-error-text');
  errorMessage.innerHTML = `${value}`;
}