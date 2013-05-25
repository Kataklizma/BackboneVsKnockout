var App = App || {};
(function (App) {
    var AppView = Backbone.View.extend({
        el: "#main",
        initialize: function () {
            this.invoices = new App.Invoice.Collection([
                { nr: 1, date: "01/01/2011" },
                { nr: 2, date: "01/01/2012" },
                { nr: 3, date: "01/01/2013" }]);
            this.render();
        },
        render:function() {
            this.$el.empty().append(new App.Invoice.Views.CollectionView({ collection: this.invoices }).render().el);
        }
    });
    new AppView();
})(App);