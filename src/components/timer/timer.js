let game = {
    config:{
        remainTime:5*60 //5min de juego = 5x60seg
    },
    util: {
        getHHMMSSFromSeconds: function(seconds, renderHours){
			const hours = Math.floor(seconds / 3600);
			const minutes = Math.floor((seconds % 3600) / 60);
			const remainingSeconds = seconds % 60;

			const timeFormat = [];
            if(renderHours)
                timeFormat.push(String(hours).padStart(2, '0'));
            timeFormat.push(String(minutes).padStart(2, '0'));
            timeFormat.push(String(remainingSeconds).padStart(2, '0'));

			return timeFormat.join(':');
        }
    },
    remainingTime: 0,
    setRemainingTime: function(){
        this.remainingTime = this.config.remainTime;
    },
    intervalId: null,
    
    startCountdown: function(){
        document.getElementById("countDown").classList.remove("criticalTime")
        this.setRemainingTime();
        let _this = this;
        this.intervalId = setInterval(() => {
            _this.remainingTime--;
            if (_this.remainingTime===0)
                _this.clearPlayedGameInterval();
            else if(_this.remainingTime <= 5){
                //Añadir efecto crítico te quedas sin tiempo y vas a perder.
                document.getElementById("countDown").setAttribute("class", "criticalTime")
            }
            //En todos los casos debemos renderizar el tiempo de juego restante
            _this.renderRemainingTime();

        },1000);
    },

    clearPlayedGameInterval: function(){
        clearInterval(this.intervalId)
    },
    
    getFormatedElapsedTime: function(){

    },
    renderRemainingTime: function(){
        let result = game.util.getHHMMSSFromSeconds(this.remainingTime);
        document.getElementById("countDown").innerHTML = result;
        
    }
}