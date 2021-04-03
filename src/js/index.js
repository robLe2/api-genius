import '../css/app.scss';
import Recipe from './recipe'
import $ from 'jquery';

class App {
    constructor () {
        this.initEls();
        this.initApp();
    }

    initEls() {
        this.input = $('input')
    }

    initApp () {
        // Start application
        $('div.right-part').hide();
        $('div.apply-filter').click(function(){
            console.log('test');
            new Recipe().getRecipe($('input').val(), $('#dishtype-select option:selected').val(), $('#calories-select option:selected').val());
        });
    }
}

new App();