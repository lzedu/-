module.exports ={
    getDetail({aucid='20191012213749217619'}){
        return  $.ajax({
            dataType : 'json',
            url :`/api/Auction/GetAuctionItem?AucId=${aucid}`
        })
    },
    getSeller({userid=''}){
        return  $.ajax({
            dataType : 'json',
            url :`/api/Shop/GetShopNameAndSmallIcon?userId=${userid}`
        })
    }
}