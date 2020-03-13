module.exports={
    getForum({page=1,pageSize=20,orderStyle=0,ViewType=''}){
        return $.ajax({
            url:`/api/Forum/Topic/GetListTopicP?Title=&Author=&ViewType=${ViewType}&OrderStyle=${orderStyle}&page=${page}&pageSize=${pageSize}`
        })
    }
}