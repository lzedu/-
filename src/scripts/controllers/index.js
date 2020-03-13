const layout = require('../views/layout.art');
class fun1{
    constructor(){
        this.render();
    }
    render(){
        const html = layout();
        document.getElementById('root').innerHTML = html;
        $('footer ul li').on('tap',function(){
            let hash= $(this).attr('data-to');
            location.hash = hash;
        })
    }
}

 export default new fun1;