define(['services/logger'], function (logger) {
    var vm = {
        activate: activate,
        viewAttached:viewAttached,
        title: 'Home'
    };

    return vm;

    //#region Internal Methods
    function activate() {
        logger.log('Home View Activated', null, 'home', true);
        
        return true;
    }

    function viewAttached(view) {
        logger.log('Home Viessssssssssssssssw Activated', null, 'home', true);
        
        return true;
    }
    //#endregion
});