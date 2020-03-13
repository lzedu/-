const detailView = require('../views/detail.art')
const detailData = require('../models/detail')
const swiper = require('../static/swiper')
const detailMainView = require('../views/detailMain.art')

class Detail{
    async render(aucid){
        let result = await detailData.getDetail({
            aucid
        })
        let result2 = await detailData.getSeller({
            userid:result.BaseUser.UserId
        })

        // console.log(result);
        let detailHtml = detailView({})
        let mainHtml = detailMainView({
            'deBanlist':result.ListPic,
            'deContent':result.AucItem,
            'deContent1':result.AucClassItem,
            'baseUser':result.BaseUser,
            'userimg':result2.ShopNameAndSmallIcon.ShopSmallIcon
        })
        // console.log(content.ListPic)
        $('#root').html(detailHtml);
        $('main').html(mainHtml)

        $('.detail-top-icon').on('tap',function(){
            // $('body').on('tap',function(){
            // console.log(1);
            history.go(-2);
            // console.log(111);
        })

        let text = $('.pro-start-time-dd').text()
        let newText = text.slice(0,4)+'-'+text.slice(4,6)+'-'+text.slice(6,8)+' '+text.slice(8,10)+':'+text.slice(10,12)+':'+text.slice(12,14);
        // console.log(text)
        $('.pro-start-time-dd').text(newText);

        new swiper ('.swiper-container', {
            direction: 'horizontal', 
        })
    }
}

export default new Detail();


//页面不返回 ，怀疑有别的误触