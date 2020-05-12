// This file validate typo error

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', e => {
    let errors = {};
    e.preventDefault();
    hideErrorText();
    // Select element
    const account = loginForm.querySelector("input[name='account']").value.trim();
    const password = loginForm.querySelector("input[name='password']").value;

    // Define error
    if (accountTesting(account) !== '')
        errors.account = accountTesting(account);
    if (passwordTesting(password) !== '')
        errors.password = passwordTesting(password);

    // Display error
    if (Object.keys(errors).length)
        for (key in errors) showErrorText(key, errors[key]);
    else {
        axios.post("http://localhost:3000/login",{ account, password })
        .then(async res => {
            const token = res.data;
            // Set token in local storage
            localStorage.setItem('jwtToken',`Bearer ${token}`);
            // Change Authorization header
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
            const {account } = jwt_decode(token).userInfo;
            window.location.href = "http://localhost:3000/user/profile/" + account;

            
        })
        .catch(err => {
            for (key in err.response.data) showErrorText(key, err.response.data[key]);
        });
    }
})

function accountTesting(accTrimmed){
    let finalError = '';
  
    if (accTrimmed.length < 1)
        finalError = ACCOUNT_REQUIRE;
    
    return finalError;
}

function passwordTesting(pass){
    let finalError = '';
  
    if (pass.length < 1 )
        finalError = PASSWORD_REQUIRE;
    
    return finalError;
}

function showErrorText(field, value){
    const errorMessage = loginForm.querySelector(`[data-name=${field}]`);
    errorMessage.classList.add('show-error-text');
    errorMessage.innerHTML = `${value}`;
}

function hideErrorText(){
    const mockedField = ['account','password'];
    for (field of mockedField){
        let errorMessage = loginForm.querySelector(`[data-name=${field}]`);        
        errorMessage.classList.add('hidden-error-text');
        errorMessage.innerHTML = '';
    }
}