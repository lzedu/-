const layout = require('../views/home.art');
const swiper = require('../static/swiper');
const homeData = require('../models/home');
import headerController from '../controllers/header';
const bscroll = require('better-scroll');
const homeList = require('../views/home-list.art')
import indexController from '../controllers/index'
import searchController from '../controllers/search'
// import listController from '../controllers/list'
class fun1{
    constructor(){
        this.page = 1;
        this.list = [];
        // this.bScroll ='';
    }

    renderer(productList) {
        let productHtml = homeList({
          productList
        })
        $('main .product-list').html(productHtml)
        $('.product-list .product-item').on('tap',function(){
            let id = $(this).attr('data-id')
            location.hash = 'detail/id='+id;
        })
        $('.product-Ems').each(function(i,el){
            let ems = $(el).text();
            $(el).children('span').text('');
            // console.log(ems);
            if(ems == 0){
                // console.log(1);
                $(el).children('img').attr('src','http://m.hmlan.com/h5/content/img/free.png');
            }
        })
        $('.product-hua').each(function(i,el){
            let hua = $(el).text();
            $(el).children('span').text('');
            // console.log(hua);
            if(hua == 2){
                // console.log(1);
                $(el).children('img').attr('src','http://m.hmlan.com/h5/content/img/hua.png');
            }
        })
    }

    async render(){
        indexController.render();
        let that = this;
        let main  = $('main');
        let result = await homeData.getBanner();
        let product = await homeData.getProduct({});
        let sortL1 = await homeData.getSortL1({});
        let sortL2 = await homeData.getSortL2({});
        let productList = product.IndexListAuctionP
        this.list = [...productList];
        const html = layout({
            list : result.ListAPPIndexBanner,
            sortL1:sortL1.ClassItem,
            sortL2:sortL2.ClassItem,
        });
        // console.log(result);
        main.html(html);
        $('.quickLink-item p').each(function(i,el){
            if($(el).text()=='兰花'){
                console.log('lanhu')
                $(el).parents('li').remove()
            }
        })
        headerController.render('home');
        this.renderer(productList)

        $('.quickLink-item').on('tap',function(){
            let id = $(this).attr('data-id')
            location.hash = `list/id=${id}`
        })

        new swiper ('.swiper-container', {
            direction: 'horizontal', 
            loop: true, 
            pagination: {
                el: '.swiper-pagination',
              },
            autoplay : true
        })

        $('.item').on('tap',function(){
            let id = $(this).children('.home-list-title')
            location.hash = `list`;
        })

        $('.top-search').on('tap',function(){
            location.hash = 'search';
        })



        let bScroll = new bscroll.default(main.get(0),{probeType: 2});
        bScroll.on('scroll', async function() {
            if (this.maxScrollY >= this.y) {
                $('.product-loading').css('display','block');
            }
          })
        bScroll.on('scrollEnd', async function() {
            if (this.maxScrollY >= this.y) {
                $('.product-loading').css('display','none');
                that.page++;
                let product1 = await homeData.getProduct({
                    page: that.page,
                })
                  
                  let list = product1.IndexListAuctionP
                  that.list = [ ...that.list,...list]
                    that.renderer(that.list)
                    bScroll.refresh()
            }
          })  
          console.log(bScroll)
    }
}

 export default new fun1;       