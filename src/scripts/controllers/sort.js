// const sortView = require('../views/sort.art')
const sortView = require('../views/sort.art')

class fun{
    render(){
        let sortHtml = sortView({})
        $('main').html(sortHtml)
    }
}

export default new fun;