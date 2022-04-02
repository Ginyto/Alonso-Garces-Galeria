const jarvis = {

    hello_there() {
        console.log("Hello there")
    },

    


    /**
     * Gerer et lance les fonction en standby en fonction de la page
     * @param {*} no_page Numero de la page
     */
    standby(no_page) {

        //console.log("link start")


        this.hamburger()

        

        if (localStorage.getItem('dark_mode') === 'on') {
            this.dark_mode()
        }

        if (no_page === 0) {
            //console.log("Bienvenido")
            this.loadjson(0)

        }


        else if (no_page === 1) {
            this.loadjson(1)
        }


        else if (no_page === 2) {
            this.loadjson(2)

        }

        //console.log("link out")

    },


    setup_carousel(parent, id, source, size, seconde) {

        this.loading_photos(parent, id, source, size)
        this.carousel(seconde, size)

        //console.log("setup carousel")
        
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

                const key = Object.keys(base)

                const objet = Object.values(base)

                const titre = Object.keys(objet[1])

                const exposiciones = Object.values(objet[1])

                //console.log(titre)


                //console.log(base.expo.amazonia.src.length)
                
                
                if (this.ciblage("map").innerHTML.length === 0) {

                    this.write(this.ciblage("map"), base.sys.footer.map)
                    this.write(this.ciblage("mailpro"), base.sys.mail)
                    this.write_email(this.ciblage("mailpro"), base.sys.mail)
                    this.write_email(document.getElementsByClassName('mailpro').item(1), base.sys.mail)
                    this.write(this.ciblage("protection"), base.sys.copyright)
                }

                
                if (no_page === 0) {
                    
                    this.write(this.ciblage("titre_carousel"), titre[0])

                    this.setup_carousel("images", "img_carousel", exposiciones[0].src, exposiciones[0].src.length, 11)

                    this.loading_capsule("expo_zone", base.expo, 0, "cap", 1, 2)
                }

                else if (no_page === 1) {

                    this.loading_capsule("expo_zone", base.expo, 0, "cap", 1, 0)

                }

                else if (no_page === 2) {

                    this.loading_capsule("artiste_zone", base.artista, 1, "art", 0,0)
                }

            })
    },




    /**
     *  charge toutes les capsules et les remplies avec les infos stocker dans le fichier json
     * @param {*} base fichier json
     */
    loading_capsule(zone, base, no, type,min, max) {

        const tab = Object.keys(base)

        if (max === 0) {
            max = tab.length
        }
        
        for (let index = min; index < max; index++) {
            const element = tab[index];

            const id = `${type}${index}`

            //console.log(id)
            
            this.create_capsule(zone, id, base[element].src.length)

            this.fill_capsule(id, base, index, no)

            
            
        }

    },



    /**
     * Rempli les capsules en fonction du json
     * @param {*} target cible html
     * @param {*} base fichier json
     * @param {*} no_expo numero de l'exposition ranger dans le json
     * @param {*} no permet de differencier si c'est un artiste ou une expo
     */
    fill_capsule(target, base, no_expo, no) {

        const capsule = this.ciblage(target)

        const key = Object.keys(base)

        const objet = Object.values(base)

        //console.log(objet)

        const sub_objet = Object.values(objet[no_expo])

        const article = sub_objet[0]

        const sources = sub_objet[1]

        const references = sub_objet[2]

        const dates = sub_objet[3]

        const ciblage_titre = capsule.children.item(1).children.item(0)

        const ciblage_article = capsule.children.item(2).children.item(0)

        //console.log(sub_objet[1])

        //console.log(sub_objet[0])

        // console.log(jkey[no_expo])

        // console.log(capsule.children.item(0).children.length)

        this.write(ciblage_titre, key[no_expo])

        for (let index = 0; index < capsule.children.item(0).children.length; index++) {

            const element = capsule.children.item(0).children.item(index);
            this.picture(element, sources[index])

        }



        if (no === 0) {

            try {
                this.write_article(ciblage_article, article)
            
            } catch (error) {

                console.log("error cette capsule n'as pas d'article", error)
            }

            try {
                if (references.length > 0) {


                    for (let index = 0; index < references.length; index++) {

                        const element = references[index];
                        
                            
                        if (index % 2 === 0) {
                            const ref = document.createElement('a')

                            //console.log(element)
                            ref.innerHTML = element

                            ref.className = "mailpro"

                            ref.target = "_blank"

                            try {
                                ref.href = references[index + 1]
                                //console.log(references[index + 1])

                            } catch (error) {}
                            
                            capsule.children.item(2).children.item(0).appendChild(ref)

                        }
                        
                    }

                }
    
            } catch (error) {
                console.log("il n'y a pas de references -> "+error)
            }

            this.write(ciblage_article, "<br/><br/>" + dates)

        }

        else if (no === 1) {
            const info = Object.values(article)
            //console.log(info)

            for (let index = 0; index < info.length - 1; index++) {
                const element = info[index];

                const titre = Object.keys(article)

                //console.log(titre[index])

                const artitre = document.createElement('div')

                artitre.className = "artitre"

                artitre.innerHTML = titre[index] + "<br/>"

                capsule.children.item(2).children.item(0).appendChild(artitre)
                
                const sub_info = Object.entries(element)

                //console.log(sub_info)

                for (let index = 0; index < sub_info.length; index++) {
                    const element = sub_info[index];

                    this.write(capsule.children.item(2).children.item(0), element + "<br/>" + "<br/>")
                    
                    
                }
                this.write(capsule.children.item(2).children.item(0), "<br/>" + "<br/>" + "<br/>")
            }



        }


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


        capsule.className = "capsule"

        capsule.onclick = function () { jarvis.reading_capsule(id_capsule) }

        zone.appendChild(capsule)

    
        //insertion image

        const img = document.createElement('div')

        img.className = "expo_img"


        for (let index = 0; index < nbr_photos; index++) {

            const photo = document.createElement('img')

            photo.id = index

            photo.className = "peinture"

            img.appendChild(photo)

            if (index > 0) {
                photo.classList.toggle("none")
            }

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
            //console.log(id)
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
     * @param {*} cible cible html
     * @param {*} src path de la photo a inserer
     */
    picture(cible, src) {
        cible.src = src
    },



    /**
     * Permet de cibler un element html et d'écrire dedans
     * @param {*} cible cible html
     * @param {*} text texte à unjecté
     */
    write(cible, text) {

        //console.log(cible)

        try {
            cible.innerHTML += text
        } catch (error) {
            console("injection du texte à la cible html echoué", error)
        }

        //console.log(cible)
    },

    write_email(cible, text) {

        //console.log(cible)

        try {
            cible.href += 'mailto:'+text
        } catch (error) {
            console("injection du texte à la cible html echoué", error)
        }

        //console.log(cible)
    },



    /**
     * permet l'ecriture de plusieur ligne loading d'un JSON dans une cible hmtl
     * @param {*} cible cible html
     * @param {*} tab tableau
     */
    write_article(cible,tab) {
        for (let index = 0; index < tab.length; index++) {
            const element = tab[index]
            this.write(cible,element)
        }
    },




    /**
     *  Gere la lecture des capsule
     * @param {*} id_cap numero de la capsule
     */

    reading_capsule(id_cap) {
        //console.log("reading_capsule")

        const capsule = document.querySelector(`#${id_cap}`)

        const image = capsule.children.item(0)

        const titre = capsule.children.item(1)

        const article = capsule.children.item(2)

        
        // console.log(image)

        // console.log(titre)

        // console.log(article)

        // capsule.classList.toggle("capsule")
        capsule.classList.toggle("capsule_active")
    
        article.classList.toggle("expo_article_active")

        for (let index = 1; index < image.children.length; index++) {
            image.children.item(index).classList.toggle("none")
        }

    
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
                document.location.pathname = "informacion.html";
        }

    },



    /**
     * Lance le mode sombre
     */
    dark_mode_on() {
        this.dark_mode()

        if (localStorage.getItem("dark_mode") === "on") {
            localStorage.setItem("dark_mode", "off")
        }
        else {
            localStorage.setItem("dark_mode", "on")
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
            //console.log("el logo es blanco")
            logo.alt = "El logo de la galeria negro"
            logo.src = "Images/Logos/clear_white.png"
            sol.src = "Images/Icones/soleil_white.png"
            //console.log("el logo es negro")
        }

        else{
            //console.log("el logo es negro")
            logo.alt = "El logo de la galeria blanco"
            logo.src = "Images/Logos/clear_black.png"
            sol.src = "Images/Icones/soleil_black.png"
            //console.log("el logo es blanco")
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

        // console.log(photo)

        photo_width = photo.getBoundingClientRect().width

        photo.style = "transition: all 10s ease;"
        
        photo.style.transform = `translateX(-${photo_width * tour}px)`
        
        // console.log(tour)

        

    },


    /**
     * Fais slider tout le carousel
     */
    superslides(size) {

        for (let index = 1; index <= size; index++) {
            this.slide(index,selcoura)
        }

        //console.log("seloura",selcoura)

    },
    


    /**
     * Gere le carousel à interval de seconde défini
     */
    carousel(sec, size) {
        //console.log("Début du carousel")
        selcoura = 1
        setInterval(this.setcarousel, sec*1000, size)
    },



    /**
     * Gere le timer du carousel
     */
    setcarousel(size) {

        // console.log("setcarousel selcoura",selcoura)

        jarvis.superslides(size)

        // console.log("size",size)

        if (selcoura < size - 1){
            selcoura++
            // console.log("increment")
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

        photo.src = folder

        photo.alt = `photo ${no}`

        images.appendChild(photo)

        return photo

    },


    
    loading_photos(parent,id,src, size){

        for (let index = 1; index <= size; index++) {

            const element = src[index-1]
            this.create_photo(parent, id, element, index)
            
            //console.log(element)
        }
    }
}