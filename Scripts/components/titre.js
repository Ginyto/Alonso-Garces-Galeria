const vue_titre = Vue.createApp({

    data() {
        return {


        }
    },

    computed: {
    
    },
})

vue_titre.component('compo-titre', {

    props: {
        no_page: 0
    },
    
    template:
    /*html*/
    `<div id="vue_titre" class="vue_titre_zone"> 

            <h1>{{titre}}</h1>

    </div>`,

    data() {
        return {

            titres: ['Actual: "preludio para la Cruz" exposición de Manolo Vellojin Inauguración : Sábado 22 de octubre 2022 - 11 a.m Hora: 11 a.m', 'Exposiciones', 'Artistas', 'Informacion'],

        }
    },

    computed: {
        titre() {
            return this.titres[this.no_page]
        }
    },

})


vue_titre.mount('#vue_titre')