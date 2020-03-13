module.exports={
    getList({page=1,pageSize=20,chujiasort=0}){
        return $.ajax({
            url:`/api/Auction/GetListAuctionP?page=${page}&pageSize=${pageSize}&ChujiaSort=${chujiasort}`
        })
    },
    getSearchResult({keyWord='a',page=1,pageSize=20}){
        return $.ajax({
            url:`/api/Auction/GetListAuctionP?page=${page}&pageSize=${pageSize}&KeyWord=${keyWord}`
            // sort = shop
        })
    },
    getChooseList({classId=100}){
        return $.ajax({
            url:`/api/Auction/GetAucClass?ClassId=${classId}&type=0`
        })
    },
    getChooseList2({page=1,pageSize=20,classId='',orderStyle=0,Loc=''}){
        return $.ajax({
            url:`/api/Auction/GetListAuctionP?page=${page}&pageSize=${pageSize}&ClassId=${classId}&type=0&Loc=${Loc}&OrderStyle=${orderStyle}`
        })
    },
    getsortL({page=1,pageSize=20,classId=''}){
        return $.ajax({
            url:`/api/Auction/GetListAuctionP?page=${page}&pageSize=${pageSize}&ClassId=${classId}`
        })
    }
}