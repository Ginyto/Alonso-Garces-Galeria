const jarvis = {

    CAROUSEL_SIZE: 11,

    count: 1,

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

        //this.carousel()
        
        console.log("link out")

    },

    carousel() {
        images = document.getElementById("images")

        images.setAttribute("animation-duration", "35s")
        

    },



    slide(dir) {


        photo = document.getElementById(`photo${this.count}`)

        photo_width = photo.getBoundingClientRect().width

        
        photo.style = "transition: all 5s ease;"


        console.log(photo)

        if (dir === "right") {
            
            photo.style.transform = `translateX(-${photo_width}px)`//met la photo en dernier
            
            for (let index = 2; index <= 11; index++) {
                next = document.getElementById(`photo${index}`)
                next.style = "transition: all 5s ease;"
                next.style.transform = `translateX(-${photo_width}px)`
            }

            this.count++
        }


        else if (this.count == this.CAROUSEL_SIZE-1) {
            this.count = 1
        }

        else if (dir === "left") {
            //photo.style.transform = `translateX(0)`
            next.style.transform = `translateX(${photo_width})`

        }

        console.log(this.count)

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
        
        images = document.getElementById(`${ where }`)

        photo = document.createElement("img")

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