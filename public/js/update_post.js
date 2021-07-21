"use strict"
let api_url = '/api';
var id = localStorage.getItem("post_id");
const formUpdatePost = document.getElementById("update_post");
let aPStatus = document.getElementById("update-post-status");
let pageUrl = "http://localhost:4000/html/my_posts.html";

window.onload = async function(){
  let token = localStorage.getItem("token");
  if(!token){
      document.getElementById("account").style.display = "none";
      document.getElementById("my_posts").style.display = "none";
      document.getElementById("my_friends_posts").style.display = "none";
      document.getElementById("my_Friends").style.display = "none";
      document.getElementById("search_user").style.display = "none";
      document.getElementById("start").style.display = "inline-block";
      
  }else{
      document.getElementById("account").style.display = "inline-block";
      document.getElementById("my_posts").style.display = "inline-block";
      document.getElementById("my_friends_posts").style.display = "inline-block";
      document.getElementById("my_Friends").style.display = "inline-block";
      document.getElementById("search_user").style.display = "inline-block";
      document.getElementById("start").style.display = "none";   
  }

    let post = await feshPost();
    if(post.error)console.log(post.error);
    postData(post.post[0].text);
};

function postData(data){
  document.getElementById("add_post_input").value = data;
};

async function feshPost() {
    const res = await fetch(`${api_url}/posts/${id}`, {
    });
    return await res.json();
};

formUpdatePost.onsubmit = async e => {
    e.preventDefault();
    let res = await updatePost({ text: formUpdatePost.message.value });
    console.log(res);
    if(res.error){
      aPStatus.innerText = "Errrrrrroooooorrrrrrrrrrr";
      return;
    };
    window.location.href = pageUrl;
};  

async function updatePost(data) {
    let token = localStorage.getItem("token");
    return await fetch(`${api_url}/posts/${id}`, {
      method: 'Put',
      credentials:'include',
      cache:'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(data)
    });
}