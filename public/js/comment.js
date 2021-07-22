"use strict"
let api_url = 'https://simple-twitter-new.herokuapp.com/api';
var id = localStorage.getItem("post_id");
let pageUrl = "https://simple-twitter-new.herokuapp.com/html/comment.html";
const formAddComment = document.getElementById("add_comment");
let aPStatus = document.getElementById("add-comment-status");
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

    let post = await feshPost();
    if(post.error)console.log(post.error);
    postData(post.post)
    allComments(post.comments)
}

function postData(data){
  document.getElementById("username_post").textContent = data.username; 
  document.getElementById("text_post").textContent = data.text;
}

function allComments(comments){
  var commentTemp =document.getElementById("comment_temp"); 
  var cont = document.querySelector("#cont");
  for(let i =comments.length -1; i >= 0; i--){
    let clone = commentTemp.content.cloneNode(true);
    let username = clone.querySelector(".comment_username");
    username.textContent = comments[i].username;
    let text = clone.querySelector(".comment_text");
    text.textContent = comments[i].text;
    cont.appendChild(clone);
  }
}

async function feshPost() {
    const res = await fetch(`${api_url}/posts/${id}`, {
    });
    return await res.json();
}


formAddComment.onsubmit = async e => {
    e.preventDefault();
    let res = await addComment({ text: formAddComment.text.value });
    if(res.status != 201){
      aPStatus.innerText = "Errrrrrroooooorrrrrrrrrrr";
      return;
    };
    console.log("ok")
    window.location.href = pageUrl;
  }
  
async function addComment(data) {
    let token = localStorage.getItem("token");
    return await fetch(`${api_url}/comments/${id}`, {
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



function logout(){
  localStorage.removeItem('token');
  window.location.href = pageUrlHome;
};