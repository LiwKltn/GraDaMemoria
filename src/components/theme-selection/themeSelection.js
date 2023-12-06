let game = {
    config:{
        theme:""
    },
    setTheme: function(theme){
        this.config.theme = theme;
        localStorage.setItem("gameTheme",theme);
    },
    getTheme: function(){
        return this.config.theme;
    }
}
radioButtons = document.querySelectorAll("input[name='answerTheme']");
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function() {
        game.setTheme(this.value);
    });
});
