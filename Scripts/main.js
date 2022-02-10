const jarvis = {

    pathfinder(param) {
        if (param == 0) {
            document.location.pathname = "/Pages/Landing.html";
        }

        if (param == 1) {
            document.location.pathname = "/Pages/Flashcards.html";
        }

        if (param == 2) {
                document.location.pathname = "/Pages/Addcarte.html";
        }
        
        if (param == 3) {
            document.location.pathname = "/Pages/Gestionnaire.html";
        }

        if (param == 4) {
                document.location.pathname = "/Pages/Pomodoro.html";
        }

        if (param == 5) {
                document.location.pathname = "/Pages/About.html";
            }

    },


    image_scroll() {
        
    },

    test() {
        alert("test validé")
        console.log(document.getElementById(""))
    }
}

