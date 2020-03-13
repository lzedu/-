
// import indexController from '../controllers/index'
// import headerController from '../controllers/header'
import homeController from '../controllers/home'
import likeController from '../controllers/like'
import profileController from '../controllers/profile'
import shopController from '../controllers/shop'
import detailController from '../controllers/detail'
import listController from '../controllers/list'
import forumController from '../controllers/forum'
import searchController from '../controllers/search'

// IndexControllers
class Router{
    constructor(){
        this.render();
        // this.renderDOM('home')
    }
    
    render(){
        window.addEventListener('hashchange',this.hashchangeHandle.bind(this))
        window.addEventListener('load',this.loadHandle.bind(this))
    }

    setActiveClass(hash) {
        // if()
        $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active')
    }

    renderDOM(hash,id) {
        let pageControllers = {
          homeController,
          likeController,
          profileController,
          shopController,
          detailController,
          listController,
          forumController,
          searchController
        }
        pageControllers[`${hash}Controller`].render(id);
    }

    loadHandle(){
        // indexController.render();
        let hash = location.hash.substr(1) || 'home'
        // console.log(hash);
        location.hash = hash
        // console.log(hash);
        let result = this.getHash(hash)
        if(result){
            hash = result[1];
        }
        this.renderDOM(hash)
        if(hash == 'home ' || hash == 'like' || hash == 'shop' || hash == 'forum' || hash== 'profile')
            this.setActiveClass(hash)
    }

    hashchangeHandle(){
        let hash = location.hash.substr(1);
        console.log(hash)
        let result = this.getHash(hash);
        // console.log(result);
        if(result){
            // console.log(111);
            // console.log(result[1]);
            this.renderDOM(result[1],result[2])
        }
        else{
            this.renderDOM(hash)
        }
        if(hash == 'home ' || hash == 'like' || hash == 'shop' || hash == 'forum' || hash== 'profile')
            this.setActiveClass(hash);
    }
    getHash(hash){
        let re = /(\w+)\/id=(.*)/;
        let result = hash.match(re);
        return result;
    }
}
new Router();

