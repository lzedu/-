module.exports={
    getSearch({sort='goods'}){
        return $.ajax({
            url:`/api/Search/HotSearchKey?sort=${sort}`
            // sort = shop
        })
    },
    getResult({key='a',sort='goods'}){
        return $.ajax({
            url:`/api/Search/Association?sort=${sort}&key=${key}`
            // sort = shop
        })
    },
}