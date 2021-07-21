"use strict"
let api_url = '/api';
let pageUrl = "http://localhost:4000/html/search_user.html";
var userTemp =document.getElementById("user_temp"); 
var cont = document.querySelector("#cont");

window.onload = async function(){
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