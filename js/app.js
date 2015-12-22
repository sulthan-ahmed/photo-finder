window.Instagram = {
    //Store application settings
     config: {access_token: '2318918744.1fb234f.89b63cc3ffbb4c9eac998e394f26b461'},
    BASE_URL: 'https://api.instagram.com/v1',

    //get popular pics
    popular: function( callback ) {
        var endpoint = this.BASE_URL + '/media/popular?access_token=' + this.config.access_token;
        this.getJSON( endpoint, callback );
    },

    ///Get a list of recently tagged media.
    tagsByName: function( name, callback ) {
        var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?access_token=' + this.config.access_token;
        this.getJSON( endpoint, callback );
    },

    getJSON: function( url, callback ) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function( response ) {
                if ( typeof callback === 'function' ) callback( response );
            }
        });
    }
};

$( document ).ready(function() {

    Instagram.popular(function( response ) {
        var $instagram = $( '#instagram' );
        for ( var i = 0; i < response.data.length; i++ ) {
            imageUrl = response.data[i].images.low_resolution.url;
            $instagram.append( '<img src="' + imageUrl + '" />' );
        }
    });
});