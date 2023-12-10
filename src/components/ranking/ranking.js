let game = {
	score: {
    maxEntries: 3,
    getRankings: function () {
      let highRankings = localStorage.getItem('highRankings');

      // Parseamos la cadena JSON a un objeto o inicializar un array vacío si no hay datos
      return highRankings ? JSON.parse(highRankings) : [];
    },
    //Con esta función añadimos una nueva entrada de puntos
    addNewRanking: function (scoreData) {
        /*Tener en cuenta que solo se pueden registrar hasta 3 entradas, las de > puntuación. Este código permite añadir entradas infinitas*/

      // Obtener la lista de puntuaciones, obtener el ranking
      let highRankings = this.getRankings();

      // Crear un nuevo puntaje con fecha actual y los datos proporcionados
      let newRanking = {
        userName: scoreData.userName,
        date: new Date(),
        points: scoreData.points
      };

      if (this.getLowerPoints() < newRanking.points){
        // Agregar el nuevo puntaje a la lista
        highRankings.push(newRanking);

        // Ordenar la lista de puntuaciones por puntos de forma descendente
        highRankings.sort((a, b) => b.points - a.points);

        // Almacenar la lista actualizada en localStorage
        localStorage.setItem('highRankings', JSON.stringify(highRankings));
      }
    },
    //Devuelve el puntuaje menor añadido al ranking
    getLowerPoints: function(){
      let numRankingEntriesCount = this.getRankings().length;
      if (numRankingEntriesCount < 3)
        return 0;
      else {
        let rankingEntries = this.getRankings();
        rankingEntries.sort((a, b) => b.points - a.points);
        return rankingEntries[2].points;
      }
    },
    renderRanking: function(){
        localStorage.setItem('highRankings', "[]");
        this.addNewRanking({userName: "JuanRa", points:1000});
        this.addNewRanking({userName: "Marta",  points:1950});
        this.addNewRanking({userName: "Julia",  points:1990});
        let rankingEntries = this.getRankings();

        /* TODO: Recorreremos la colección de rankings que tenemos en rankingEntries y
        renderizaremos en el DOM el ranking */
        rankingEntries.sort((a, b) => b.points - a.points);
        
        //Creamos elemento ol
        let ol = document.createElement("ol");
        ol.setAttribute("start", "1")
        ol.setAttribute("class", "listBulletType")

        for (i=0; i < rankingEntries.length; i++){
          let current = rankingEntries[i];

          //Creamos elemento li
          let li = document.createElement("li");

          //Metemos dentro del li (innerHTML). Para ello leeremos del objeto que estamos recorriendo su propiedad userName
          li.setAttribute("class","font-Minnie")
          li.innerHTML = current.userName;

          //Añadimos en ol el li
          ol.appendChild(li);

        }//Fin For

        //Añadimos al objeto del DOM con id=ranking el ol
        document.getElementById("ranking").appendChild(ol);
      }
  }
};