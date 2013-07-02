define(['services/logger', 'durandal/plugins/router'], function (logger, router) {
    var publicViewModel = function() {
        self.router = router;
        self.title = "florim";
        self.logIn = function() {
            app.setRoot('viewmodels/shell');
            router.navigateTo('#/home');
        };
    };
    
    return new publicViewModel();

    function activate() {
        logger.log('Bar View Activated', null, 'home', true);

        return true;
    }

    function viewAttached(view) {
        logger.log('Bar Viessssssssssssssssw Activated', null, 'home', true);
        $(view).page();
        return true;
    }
    
});