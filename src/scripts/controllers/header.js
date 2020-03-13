const homeheaderView = require('../views/header.art');
const likeheaderView = require('../views/header-like.art');
const forumheaderView = require('../views/header-forum.art');
const shopheaderView = require('../views/header-shop.art');

class Header{
    // constructor(){
    //     this.render();
    // }
    render(view){
        let headerViews ={
            homeheaderView,
            forumheaderView,
            likeheaderView,
            shopheaderView,
            // profileheaderView
        }
        let headerHtml = headerViews[`${view}headerView`]();
        $('header').css('display','block');
        $('header').html(headerHtml);
    }
}

export default new Header;