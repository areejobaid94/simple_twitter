"use strict"
let api_url = 'https://simple-twitter-new.herokuapp.com/api';
let pageUrl = "https://simple-twitter-new.herokuapp.com/html/search_user.html";
var userTemp =document.getElementById("user_temp"); 
var cont = document.querySelector("#cont");
let pageUrlHome = "https://simple-twitter-new.herokuapp.com/";

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

    let users = await search();
    appendRes(users.friends);
}

function appendRes(data){
  cont.innerHTML = "";
  for(let i = data.length -1; i >= 0; i--){
    addContent(data[i]);
  };
}

async function search() {
  let token = localStorage.getItem("token");
  let res = await fetch(`${api_url}/users/my_friends`, {
      method: 'Get',
      credentials:'include',
      cache:'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
  });
  return await res.json();
}


async function followAndUnfollowUser(id,method){
  let token = localStorage.getItem("token");
  let res = await fetch(`${api_url}/follow/${id}`, {
      method: method,
      credentials:'include',
      cache:'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
  });
  return await res.json();
}

function addContent(data){
    let clone = userTemp.content.cloneNode(true);
    let username = clone.querySelector(".username");
    let follow = clone.querySelector(".follow");
    follow.id = data.id;
    follow.addEventListener("click", async function(e) {
      e.preventDefault();
        if(follow.value.toLowerCase() == "unfollow"){
          await followAndUnfollowUser(this.id,"Delete");
          follow.value = "follow"
        }else{
          await followAndUnfollowUser(this.id,"Post");
          follow.value = "unfollow"
        }
    });
    username.innerText = data.username;
    cont.appendChild(clone);
};


function logout(){
  localStorage.removeItem('token');
  window.location.href = pageUrlHome;
};