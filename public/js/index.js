"use strict"

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