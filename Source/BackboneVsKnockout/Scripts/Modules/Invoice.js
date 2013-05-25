var App = App || {};
(function (App) {
    var Invoice = { Views: {} };

    Invoice.Model = Backbone.Model.extend({});
    Invoice.Collection = Backbone.Collection.extend({
        model: Invoice.Model
    });
    Invoice.Views.ModelView = Backbone.View.extend({
        tagName: "li",
        template: _.template($('#InvoiceView').html()),
        render: function() {
            this.el.innerHTML = this.template({ invoice: this.model.toJSON() });
            return this;
        }
    });
    Invoice.Views.CollectionView = Backbone.View.extend({
        template: _.template($('#InvoiceCollectionView').html()),
        render: function() {
            this.el.innerHTML = this.template({ length: this.collection.length });
            var eldata = this.$el;
            this.collection.forEach(function (model) {
                var d = new Invoice.Views.ModelView({ model: model }).render().el;
                eldata.find('ul').append(d);
            });
            return this;
        }
    });
    App.Invoice = Invoice;
})(App);