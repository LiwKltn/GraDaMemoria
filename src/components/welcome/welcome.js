let welcomeMessage = {
    setUserName: function(userName) {
        this.userFullName = userName;
        document.getElementById("welcomeMessage").innerHTML= `Hola ${userName}`;
        localStorage.setItem("gameUserName", userName);
    },
    
    getUserName: function(){
        return localStorage.getItem("gameUserName");
    }
}