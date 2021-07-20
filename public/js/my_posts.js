"use strict"
let api_url = '/api';
let aPStatus = document.getElementById("add-post-status");
const formAddPast = document.getElementById("add_post");
let pageUrl = "http://localhost:4000/html/my_posts.html";

window.onload = async function(){
    const posts = await feshMyPosts();
    var postTemp =document.getElementById("post_temp"); 
    for(let i = posts.posts.length -1; i >= 0 ; i--){
      console.log(posts.posts[i].id);
      var cont = document.querySelector("#cont");
      let clone = postTemp.content.cloneNode(true);
      let text = clone.querySelector(".text");
      let username = clone.querySelector(".username");
      let like =  clone.querySelector(".like");
      let comments =  clone.querySelector(".comments");
      let disLike =  clone.querySelector(".dislike");
      let update = clone.querySelector(".update_p");

      like.id = posts.posts[i].id;
      like.addEventListener("click", function(e) {
        console.log(this.id);
      });

      comments.id = posts.posts[i].id;
      comments.addEventListener("click", function(e) {
        console.log(this.id);
      });

      disLike.id = posts.posts[i].id;
      disLike.addEventListener("click", function(e) {
        console.log(this.id);
      });

      update.id = posts.posts[i].id;
      update.addEventListener("click", function(e) {
        console.log(this.id);
      });

      text.textContent = posts.posts[i].text;
      username.textContent = posts.posts[i].username;
      cont.appendChild(clone);
    }   
    
};


async function feshMyPosts() {
    let token = localStorage.getItem("token");
    const res = await fetch(`${api_url}/posts/my_posts`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return await res.json();
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