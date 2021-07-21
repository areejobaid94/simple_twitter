"use strict"
let api_url = '/api';
const formUpdate = document.getElementById("update_profile");
let pStatus = document.getElementById("update-status");
let aPStatus = document.getElementById("add-post-status");
const formAddPast = document.getElementById("add_post");
let pageUrl = "http://localhost:4000/html/my_posts.html";
let pageUrlHome = "http://localhost:4000/";

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

    const user = await fetchUserData();
    console.log(user);    
    document.getElementById("username").innerHTML = user.username;
    document.getElementById("email").innerHTML = user.email;
    document.getElementById("username_update").value = user.username;
    document.getElementById("email_update").value = user.email;
};

function logout(){
  localStorage.removeItem('token');
  window.location.href = pageUrlHome;
};


async function fetchUserData() {
    let token = localStorage.getItem("token");
    const res = await fetch(`${api_url}/users/profile`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return await res.json();
}

formUpdate.onsubmit = async e => {
  e.preventDefault();
  const data = await updateProfile({ email: formUpdate.email.value, password: formUpdate.password.value, username:formUpdate.username.value });
  if (data.error) {
    pStatus.innerText = data.error;
    return;
  }
  let accessToken = data.token;
  pStatus.innerText = "Updated";
  localStorage.setItem("token", accessToken);
  document.getElementById("username").innerHTML = data.user.username;
  document.getElementById("email").innerHTML = data.user.email;
}

formAddPast.onsubmit = async e => {
  e.preventDefault();
  let res = await addPost({ text: formAddPast.message.value });
  console.log(res);
  if(res.status != 201){
    aPStatus.innerText = "Errrrrrroooooorrrrrrrrrrr";
    return;
  };
  window.location.href = pageUrl;
}

async function updateProfile(data) {
  let token = localStorage.getItem("token");
  const res = await fetch(`${api_url}/users/profile`, {
    method: 'Put',
    credentials:'include',
    cache:'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}

async function addPost(data) {
  let token = localStorage.getItem("token");
  return await fetch(`${api_url}/posts/`, {
    method: 'Post',
    credentials:'include',
    cache:'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(data)
  });
}


