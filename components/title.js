app.component('subtitle', {

    template:
        /*html*/
        `<div id="subtitle">
            <h1>{{message}}</h1>
        </div>`,
    
    data() {
        return {
            message: 'Hello Vue.js!'
        }
    }
    
})