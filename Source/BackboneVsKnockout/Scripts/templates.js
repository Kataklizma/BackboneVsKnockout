_.templateSettings.interpolate = /\{\{(.*?)\}\}/g;
var App = App || {};
(function(App) {
    var Templates = {};
    Templates.InvoiceModel = [
        "<hi>{{nr}}</h1>",
        "<p>{{date}}</p>"
    ].join("\n");

    Templates.InvoiceCollection = [
        "<hi>d</h1>",
    ].join("\n");
    for (var temp in Templates) {
        if (Templates.hasOwnProperty(temp)) {
            Templates[temp] = _.template(Templates[temp]);
        }
    }

    App.Templates = Templates;
})(App);
