const jarvis = {

    CAROUSEL_SIZE: 11,
    ARTISTAS_SIZE: 11,
    nbr_capsule: 0,


    hello_there() {
        console.log("Hello there")
        console.log(this.data)
    },




    /**
     * Gerer et lance les fonction en standby en fonction de la page
     * @param {*} no_page Numero de la page
     */
    standby(no_page) {

        //console.log("link start")

        this.hamburger()

        if (no_page == 0) {
            //console.log("Bienvenido")
            this.loadjson(0)

            this.loading_photos("images","img_carousel","carousel", this.CAROUSEL_SIZE)
            this.carousel(10)
        }

        if (no_page == 1) {
            this.loadjson(1)

            this.loading_photos("images","img_carousel","carousel", this.CAROUSEL_SIZE)
            this.carousel(10)
        }

        else if (no_page == 2) {
            console.log("Artistas")
            this.loading_photos("artist_box","artists","carousel", this.ARTISTAS_SIZE)
        }


        
        //console.log("link out")

    },




    /**
     * Charge le JSON file et en permet l'utilisation, permet de lancer les differentes fonction qui en depende
     */
    loadjson(no_page) {
        fetch("database.json")
            .then(reponse => reponse.json())
            .then(data => {
                //zone de lancement des fonction dependente de JSON
                const base = data
                // console.log(base)

                //console.log(base.expo.amazonia.src.length)
                
                this.write("map", base.sys.footer.map)

                if (no_page == 0) {
                    
                }

                else if (no_page == 1) {

                    this.create_capsule("expo_zone", "cap0", 2)

                    this.write("date_titre", base.expo.amazonia.titre)
        
                    this.picture("0", base.expo.amazonia.src[0])

                    this.picture("1", base.expo.amazonia.src[1])

                    this.write_article("article_expo", base.expo.amazonia.article)
                }

                else if (no_page == 2) {
                    
                }


            })
    },



    /**
     * Creation de capsule composer d'un titre une date des photos et de l'article qu'on vient injecter dans la zone parent
     * @param {*} parent zone d'injection
     * @param {*} id_capsule id de la capsule
     * @param {*} nbr_photos nombre de photos a injecte
     */
    create_capsule(parent, id_capsule, nbr_photos) {

        //squelette capsule

        const zone = this.ciblage(parent)


        const capsule = document.createElement('div')

        capsule.id = id_capsule

        this.nbr_capsule++
        

        capsule.className = "capsule"

        capsule.onclick = function () { jarvis.reading_capsule(id_capsule) }

        zone.appendChild(capsule)

    
        //insertion image

        const img = document.createElement('div')

        img.className = "expo_img"


        for (let index = 0; index < nbr_photos; index++) {

            const photo = document.createElement('img')

            if (index === 0) {
                photo.className = "img_expo"
            }

            else {
                photo.className = "imgs"
            }

            photo.id = index

            img.appendChild(photo)

        }

        capsule.appendChild(img)


        //insertion titre

        const zone_titre = document.createElement('div')

        zone_titre.className = "expo_titre"

        const date = document.createElement('h2')

        date.className = "date_titre"

        const titre = document.createElement('h2')

        titre.className = "capsule_titre"

        zone_titre.appendChild(date)

        zone_titre.appendChild(titre)

        capsule.appendChild(zone_titre)


        //insertion article

        const zone_article = document.createElement("div")

        zone_article.className = "expo_article"

        const article = document.createElement('p')

        article.className = "article_expo"

        zone_article.appendChild(article)

        capsule.appendChild(zone_article)






    },


    /**
     * Renvoie le l'objet html ciblé
     * @param {*} target nom de la cible
     * @returns objet hmtl
     */
    ciblage(target) {

        const id = document.getElementById(target)

        // const test = document.getElementsByClassName("ubi").item(0)

        // console.log("->",test)

        //console.log("id ->", id)

        const classname = document.getElementsByClassName(target).item(0)

        //console.log("classname ->", classname)

        if (id != null) {
            console.log(id)
            return id
        }

        else if (classname != null) {

            return classname
            
        }

        else {
            console.log("erreur l'élément n'existe pas")
        }
    },


    /**
     * permet l'insertion d'une image selon la cible hmtl
     * @param {*} target cible html
     * @param {*} src path de la photo a inserer
     */
    picture(target, src) {
        pic = this.ciblage(target)
        pic.src = src
    },


    /**
     * Permet de cibler un element html et d'écrire dedans
     * @param {*} target cible html
     * @param {*} text texte à unjecté
     */
    write(target, text) {

        const cible = this.ciblage(target)

        //console.log(cible)

        try {
            cible.innerHTML += text
        } catch (error) {
            console("injection du texte à la cible html echoué", error)
        }

        //console.log(cible)
    },
    

    /**
     * permet l'ecriture de plusieur ligne loading d'un JSON dans une cible hmtl
     * @param {*} target cible html
     * @param {*} tab tableau
     */
    write_article(target,tab) {
        for (let index = 0; index < tab.length; index++) {
            const element = tab[index]
            this.write(target,element)
        }
    },



    /**
     *  Gere la lecture des capsule
     * @param {*} id_cap numero de la capsule
     */

    reading_capsule(id_cap) {
        console.log("reading_capsule")

        const capsule = document.querySelector(`#${id_cap}`)

        const image = capsule.children.item(0)

        const titre = capsule.children.item(1)

        const article = capsule.children.item(2)

        
        // console.log(image)

        // console.log(titre)

        // console.log(article)

        

        capsule.classList.toggle("capsule")
        capsule.classList.toggle("capsule_active")
    
        article.classList.toggle("expo_article_active")

        image.children.item(1).classList.toggle("img_expo")
    
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

        //console.log(logo)

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
            //console.log("he touche me")
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
        //console.log("Début du carousel")
        selcoura = 1
        setInterval(this.setcarousel,sec*1000)
    },



    /**
     * Gere le timer du carousel
     */
    setcarousel() {

        //console.log(selcoura)

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

        //console.log(parent)
        
        const images = document.getElementById(`${parent}`)
        
        //console.log(images)

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
