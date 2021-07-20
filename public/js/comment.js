"use strict"
let api_url = '/api';
var id = localStorage.getItem("post_id");
let pageUrl = "http://localhost:4000/html/comments.html";
const formAddComment = document.getElementById("add_comment");
let aPStatus = document.getElementById("add-comment-status");

window.onload = async function(){
    let post = await feshPost();
    if(post.error)console.log(post.error);
    addPostData(post.post[0])
    addAllComments(post.post)
}

function addPostData(data){
  document.getElementById("username_post").textContent = data.username; 
  document.getElementById("text_post").textContent = data.text;
}

function addAllComments(comments){
  var commentTemp =document.getElementById("comment_temp"); 
  var cont = document.querySelector("#cont");
  for(let i =comments.length -1; i >= 0; i--){
    let clone = commentTemp.content.cloneNode(true);
    let username = clone.querySelector(".comment_username");
    username.textContent = comments[i].username;
    let text = clone.querySelector(".comment_text");
    text.textContent = comments[i].text;
    cont.appendChild(clon);
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