
const socket = io();
console.log("Script is running");
window.onload = function() {
    let username = window.localStorage.getItem('username');
    let userid = window.localStorage.getItem('UniqueID');
    let secret = window.localStorage.getItem('secret');
    if (username)  {
      // console.log(username);
    //     // var redirect = '/chat/'+UniqueID+'/'+username;
        window.location.href = "/chat/"+userid+"/"+username; // Redirect to enter.html if local storage has username
        // window.location.href = '/redirecter'; // Redirect to enter.html if local storage has username
    }
    
    if (localStorage) {

// Add an event listener for form submissions
  document.getElementById('formms').addEventListener('submit', function() {
// Get the value of the name field.
  let name = document.getElementById('name').value.trim();
// Save the name in localStorage.
    // console.log(name);
    let Uniquer = '<%= Unique %>';
    let secretkey = Math.floor(Math.random() * 1000000);

  localStorage.setItem('username', name);
  localStorage.setItem('secret', secretkey);
  localStorage.setItem('UniqueID', Uniquer);
    socket.emit('makeid',name,secretkey,Uniquer);
});


} 
}