module.exports = {
    getShop({page=1,pageSize=20,orderStyle=0,choose=''}){
        return $.ajax({
            dataType : 'json',
            url :`/api/Shop/GetShopListP?page=${page}&pageSize=${pageSize}&OrderStyle=${orderStyle}${choose}`
        })
    },
    getsearchShop({page=1,pageSize=20,orderStyle=0,keyword=''}){
        return $.ajax({
            dataType : 'json',
            url :`/api/Shop/GetShopListP?page=${page}&pageSize=${pageSize}&OrderStyle=${orderStyle}&KeyWord=${keyword}`
        })
    },
}