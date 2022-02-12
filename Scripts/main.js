const jarvis = {

    CAROUSEL_SIZE: 11,

    hello_there() {
        console.log("Hello there")
        alert("hello_there")
    },


    /**
     * Fonction qui lance les autres fonctions
     */
    standby() {

        console.log("link start")

        this.loading_photos()

        this.carousel(6)

        this.hamburger()
        
        console.log("link out")

    },

    hamburger() {
        const burger_zone = document.querySelector('.burger_zone')

        burger_zone.addEventListener('click', () => {
            console.log("he touche me")
        })

    },


    /**
     * Slide la photo vers la droite
     * @param {*} no numero de la photo
     * @param {*} tour numero du tour de boucle
     */
    slide(no,tour) {


        const photo = document.getElementById(`photo${no}`)

        //console.log(photo)

        photo_width = photo.getBoundingClientRect().width

        photo.style = "transition: all 5s ease;"
        
        photo.style.transform = `translateX(-${photo_width*tour}px)`

        

    },


    /**
     * Fais slider tout le carousel
     */
    superslides() {

        for (let index = 1; index <= jarvis.CAROUSEL_SIZE; index++) {
            this.slide(index,selcoura)
        }

    },
    


    /**
     * Gere le carousel à interval de seconde défini
     */
    carousel(sec) {
        console.log("Début du carousel")
        selcoura = 1
        setInterval(this.setcarousel,sec*1000)
    },



    /**
     * Gere le timer du carousel
     */
    setcarousel() {

        console.log(selcoura)

        jarvis.superslides()

        if (selcoura < jarvis.CAROUSEL_SIZE - 1){
            selcoura++
        }
        else {
            selcoura = 0
        }

    },


    /**
     * Creer l'element img et les inject dans le parent
     * @param {*} where parent
     * @param {*} className nom de la className
     * @param {*} folder Nom du dossier des photo 
     * @param {*} no Numero des photo
     * @returns la photo créer
     */
    create_photo(where, className, folder, no) {
        
        const images = document.getElementById(`${ where }`)

        const photo = document.createElement("img")

        photo.className = className

        photo.id = `photo${no}`

        photo.src = `/Images/${folder}/${no}.jpg`

        photo.alt = `photo ${no}`

        images.appendChild(photo)

        return photo

    },


    /**
     * Charge toutes les photos du carousel
     */
    loading_photos() {

        for (let index = 1; index <= this.CAROUSEL_SIZE; index++) {
            this.create_photo("images","img_carousel","Carousel",index)
        }
    }
}


jarvis.standby()