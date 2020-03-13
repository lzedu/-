const searchView = require('../views/search.art')
const searchListView = require('../views/search-list.art')
const searchData = require('../models/search')

class Search{
    constructor(){
        this.sort = 'pro'
    }

    async render(id){
        let that = this;
        let searchHtml = searchView()
        $('#root').html(searchHtml);
        let result = await searchData.getSearch({})
        let shopresult = await searchData.getSearch({
            sort:'shop'
        })
        let searchListHtml = searchListView({
            hotList:result.KeyName,
            hotListShop:shopresult.KeyName
        })
        $('.searchMain').html(searchListHtml);
        this.searchInput(result);


        //搜索跳列表
        // console.log($('.search-result-item'))
        if(id=='shop'){
            this.sort = 'shop';
            $('.search-sort-shop').addClass('active').siblings().removeClass('active')
            $('.sort-hot-list-shop').addClass('active').siblings().removeClass('active')
        }
        console.log(this.sort);
        $('.sort-hot-item').on('tap',function(){
            console.log(11);
            console.log(that.sort)
            if(that.sort == 'pro'){
                let listid = $(this).text();
                location.hash = `list/id=${listid}`
            }else{
                let shopid = $(this).text();
                location.hash=`shop/id=${shopid}`
            }
            
        })

        $('.search-sort>div').on('tap',function(){
            that.sort=$(this).attr('data-id')
            let theList=$(this).attr('data-for');
            $(this).addClass('active').siblings().removeClass('active');
            $(`.${theList}`).addClass('active').siblings().removeClass('active');
            // $('.sort-hot-list-shop').toggleClass('active');
        })

    }

    searchInput(result1){
        let that = this;
        if($('.search-top-search').val()==''){
            $('.search-result').css('display','none');
        }
        $('.search-top-search').on('input',async function(){
            let text = $(this).val();
            if(text.length){
                // console.log()
                $('.search-top-tip').css('display','none');
                $('.search-result').css('display','block');
                let result = await searchData.getResult({
                    key:text
                })
                // console.log(result.KeyName);
                let searchListHtml = searchListView({
                    searchName:text,
                    hotList:result1.KeyName,
                    resultList:result.KeyName
                })
                $('.searchMain').html(searchListHtml);

                $('.search-result-item').on('tap',function(){
                    // console.log(111);
                    console.log(that.sort)
                    if(that.sort == 'pro'){
                        let listid = $(this).text();
                        location.hash = `list/id=${listid}`
                    }else{
                        let shopid = $(this).text();
                        location.hash=`shop/id=${shopid}`
                    }
                })
            }else{
                $('.search-top-tip').css('display','inline');
                $('.search-result').css('display','none');
                $('.sort-hot-item').on('tap',function(){
                    console.log(11);
                    let listid = $(this).text();
                    location.hash = `list/id=${listid}`
                })
            }
        })
        
    }
}

export default new Search;