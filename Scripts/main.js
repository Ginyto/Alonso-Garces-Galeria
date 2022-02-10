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
        
        console.log("link out")

    },


    slide(dir) {

        photo = document.getElementById(`photo${1}`)

        photo_width = photo.getBoundingClientRect().width

        next = document.getElementById(`photo${2}`)

        console.log(photo)

        if (dir === "right") {
            photo.style.transform = `translateX(-${photo_width}px)`
            next.style.transform = `translateX(-${photo_width}px)`
        }
        else if (dir === "left") {
            photo.style.transform = `translateX(${0}px)`
            next.style.transform = `translateX(${0}px)`
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