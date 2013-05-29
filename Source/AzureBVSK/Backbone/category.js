var App = App || {};
(function (App) {
    _.templateSettings.interpolate = /\{\{(.*?)\}\}/g;
    var Category = { Views: {} };
    
    Category.Model = Backbone.Model.extend({
        url: function () {
            return "FiVatCategory/";
        }
    });
    
    Category.Collection = Backbone.Collection.extend({
        model: Category.Model,
        url: 'FiVatCategory',
    });

    Category.Views.Item = Backbone.View.extend({
        tagName: "li",
        template: _.template($('#VatCategoryItem').html()),
        render: function () {
            this.el.innerHTML = this.template({ vatCategory: this.model.toJSON() });
            return this;
        },
        events: {
            "click a": "detail"
        },
        detail: function (e) {
            App.Category.Views.detail = new Category.Views.Detail({ model: this.model });
        }
    });
    Category.Views.Collection = Backbone.View.extend({
        template: _.template($('#VatCategoryList').html()),
        render: function () {
            this.el.innerHTML = this.template({ length: this.collection.length });
            this.$el.find('ul').empty();
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function (vatCat) {
            var d = new Category.Views.Item({ model: vatCat });
            this.$el.find('ul').append(d.render().el);
        }
    });
    Category.Views.Detail = Backbone.View.extend({
        //el:'#DivDetailView',
        template: _.template($('#VatCategoryDetail').html()),
        initialize: function () {
            
            this.render();
        },
        events: {
            'click button': 'saveVatCategory'
        },
        saveVatCategory: function () {
            
            this.model.set({ VATPercentage: this.$el.find('.vatPercentage').val(), VATCategoryNameEn: this.$el.find('.vatCategoryName').val() });
            this.model.save();
        },
        render: function () {
            var tmp = this.template({ vatCategory: this.model.toJSON() });
            this.$el.empty().html(tmp);
            $('#DivDetailView').html(this.$el);
            $('#DivDetailView').trigger('create');
            return this;
        },
        });

    App.Category = Category;
})(App);