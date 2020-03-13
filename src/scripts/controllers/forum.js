const forumView = require('../views/forum.art');
const forumListView = require('../views/forum-list.art');
const forumData = require('../models/forum');
const bscroll = require('better-scroll');
import headerController from '../controllers/header';
// import indexController from '../controllers/index'
class forum{
    constructor(){
        this.page = 1;
        this.forum = [];
        this.orderStyle = 0;
        this.ViewType = ''
    }

    renderer(forum) {
        // console.log(forum);
        let forumHtml = forumListView({
            forumlist:forum
        })
        $('.forum-forum').html(forumHtml)
        this.addTip();
    }

    async render(){
        let that = this;
        // let headerHtml = headerforumView({})
        let result = await forumData.getForum({});
        // console.log(result);
        let forum = result.ListTopicP
        this.forum = [...forum];
        const html = forumView({});
        $('main').html(html);
        // $('.home-search-module').html(headerHtml);
        headerController.render('forum');
        let main  = $('.forumMain');

        this.renderer(forum)

        $('.forum-item').on('tap',async function(){
            that.page = 1;
            $(this).addClass('active').siblings().removeClass('active');
            that.orderStyle = $(this).attr('data-orderStyle');
            that.ViewType = $(this).attr('data-type');
            result = await forumData.getForum({
                // page: that.page,
                orderStyle:that.orderStyle,
                ViewType:that.ViewType,
            });
            let forum = result.ListTopicP
            that.forum = [...forum];
            that.renderer(result.ListTopicP);
        })
        let bScroll = new bscroll.default(main.get(0),{probeType: 2});
        bScroll.on('scroll', async function() {
            if (this.maxScrollY >= this.y) {
                $('.forum-loading').css('display','block');
            }
          })
        bScroll.on('scrollEnd', async function() {
            if (this.maxScrollY >= this.y) {
                $('.forum-loading').css('display','none');
                that.page++;
                let forum1 = await forumData.getForum({
                    page: that.page,
                    orderStyle:that.orderStyle,
                    ViewType:that.ViewType,
                })
                //   console.log(forum1)
                  let forum = forum1.ListTopicP
                  that.forum = [ ...that.forum,...forum]
                that.renderer(that.forum)
                bScroll.refresh()

            }
          })  
    }

    addTip(){
        $('.Isimage').each(function (i,el) {
            if($(el).text()==1){
                $(el).text('图')
            }else{
                $(el).remove();
            }
        })
        $('.Iselite').each(function (i,el) {
            if($(el).text()==1){
                $(el).text('精')
            }else{
                $(el).remove()
            }
        })
        $('.TopicIsOriginal').each(function (i,el) {
            if($(el).text()==1){
                $(el).text('原')
            }else{
                $(el).remove()
            }
        })
    }
}

 export default new forum;       