"use strict"
const formLogin = document.getElementById("form-login");
const pStatus = document.getElementById("login-status");
const formSignup = document.getElementById("form-signup");
const pStatusSignUp = document.getElementById("signup-status");
let accessToken = '';
// let pageUrl = "http://localhost:4000/html/account.html";
// let api_url = '/api';
// let pageUrl = "http://localhost:4000/html/account.html";

let pageUrl = "https://simple-twitter-new.herokuapp.com/html/account.html";
let pageUrlHome = "https://simple-twitter-new.herokuapp.com/";
let api_url = 'https://simple-twitter-new.herokuapp.com/api';

window.onload = async function(){
  let token = localStorage.getItem("token");
  if(!token){
    document.getElementById("account").style.display = "none";
    document.getElementById("my_posts").style.display = "none";
    document.getElementById("my_friends_posts").style.display = "none";
    document.getElementById("my_Friends").style.display = "none";
    document.getElementById("search_user").style.display = "none";
    document.getElementById("start").style.display = "inline-block";
    document.getElementById("logout").style.display = "none";
  }else{
      document.getElementById("account").style.display = "inline-block";
      document.getElementById("my_posts").style.display = "inline-block";
      document.getElementById("my_friends_posts").style.display = "inline-block";
      document.getElementById("my_Friends").style.display = "inline-block";
      document.getElementById("search_user").style.display = "inline-block";
      document.getElementById("start").style.display = "none";   
      document.getElementById("logout").style.display = "inline-block";
  }
};

formLogin.onsubmit = async e => {
    e.preventDefault();
    console.log(formLogin.email.value);
    const loginDetails = await login({ email: formLogin.email.value, password: formLogin.password.value });
    console.log(loginDetails);
    if (loginDetails.error) {
      pStatus.innerText = loginDetails.error;
      return;
    }
    accessToken = loginDetails.token;
    pStatus.innerText = "";
    localStorage.setItem("token", accessToken);
    window.location.href = pageUrl;
}

formSignup.onsubmit = async e => {
  e.preventDefault();
  const loginDetails = await SignUp({ email: formSignup.email.value, password: formSignup.password.value, username:formSignup.username.value });
  if (loginDetails.error) {
    pStatusSignUp.innerText = loginDetails.error;
    return;
  }
  accessToken = loginDetails.token;

  pStatusSignUp.innerText = "";
  localStorage.setItem("token", accessToken);
  window.location.href = pageUrl;
}

async function login(data) {
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

function logout(){
  localStorage.removeItem('token');
  window.location.href = pageUrlHome;
};