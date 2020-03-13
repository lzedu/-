module.exports = {
    getBanner(){
        return $.ajax({
            dataType : 'json',
            url :`/api/HmAppAd/IndexBanner?adsort=h5`
        })
    },
    getProduct({page=1}){
        return $.ajax({
            dataType : 'json',
            url :`/api/Auction/GetIndexListAuctionP?phoneType=h5&page=${page}`
        })
    },
    getSortL1(){
        return $.ajax({
            dataType : 'json',
            url :`/api/Auction/GetAucClass?ClassId=101&type=0`
        })
    },
    getSortL2(){
        return $.ajax({
            dataType : 'json',
            url :`/api/Auction/GetAucClass?ClassId=100&type=0`
        })
    }
}