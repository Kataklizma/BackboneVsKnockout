define(function () {
    return {
        displayName: "Menu",
        description: "test",
        routes :[
            { url: '/#login', moduleId: 'viewmodels/searchTransport', visible: true, name: 'Fi Vat Category' },
            { url: '/#/login', moduleId: 'viewmodels/searchTransport', visible: true, name: 'Customer' }],
        viewAttached: function (view) {
            alert(view);
        }
    };
});