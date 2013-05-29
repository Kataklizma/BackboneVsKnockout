var App = App || {};
var AZUREClient = new WindowsAzure.MobileServiceClient('https://beans.azure-mobile.net/', 'PzOgnOzLrLxdRmTcMawYYxkBZdvxXo80');
Backbone.sync = function (method, model, options) {
    
    var data;
    var success = function (d) {
        if (options.success) options.success(d);
        model.trigger("sync", model, d, options);
    };
    var errorData = function (err) {
        alert("Azure error " + err);
    };
    var params = {  };
    if (!options.url) {
        params.url = _.result(model, 'url') || errorData("urlNot defined");
    }
    var tbl = AZUREClient.getTable(params.url);
    switch (method) {
        case "create":
            data = model.toJSON();
            tbl.insert(data).done(success, errorData);
            break;
        case "update":
            data = model.toJSON();
            //tbl.update(data).done(success);
            delete data.TStamp;
            tbl.update(data).done(success, errorData);
            break;
        case "read":
            data = { id: model.get('id') };
            if (data.id === undefined) {
                if (options.searchCriteria === undefined) {
                    tbl.read({ VATCategoryNameEn: '' }).done(success, errorData);
                } else {
                    tbl.read({ VATCategoryNameEn: options.searchCriteria }).done(success, errorData);
                }
                
            } else {
                tbl.where(data).read().done(success, errorData);
            }
            break;
        case "delete":
            data = { id: model.get('id') };
            tbl.del(data).read().done(success, errorData);
            break;
    }
};
(function (App) {
    var AppView = Backbone.View.extend({
        el: "body",
        initialize: function() {
            App.categorys = new App.Category.Collection();
            this.listenTo(App.categorys, 'reset', this.renderCategorySection);
            this.listenTo(App.categorys, 'change', this.renderCategorySection);
            this.listenTo(App.categorys, 'add', this.renderCategorySection);
            App.categorys.fetch({reset:'true'});
        },
        events: {
            'change #vatCategorySearch': 'categorySearch',
            'click #btnNewEntity' : 'addNewCategory'
        },
        addNewCategory : function() {
            App.Category.Views.detail = new App.Category.Views.Detail({ model: new App.Category.Model() });
        },
        categorySearch : function(e) {
            App.categorys.fetch({ searchCriteria: $(e.target).val(), reset: true });
        },
        renderCategorySection: function () {
            this.$el.find('#listVatCategorys').empty().append(new App.Category.Views.Collection({ collection: App.categorys }).render().el);
            this.$el.find('ul').listview();
            return this;
        },
        renderDetailSection:function() {
            alert("Detail");
        },
        render:function() {
            
        }
    });
    new AppView();
})(App);




//{"id":1,"VATCategoryNameEn":"17%e","VATCategoryNameDe":"17%d","VATCategoryNameAr":"17%a","VATPercentage":17,"Active":false,"CreatedOn":"2007-07-10T13:08:05.000Z","CreatedBy":null,"EditedOn":"2013-04-14T13:51:40.267Z","EditedBy":"u@u.com","TStamp":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":157,"7":150,"length":8}