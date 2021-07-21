"use strict"
let formSendEmail = document.getElementById("send_email_form");
let api_url = 'https://simple-twitter-new.herokuapp.com/api';
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
}

formSendEmail.onsubmit = async e => {
    e.preventDefault();
    let res = await sendEmail({ name: formSendEmail.name.value, message: formSendEmail.message.value, subject: formSendEmail.subject.value});
    if(res.error){
       console.log(res.error); 
       return;
    };
    console.log("ok");
}


async function sendEmail(data) {
    return await fetch(`${api_url}/send_email/`, {
      method: 'Post',
      credentials:'include',
      cache:'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
};


function logout(){
    localStorage.removeItem('token');
    window.location.href = pageUrlHome;
};