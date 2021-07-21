"use strict"
let api_url = 'https://simple-twitter-new.herokuapp.com/api';

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