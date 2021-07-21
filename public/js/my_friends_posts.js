"use strict"
let api_url = '/api';
let aPStatus = document.getElementById("add-post-status");
const formAddPast = document.getElementById("add_post");
let pageUrl = "http://localhost:4000/html/my_posts.html";
let pageUrlComments = "http://localhost:4000/html/comment.html";
let pageUrlUpdate = "http://localhost:4000/html/update_post.html";
let posts = {};

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

    posts = await feshFriendsPosts();
    var postTemp =document.getElementById("post_temp"); 
    console.log(posts);
    if(posts.error)console.log(posts.error);
    for(let i = posts.output.posts.length -1; i >= 0; i--){
      var cont = document.querySelector("#cont");
      let clone = postTemp.content.cloneNode(true);
      let text = clone.querySelector(".text");
      let username = clone.querySelector(".username");
      let like =  clone.querySelector(".like");
      let comments =  clone.querySelector(".comments");
      let disLike =  clone.querySelector(".dislike");
      let countLike = 0; 
      let countDisLike = 0; 
      for(let j = 0; j <  posts.output[posts.output.posts[i].id][1].length; j++){
        if( posts.output[posts.output.posts[i].id][1][j].user_id == posts.output.posts[0].user_id &&  posts.output[posts.output.posts[i].id][1][j].value == 1){
          like.style.backgroundColor = "red";
        }else if ( posts.output[posts.output.posts[i].id][1][j].user_id == posts.output.posts[0].user_id){
          disLike.style.backgroundColor = "red";
        }

        if(posts.output[posts.output.posts[i].id][1][j].value == 1){
          countLike ++;
        }else{
          countDisLike++;
        }
      }

      like.id = `like_${posts.output.posts[i].id}`;
      like.value = `${countLike} Likes`
      disLike.value = `${countDisLike} Dislikes`

      like.addEventListener("click", async function(e) {
        e.preventDefault();
        let id = this.id.split("_")[1];
        let dilikeEle = document.getElementById(`dislike_${id}`);
        let value = this.value.split(" ");
        if(this.style.backgroundColor != "red" && dilikeEle.style.backgroundColor != "red"){
          // add like
          let res = await addLike(id,1);
          this.value = `${Number(value[0]) +1} Likes`
          this.style.backgroundColor = "red";
        }else if (this.style.backgroundColor == "red" && dilikeEle.style.backgroundColor != "red"){
          //delete like
          let res = await deleteLike(id);
          this.value = `${Number(value[0]) - 1} Likes`
          this.style.backgroundColor = "#5293b7";
        }else if(dilikeEle.style.backgroundColor == "red"){
          //update like 
          let res = await updateLike(id,1);
          this.value = `${Number(value[0]) +1} Likes`
          this.style.backgroundColor = "red";
          disLike.value = `${Number(disLike.value.split(" ")[0]) - 1} DisLikes`
          disLike.style.backgroundColor = "#5293b7";
        }
      });
      comments.id = posts.output.posts[i].id;
      comments.value = `${posts.output[posts.output.posts[i].id][0].length} Comments`
      comments.addEventListener("click", function(e) {
        localStorage.setItem("post_id",this.id);
        window.location.href = pageUrlComments;
      });

      disLike.id = `dislike_${posts.output.posts[i].id}`;
      disLike.addEventListener("click",async function(e) {
        let id = this.id.split("_")[1];
        let like = document.getElementById(`like_${id}`);
        let value = this.value.split(" ");

        if(this.style.backgroundColor != "red" && like.style.backgroundColor != "red"){
          // add like
          let res = await addLike(id,0);
          console.log(value[0]);
          this.style.backgroundColor = "red";
          this.value = `${Number(value[0]) +1} Dislikes`

        }else if (this.style.backgroundColor == "red" && like.style.backgroundColor != "red"){
          //delete like
          let res = await deleteLike(id);
          this.value = `${Number(value[0]) - 1} Dislikes`
          this.style.backgroundColor = "#5293b7";
          console.log(res);
        }else if(like.style.backgroundColor == "red"){
          //update like 
          let res = await updateLike(id,0);
          this.value = `${Number(value[0]) + 1} Dislikes`
          this.style.backgroundColor = "red";
          like.value = `${Number(like.value.split(" ")[0]) - 1} Likes`
          like.style.backgroundColor = "#5293b7";
        }
      });

      text.textContent = posts.output.posts[i].text;
      username.textContent = posts.output.posts[i].username;
      cont.appendChild(clone);
    }   
    
};

async function feshFriendsPosts() {
    let token = localStorage.getItem("token");
    const res = await fetch(`${api_url}/posts/my_friends_posts`, {
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

async function addLike(id,value) {
  let token = localStorage.getItem("token");
  let res = await fetch(`${api_url}/likes/${id}`, {
    method: 'Post',
    credentials:'include',
    cache:'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({value:value})
  });
  return await res.json();
}

async function deleteLike(id) {
  let token = localStorage.getItem("token");
  let res = await fetch(`${api_url}/likes/${id}`, {
    method: 'Delete',
    credentials:'include',
    cache:'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });
  return await res.json();
}

async function updateLike(id,value) {
  let token = localStorage.getItem("token");
  let res = await fetch(`${api_url}/likes/${id}`, {
    method: 'Put',
    credentials:'include',
    cache:'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({value:value})
  });
  return await res.json();
}