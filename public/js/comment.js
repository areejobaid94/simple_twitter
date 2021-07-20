"use strict"
let api_url = '/api';
var id = localStorage.getItem("post_id");
let pageUrl = "http://localhost:4000/html/comments.html";
const formAddComment = document.getElementById("add_comment");
let aPStatus = document.getElementById("add-comment-status");

window.onload = async function(){
    let post = await feshPost();
    console.log(post);
    document.getElementById("username_post").textContent = post.post.username; 
    document.getElementById("text_post").textContent = post.post.text;
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