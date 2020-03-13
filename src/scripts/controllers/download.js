const downloadView = require('../views/download.art')

class download{

    render(){
        let downloadHtml = downloadView()
        $('main').html(downloadHtml);
    }
}

export default new download;