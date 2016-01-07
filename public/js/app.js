// use this https://apigee.com/console/instagram?req=%7B%22resource%22%3A%22get_media_popular%22%2C%22params%22%3A%7B%22query%22%3A%7B%7D%2C%22template%22%3A%7B%7D%2C%22headers%22%3A%7B%7D%2C%22body%22%3A%7B%22attachmentFormat%22%3A%22mime%22%2C%22attachmentContentDisposition%22%3A%22form-data%22%7D%7D%2C%22verb%22%3A%22get%22%7D

//Instagram object with the key value pairs of access token, BASE_URL
//What is different is this has functions as key value pairs
window.Instagram = {
    //Store URL and access token
    access_token: '2318918744.1fb234f.89b63cc3ffbb4c9eac998e394f26b461',
    BASE_URL: 'https://api.instagram.com/v1',

    //call get popular pics function, the data that is retrieves, use this in the callbak
    grabPopularPics: function( callback ) {
        //just building the endpoint URL
        var endpoint = this.BASE_URL + '/media/popular?access_token=' + this.access_token;
        //use the endpoint variable in getJSON function,
        this.getJSON( endpoint, callback );
    },

    ///Get a list of recently tagged media.
    tagsByName: function( name, callback ) {
        var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?access_token=' + this.access_token;
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
//doc loaded and then function
$( document ).ready(function() {

    //response is what comes back
    Instagram.grabPopularPics(function( response ) {
        //find the element with the name photos
        var $photos = $( '#photos' );
        for ( var i = 0; i < response.data.length; i++ ) {
            imageUrl = response.data[i].images.low_resolution.url;
            $photos.append( '<img src="' + imageUrl + '" />' );
        }
    });
});