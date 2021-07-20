"use strict"
let api_url = '/api';
var id = localStorage.getItem("post_id");
const formUpdatePost = document.getElementById("update_post");
let aPStatus = document.getElementById("update-post-status");
let pageUrl = "http://localhost:4000/html/my_posts.html";

window.onload = async function(){
    let post = await feshPost();
    if(post.error)console.log(post.error);
    postData(post.post[0].text);
};

function postData(data){
  document.getElementById("add_post_input").value = data;

    // document.getElementById("username_post").textContent = data.username; 
    // document.getElementById("text_post").textContent = data.text;
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