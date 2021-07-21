"use strict"
let api_url = 'https://simple-twitter-new.herokuapp.com/api';
var tagTemp =document.getElementById("tag_temp"); 
var cont = document.querySelector("#cont");

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
  
    let tags = await tendingTags();
    if(tags.error)return error;
    appendRes(tags.tags)
    console.log(tags);
}

async function tendingTags() {
    const res = await fetch(`${api_url}/trending/`, {
    });
    return await res.json();
}


function logout(){
    localStorage.removeItem('token');
    window.location.href = pageUrlHome;
};


function appendRes(data){
    cont.innerHTML = "";
    for(let i = 0; i < data.length; i++){
      addContent(data[i]);
    };
}

function addContent(data){
    let clone = tagTemp.content.cloneNode(true);
    let tag = clone.querySelector(".tag");
    let numPosts = clone.querySelector(".num_of_posts");
    tag.innerText = data.tag_value;
    numPosts.innerText =`Number of posts for this tag: ${data.count}`;
    cont.appendChild(clone);
};
