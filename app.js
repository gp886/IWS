var provider = new firebase.auth.GoogleAuthProvider();
var user;

//signIn function
function signIn() {
    // console.log("Hello");
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        console.log(user.displayName);
        window.location.href = "https://gp886.github.io/IWS/home.html";

        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function loadJSON(file, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
var ref = firebase.database().ref();
var data_ref = firebase.database().ref().child("articles");
var i=0;

loadJSON("delhi.json", function (response) {
    var actual_JSON = JSON.parse(response);
   console.log("actual_JSON : "+actual_JSON.length);

   for(var i=0;i<actual_JSON.length;i++){
    //    console.log(actual_JSON[i].description);
    //    console.log(actual_JSON[i].title);

       ref.child("articles").push().set({
           title : actual_JSON[i].title,
           description : actual_JSON[i].description
       });
       console.log("DONE");
   }
});




console.log("hello");


data_ref.on("child_changed", snap => {

    // Iterate over all records in DB and take the snapshot
    var mStore = snap.val();
    console.log(mStore);
    $('#header').append("<h4 align='left'><a href="+mStore.url+">"+mStore.title +"</a></h4>");
    $('#body').append("<article>"+mStore.description+"</article>");

    
});