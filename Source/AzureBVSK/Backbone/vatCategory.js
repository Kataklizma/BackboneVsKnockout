var App = App || {};
(function (App) {
    _.templateSettings.interpolate = /\{\{(.*?)\}\}/g;
    var VatCategory = { Views: {} };

    VatCategory.Model = Backbone.Model.extend({
        url: function(){ 
            return "FiVatCategory/";
        }
    });
    VatCategory.Collection = Backbone.Collection.extend({
        model: VatCategory.Model,
        url: 'FiVatCategory',
    });
   
    
    VatCategory.Views.ModelView = Backbone.View.extend({
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
            alert('asd');
            this.trigger('detailView');
        }
    });
    VatCategory.Views.CollectionView = Backbone.View.extend({
        el:'#listVatCategorys',
        template: _.template($('#VatCategoryList').html()),
        initialize:function() {

            this.listenTo(this.collection, "reset", this.render);
            this.listenTo(this.collection,"change", this.render);
            this.collection.fetch({ reset: true });
        },
        render: function () {
            this.el.innerHTML = this.template({ length: this.collection.length });
            this.$el.find('ul').html('');
            this.collection.each(this.addOne, this);
            this.$el.find('ul').listview();
            return this;
        },
        addOne: function (vatCat) {
            var d = new VatCategory.Views.ModelView({ model: vatCat });
            this.$el.find('ul').append(d.render().el);
        }
    });
    VatCategory.Views.DetailView = Backbone.View.extend({
        el: '#DivDetailView',
        template: _.template($('#VatCategoryDetail').html()),
        initialize: function () {
            this.listenTo(this, 'clean_up', this.remove);
            this.render();
        },
        events: {
            'click button' : 'saveVatCategory'
        },
        saveVatCategory: function () {
            this.model.set({ VATPercentage: this.$el.find('.vatPercentage').val(), VATCategoryNameEn: this.$el.find('.vatCategoryName').val() });
            this.model.save();
        },
        render: function () {
            var tmp = this.template({ vatCategory: this.model.toJSON() });
            this.$el.empty().append(tmp);
            this.$el.trigger('create');
            return this;
        },
       
    });
    
    VatCategory.Views.Section = Backbone.View.extend({
        el: '#leftVatCategorySection',
        initialize: function () {
            this.vatCategorys = new VatCategory.Collection();
            var d = new VatCategory.Views.CollectionView({ collection: this.vatCategorys });
        },
        events: {
            'change #vatCategorySearch': "searchItem"
        },
        searchItem: function (e) {
            this.vatCategorys.fetch({ searchCriteria: $(e.target).val(), reset:true });

        }
    });
    App.VatCategory = VatCategory;
})(App);