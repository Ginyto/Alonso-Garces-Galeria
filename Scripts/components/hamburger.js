const hamburger = Vue.createApp({

    data() {
        return {}
    },

    methods: {
    },

    computed: {
    },
})

hamburger.component('compo-hamburger', {

    template:

        /*html*/

        `<div class="burger_zone">
            <div class="hamburger" id="ham"> </div>
            <div class="hamburger" id="burger"> </div>
        </div>


        <nav class="menu_deroulant">

            <div class="roulant" onclick="jarvis.pathfinder(0)">Inicio</div>
            <div class="roulant" onclick="jarvis.pathfinder(1)">Exposiciones</div>
            <div class="roulant" onclick="jarvis.pathfinder(2)">Artistas</div>
            <!-- <div class="roulant" onclick="jarvis.pathfinder(3)">Tienda</div> -->
            <div class="roulant" onclick="jarvis.pathfinder(4)">Informaciones</div>

        </nav>`,

    props: {

    },

    data() {
        return {}
    },

    methods: {

    },

    computed: {
        
    },
})

hamburger.mount('#vue-hamburger')