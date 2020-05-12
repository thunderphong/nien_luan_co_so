const yesBTN = document.getElementById('yes');
const noBTN = document.getElementById('no');

yesBTN.addEventListener('click', e => {
    localStorage.removeItem('jwtToken');
    window.location.href = "http://localhost:3000/";
})

noBTN.addEventListener('click', e => {
    token = localStorage.getItem('jwtToken');
    window.location.href = "http://localhost:3000/user/get-profile?token=" + token;
})
