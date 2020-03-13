const shopView = require('../views/shop.art');
const shopListView = require('../views/shop-list.art');
const shopData = require('../models/shop');
const bscroll = require('better-scroll');
import headerController from '../controllers/header';
import indexController from '../controllers/index'
// import indexController from '../controllers/index'
class Shop{
    constructor(){
        this.page = 1;
        this.list = [];
        this.choose = '';
    }

    renderer(shopList) {
        let shopHtml = shopListView({
          shopList
        })
        $('.shop .shop-list').html(shopHtml)
    }

    async render(id){
        indexController.render();
        this.choose = ''
        let that = this;
        let main  = $('main');
        let result = await shopData.getShop({});
        if(id){
            result = await shopData.getsearchShop({keyword:id});
        }
        let shopList = result.ShopListP
        this.list = [...shopList];
        const html = shopView({
            'shopList' : result.ShopListP
        });
        main.html(html);

        this.renderer(shopList)
        headerController.render('shop');
        $('.shop-item').each(function(i,el){
            $(el).on('tap',function(){
                $('.popover').css('display','none');
                $(`#topPopover${i}`).css('display','block')
            })
        })
        let placeId=0;
        let creditId = '';
        let orderStyle = 0;
        $('.table-view-cell').on('tap',async function(e){
            that.choose = '';
            let text = $(this).text();
            let No = $(this).parents('.popover').attr('data-id');
            if(No == 0){
                if($(this).text()=='所在地'){
                    placeId=0;
                }else{
                    placeId=text
                    console.log(placeId);
                }
            }
            else if(No == 1){
                creditId = $(this).attr('data-id');
                console.log(creditId);
            }else if(No==2){
                orderStyle = $(this).attr('data-id')
            }
            $('.shop-header-top').eq(No).text(text);
            if(creditId){
                console.log('aaa');
            }
            that.choose = (placeId? `&Loc=${placeId}`: '')+(creditId? `&IsTui=${creditId}`:'')
            console.log(that.choose);
            let result = await shopData.getShop({
                'choose':that.choose,
                orderStyle
            });
            let shopList = result.ShopListP
            // console.log(shopList);
            that.list = [...shopList];
            that.renderer(shopList);
            $('.popover').css('display','none');
        })

        $('.top-login').on('tap',function(){
            location.hash = 'search/id=shop'
        })

        $(`footer li[data-to=shop]`).addClass('active').siblings().removeClass('active')

        
        let bScroll = new bscroll.default(main.get(0),{probeType: 2});
        bScroll.on('scroll', async function() {
            if (this.maxScrollY >= this.y) {
                $('.shop-loading').css('display','block');
            }
          })
        bScroll.on('scrollEnd', async function() {
            if (this.maxScrollY >= this.y) {
                $('.shop-loading').css('display','none');
                that.page++;
                let shop1 = [];
                // console.log(that.choose);
                if(that.choose){
                    shop1 = await shopData.getShop({
                        page: that.page,
                        choose:that.choose
                    })
                }else{
                    shop1 = await shopData.getShop({
                        page: that.page,
                        choose:that.choose
                    })
                }
                  
                  let list = shop1.ShopListP
                  that.list = [ ...that.list,...list]
                that.renderer(that.list)
                bScroll.refresh()
            }
          })  

          console.log(bScroll);
    }
}

 export default new Shop;       