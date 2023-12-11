let game = {
    setUserName: function(userName) {
        this.userFullName = userName;
        console.log(userName);
        document.getElementById("welcomeMessage").innerHTML= `Bienvenido/a ${userName}`;
        localStorage.setItem("gameUserName", userName);
    },
    
    getUserName: function(){
        return localStorage.getItem("gameUserName");
    },

    setUserName: function(userName) {
        this.userFullName = userName;
        document.getElementById("welcomeMessage").innerHTML= `Hola ${userName}`;
        localStorage.setItem("gameUserName", userName);
    },
    
    getUserName: function(){
        return localStorage.getItem("gameUserName");
    },
    config:{
        numPairs:0,
        theme: ""
    },
    setNumPairs: function(numPairs){
        this.config.numPairs = parseInt(numPairs,10);
        localStorage.setItem("gameNumPairs", parseInt(numPairs,10));
    },
    getNumPairs: function(numPairs){
        return this.config.numPairs;
    },
    setTheme: function(theme){
        this.config.theme = theme;
        localStorage.setItem("gameTheme",theme);
    },
    getTheme: function(){
        return this.config.theme;
    }
}
radioButtons = document.querySelectorAll("input[name='answer']");
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function() {
        game.setNumPairs(this.value);
    });
});

radioButtons = document.querySelectorAll("input[name='answerTheme']");
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function() {
        game.setTheme(this.value);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var newGameButton = document.getElementById('go-button');

    newGameButton.addEventListener('click', function () {
        
        window.location.href = '../../pages/game/game.html';
    });
});


