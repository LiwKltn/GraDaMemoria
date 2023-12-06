let game = {
    config:{
        numPairs:0
    },
    setNumPairs: function(numPairs){
        this.config.numPairs = parseInt(numPairs,10);
        localStorage.setItem("gameNumPairs", parseInt(numPairs,10));
    },
    getNumPairs: function(numPairs){
        return this.config.numPairs;
    }
}
radioButtons = document.querySelectorAll("input[name='answer']");
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function() {
        game.setNumPairs(this.value);
    });
});
