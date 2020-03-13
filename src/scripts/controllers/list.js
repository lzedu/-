const listView = require('../views/list.art');
const headerListView = require('../views/header-list.art');
const listListView = require('../views/list-list.art');
const listChooseView = require('../views/list-choose-list.art');
const listData = require('../models/list');
const bscroll = require('better-scroll');
// import indexController from '../controllers/index'
class list{
    constructor(){
        this.page = 1;
        this.list = [];
    }

    renderer(listList) {
        // console.log(listList);
        let listHtml = listListView({
          listList
        })
        $('.list-list').html(listHtml)
        this.ontapDetail()
    }

    async render(id){
        let that = this;
        let headerHtml = headerListView({value:id})
        let result = await listData.getList({});
        let chooseList = await listData.getChooseList({})
        let chooseLanList = await listData.getChooseList({classId:101})
        
        if(id){
            result = await listData.getSearchResult({keyWord:id});
            let re = /\d+/;
            let res = id.match(re);
            console.log(res[0]);
            if(res && id.length<=10){
                console.log(id);
                result = await listData.getsortL({classId:id})
            }
        }
        console.log(result);
        let listList = result.ListAuctionP
        if(listList == null){
            console.log('无数据')
        }
        
        const html = listView({
            'listList' : result.ListAuctionP,
            'chooseList':chooseList.ClassItem,
            'chooseLanList':chooseLanList.ClassItem,
        });
        $('#root').html(html);
        $('.home-search-module').html(headerHtml);
        let main  = $('.listMain');

        this.renderer(listList)
        if(listList){
            this.list = [...listList];
        }else{
            $('.list-list').append('<h2 class="nodata-title">无数据</h2>')
        }
        
        $('.list-top-back').on('tap',function(){
            history.go(-1);
        })

        $('.list-item').on('tap',function(){
            let id = $(this).attr('data-to');
            location.hash = `detail/id=${id}`
        })

        $('.list-item-choose').each(function(i,el){
            $(el).on('tap',function(){
                $('.popover').css('display','none');
                $(`#topPopover${i}`).css('display','block')
            })
        })

        $('#topPopover0 li').each(function(i,el){
            let dataid = $(el).attr('data-id');
            let text = $(el).text()
            if(dataid == id){
                $('.list-city .list-header-top').text(text);
            }
        })

            let placeId=0;
            let orderStyle = 0;
            let Loc='';
            let classId ='';
        $('.list-choose-desc').on('tap',async function(){
            $(this).addClass('active').siblings().removeClass('active');
            classId = $(this).attr('data-id');
            let text = $(this).text();
            $('.list-item-choose .list-header-top').eq(0).text(text);
            let chosehtml = '';
            if(text=='全部'){
                chosehtml = listChooseView({})
            }else{
                let choL = await listData.getChooseList({
                    classId,
                })
                // console.log(choL);
                chosehtml = listChooseView({
                    chooseList2:choL.ClassItem
                })
            }
            
            $('#filterSorts').html(chosehtml)
            $('.table-view-cell').on('tap',async function(){
                let text = $(this).text();
                if($(this).parents('.popover').attr('data-id')==0){
                    let tmpid = $(this).attr('data-id');
                    if(tmpid){
                        classId = $(this).attr('data-id');
                        $('.list-item-choose .list-header-top').eq(0).text(text);
                    }else{}
                    console.log(classId);
                }
                let result = await listData.getChooseList2({
                    Loc,
                    orderStyle,
                    classId
                });
                let listList = result.ListAuctionP
                console.log(result);
                // console.log(shopList);
                if(listList){
                    that.list = [...listList];
                    that.renderer(listList);
                }
                
                $('.popover').css('display','none');
            })

        })

        $('.table-view-cell').on('tap',async function(e){
            Loc = '';
            let text = $(this).text();
            let No = $(this).parents('.popover').attr('data-id');
            if(No == 1){
                if($(this).text()=='所在地'){
                    placeId=0;
                }else{
                    placeId=text
                    console.log(placeId);
                }
            }
            else if(No==2){
                orderStyle = $(this).attr('data-id')
            }
            $('.list-item-choose .list-header-top').eq(No).text(text);
            Loc = (placeId?placeId:'')
            console.log(Loc);
            
            let result = await listData.getChooseList2({
                Loc,
                orderStyle,
                classId
            });
            let listList = result.ListAuctionP
            console.log(result);
            // console.log(shopList);
            if(listList){
                that.list = [...listList];
                that.renderer(listList);
            }
            $('.popover').css('display','none');
        })

        
        $('.searchPro').on('tap',function(){
            location.hash = 'search';
        })

        let bScroll = new bscroll.default(main.get(0),{probeType: 2});
        bScroll.on('scroll', async function() {
            if (this.maxScrollY >= this.y) {
                $('.list-loading').css('display','block');
            }
          })
        bScroll.on('scrollEnd', async function() {
            if (this.maxScrollY >= this.y) {
                $('.list-loading').css('display','none');
                that.page++;
                let list1 = await listData.getList({
                    page: that.page,
                })
                if(id){
                    console.log(id);
                    list1 = await listData.getSearchResult({
                        page: that.page,
                        keyWord:id
                    })
                }
                // console.log(list1)
                let list = list1.ListAuctionP
                that.list = [ ...that.list,...list]
                that.renderer(that.list)
                bScroll.refresh()
            }
          })  
    }
    ontapDetail(){
        $('.list-item').on('tap',function(){
            let id = $(this).attr('data-to');
            location.hash = `detail/id=${id}`
        })
    }
}

 export default new list;       