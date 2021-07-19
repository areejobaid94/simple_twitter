"use strict"
const formLogin = document.getElementById("form-login");
const pStatus = document.getElementById("login-status");
const formSignup = document.getElementById("form-signup");
const pStatusSignUp = document.getElementById("signup-status");
let accessToken = '';
let pageUrl = "http://localhost:4000/html/account.html";

//let api_url = 'https://jwt-pg-morganpage-tech.herokuapp.com/api';
let api_url = '/api';

formLogin.onsubmit = async e => {
    e.preventDefault();
    console.log(formLogin.email.value);
    const loginDetails = await login({ email: formLogin.email.value, password: formLogin.password.value });
    console.log(loginDetails);
    if (loginDetails.error) {
      pStatus.innerText = loginDetails.error;
      return;
    }
    accessToken = loginDetails.accessToken;
    window.localStorage.setItem(tokens, accessToken);
    window.location.href = pageUrl;

    // const jwtDecoded = jwtDecode(accessToken);
}

formSignup.onsubmit = async e => {
  e.preventDefault();
  console.log(formLogin.email.value);
  const loginDetails = await SignUp({ email: formSignup.email.value, password: formSignup.password.value, username:formSignup.username.value });
  console.log(loginDetails);
  if (loginDetails.error) {
    pStatusSignUp.innerText = loginDetails.error;
    return;
  }
  accessToken = loginDetails.accessToken;
  window.localStorage.setItem(tokens, accessToken);
  window.location.href = pageUrl;
  // const jwtDecoded = jwtDecode(accessToken);
}
async function login(data) {
    //console.log(JSON.stringify(data));
    console.log(data);
    const res = await fetch(`${api_url}/auth/login`, {
      method: 'POST',
      credentials:'include',
      cache:'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await res.json();
}


async function SignUp(data) {
  console.log(data);
  const res = await fetch(`${api_url}/users/signup`, {
    method: 'POST',
    credentials:'include',
    cache:'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}