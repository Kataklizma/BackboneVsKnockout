define(['durandal/plugins/router', 'durandal/app', 'services/authentication'], function (router, app, authentication) {

    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.mapAuto('durandal');
            if (authentication.isLoggedIn() === true) {
                return router.activate('menu');
            } else {
                return router.activate('login');
            }
            
        }
    };
});