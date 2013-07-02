define(['services/authentication'], function (authentication) {
    return {
        displayName : 'Login',
        Name : ko.observable(),
        Pass : ko.observable(),
        LogIn: function () {
            authentication.login('welcome');
        }
    };
});