const jarvis = {

    CAROUSEL_SIZE: 11,



    standby() {
        this.loading_photos()
    },

    create_photo(where, className, folder, no) {
        
        images = document.getElementById(`${ where }`)

        photo = document.createElement("img")

        photo.className = className

        photo.src = `/Images/${folder}/${no}.jpg`

        photo.alt = `photo ${no}`

        images.appendChild(photo)

        return photo

    },

    loading_photos() {

        for (let index = 1; index <= this.CAROUSEL_SIZE; index++) {
            this.create_photo("images","img_carousel","Carousel",index)
        }
    }
}


jarvis.standby()