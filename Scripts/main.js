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

        console.log(photo)

        photo_width = photo.getBoundingClientRect().width

        photo.style = "transition: all 5s ease;"



        if (dir === "right") {
            
            photo.style.transform = `translateX(-${photo_width}px)`
            
            for (let index = 2; index <= 11; index++) {
                next = document.getElementById(`photo${index}`)
                next.style = "transition: all 5s ease;"
                next.style.transform = `translateX(-${photo_width}px)`
            }

            setTimeout(() => {
                photo.style = "transition: all 1s ease;"
                photo.style.transform = `translateX(${photo_width*10}px)`
            }, 4999);


        }

        else if (dir === "left") {
            photo.style.transform = `translateX(${0}px)`
            next.style.transform = `translateX(${0}px)`

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