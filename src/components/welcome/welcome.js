let game = {
    userFullName: "",
    setUserName: function(userName) {
        this.userFullName = userName;
        document.getElementById("welcomeMessage").innerHTML= `Hola ${userName}`;
    },
    
    getUserName: function(){
        return this.userFullName;
    }
}