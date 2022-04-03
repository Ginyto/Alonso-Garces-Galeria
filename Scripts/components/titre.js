const vue_titre = Vue.createApp({

    data() {
        return {


        }
    },

    computed: {
    
    },
})

vue_titre.component('compo-titre',{
    
    template:
    /*html*/
    `<div id="vue_titre" class="vue_titre_zone">

            <h1>{{titre}}</h1>

    </div>`,

    data() {
        return {

            titres: ['Exposicion Actual', 'Exposiciones Anteriores', 'Artistas', 'Galeria']

        }
    },

    computed: {
        titre() {
            return this.titres[0]
        }
    },

})


vue_titre.mount('#vue_titre')