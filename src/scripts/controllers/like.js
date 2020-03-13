import indexController from '../controllers/index'
const likeView = require('../views/like.art');
const bscroll = require('better-scroll');
import headerController from '../controllers/header';
// import indexController from '../controllers/index'
class like{
    constructor(){
        this.page = 1;
        this.like = [];
    }

    async render(){
        const html = likeView({});
        $('main').html(html);
        headerController.render('like');
        let main  = $('.likeMain');
    }

}

 export default new like;       