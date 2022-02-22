const jarvis = {

    CAROUSEL_SIZE: 11,
    ARTISTAS_SIZE: 11,

    hello_there() {
        console.log("Hello there")
        alert("hello_there")
    },



    /**
     * Gerer et lance les fonction en standby en fonction de la page
     * @param {*} no_page Numero de la page
     */
    standby(no_page) {

        console.log("link start")

        if (no_page == 0) {
            console.log("Bienvenido")
            this.loading_photos("images","img_carousel","carousel", this.CAROUSEL_SIZE)
            this.carousel(15)
        }

        if (no_page == 1) {

        }

        else if (no_page == 2) {
            console.log("Artistas")
            this.loading_photos("artist_box","artists","carousel", this.ARTISTAS_SIZE)
        }

        this.hamburger()
        
        console.log("link out")

    },


    reading_capsule(id_cap, id_art, id_expo) {
        console.log("reading_capsule")

        const capsule = document.querySelector(`#${id_cap}`)

        const article = document.querySelector(`#${id_art}`)

        const expo_parent = document.querySelector(`#${id_expo}`)


        console.log(expo_parent)

        

        capsule.classList.toggle("capsule")
        capsule.classList.toggle("capsule_active")
    
        article.classList.toggle("expo_article_active")
        
        expo_parent.children.item(1).classList.toggle("img_expo_plus_active")
    
    },
    

    /**
     * Permet la navigation dans le site
     * @param {*} param numero du site
     */
    pathfinder(param) {

        if (param == 0) {
            document.location.pathname = "home.html";
        }

        if (param == 1) {
            document.location.pathname = "exposiciones.html";
        }

        if (param == 2) {
                document.location.pathname = "artistas.html";
        }
        
        if (param == 3) {
            document.location.pathname = "Gestionnaire.html";
        }

        if (param == 4) {
                document.location.pathname = "Pomodoro.html";
        }

        if (param == 5) {
                document.location.pathname = "About.html";
        }

    },


    /**
     * Ajout du dark mode
     */
    dark_mode() {
        const page = document.querySelector('*')
        const hamburger = document.querySelector('.hamburger')
        const burger_zone = document.querySelector('.burger_zone')
        const logo = document.querySelector(".logo")
        const sol = document.querySelector(".sol")


        page.classList.toggle("dark_mode")
        hamburger.classList.toggle('hamburger_dark')
        burger_zone.classList.toggle("burger_zone_dark")

        console.log(logo)

        if (logo.alt == "El logo de la galeria blanco") {
            console.log("el logo es blanco")
            logo.alt = "El logo de la galeria negro"
            logo.src = "Images/Logos/clear_white.png"
            sol.src = "Images/Icones/soleil_white.png"
            console.log("el logo es negro")
        }

        else{
            console.log("el logo es negro")
            logo.alt = "El logo de la galeria blanco"
            logo.src = "Images/Logos/clear_black.png"
            sol.src = "Images/Icones/soleil_black.png"
            console.log("el logo es blanco")
        }

        
        
    
    },


    /**
     * Gestion du menu en mode hamburger
     */
    hamburger() {
        const burger_zone = document.querySelector('.burger_zone')
        const ham = document.querySelector('#ham')
        const burger = document.querySelector('#burger')

        const menu_deroulant = document.querySelector('.menu_deroulant')



        burger_zone.addEventListener('click', () => {
            console.log("he touche me")
            ham.classList.toggle('ham_active')
            burger.classList.toggle('burger_active')
            menu_deroulant.classList.toggle('menu_deroulant_active')

            //this.dark_mode()
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

        photo.style = "transition: all 10s ease;"
        
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
     * @param {*} parent parent
     * @param {*} className nom de la className
     * @param {*} folder Nom du dossier des photo 
     * @param {*} no Numero des photo
     * @returns la photo créer
     */
    create_photo(parent, className, folder, no) {

        console.log(parent)
        
        const images = document.getElementById(`${parent}`)
        
        console.log(images)

        const photo = document.createElement("img")

        photo.className = className

        photo.id = `photo${no}`

        photo.src = `Images/${folder}/${no}.jpg`

        photo.alt = `photo ${no}`

        images.appendChild(photo)

        return photo

    },


    
    loading_photos(parent,id,src, size){

        for (let index = 1; index <= size; index++) {
            this.create_photo(parent,id,src,index)
        }
    }
}
