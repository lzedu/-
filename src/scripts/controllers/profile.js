const profileView = require('../views/profile.art')

class Profile{

    render(){
        let profileHtml = profileView()
        $('main').html(profileHtml);
        $('.home-search-module').css('display','none');
    }
}

export default new Profile;