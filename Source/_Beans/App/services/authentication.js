define(function (require) {
    var system = require('durandal/system'),
    app = require('durandal/app'),
    router = require('durandal/plugins/router'),
    azureService = require('services/azureService');

    return {
        isLoggedIn:ko.observable(azureService.client.currentUser !== null),
        handleUnauthorizedAjaxRequests: function (callback) {
            if (!callback) {
                return;
            }
            $(document).ajaxError(function (event, request, options) {
                if (request.status === 401) {
                    callback();
                }
            });
        },

        canLogin: function () {
            return true;// azureService.currentUser === null;
        },
        logout:function() {
            azureService.client.logout();
            isLoggedIn(false);
            router.navigateTo('#/account/login');
        },
        login: function (navigateToUrl) {
            if (!this.canLogin()) {
                return system.defer(function (dfd) {
                    dfd.reject();
                }).promise();
            }
            return azureService.client.login("google").then(function () {
                if (!!navigateToUrl) {
                    router.navigateTo(navigateToUrl);
                }
            }, function (error) {
                app.showMessage('Error: ' + error);
            });
        }
    };
});