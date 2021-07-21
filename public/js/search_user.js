"use strict"
let api_url = '/api';
const formSearchUser = document.getElementById("search_user");
let pageUrl = "http://localhost:4000/html/search_user.html";
var searchTemp =document.getElementById("search_user_temp"); 
var cont = document.querySelector("#cont");

window.onload = async function(){
  let token = localStorage.getItem("token");
  if(!token){
      document.getElementById("account").style.display = "none";
      document.getElementById("my_posts").style.display = "none";
      document.getElementById("my_friends_posts").style.display = "none";
      document.getElementById("my_Friends").style.display = "none";
      document.getElementById("search_user").style.display = "none";
      document.getElementById("start").style.display = "block";
      
  }else{
      document.getElementById("account").style.display = "block";
      document.getElementById("my_posts").style.display = "block";
      document.getElementById("my_friends_posts").style.display = "block";
      document.getElementById("my_Friends").style.display = "block";
      document.getElementById("search_user").style.display = "block";
      document.getElementById("start").style.display = "none";   
   }

}

formSearchUser.onsubmit = async e => {
    e.preventDefault();
    let res = await search(formSearchUser.username.value);
    console.log(res);
    if(res.error){
      aPStatus.innerText = "Errrrrrroooooorrrrrrrrrrr";
      return;
    };
    appendRes(res);
};  


function appendRes(data){
  cont.innerHTML = "";
  for(let i = data.followed.length -1; i >= 0; i--){
    addContent(true,data.followed[i]);
  }

  for(let i = data.notfollowed.length -1; i >= 0; i--){
    addContent(false,data.notfollowed[i]);
  }
}

async function search(username) {
  let token = localStorage.getItem("token");
  let res = await fetch(`${api_url}/users/search?username=${username}`, {
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

function addContent(is_follow, data){
    let clone = searchTemp.content.cloneNode(true);
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
    if(is_follow)follow.value = "Unfollow"
    username.innerText = data.username;
    cont.appendChild(clone);
};