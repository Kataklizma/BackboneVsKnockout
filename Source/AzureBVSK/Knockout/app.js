var App = App || {};
var AZUREClient = new WindowsAzure.MobileServiceClient('https://beans.azure-mobile.net/', 'PzOgnOzLrLxdRmTcMawYYxkBZdvxXo80');

$(document).ready(function () {
    var category = function(item) {
        this.id = ko.observable(item.id);
        this.VATCategoryNameEn = ko.observable(item.VATCategoryNameEn);
        this.VATPercentage = ko.observable(item.VATPercentage);
    };
    var tbl = AZUREClient.getTable('FiVatCategory');
    var categoryViewModel = function () {
        var self = this;
        
        self.getCategories = function (val) {
            console.log("call GetCategories");
            tbl.read({ VATCategoryNameEn: val }).done(
              function (d) {
                  self.items($.map(d, function (item) {
                      return new category(item);
                  }));
              });
        };
        self.saveCategory = function(val) {
            tbl.insert(val).done(function (d) {
                self.detailView(false);//hide view
                self.items.push(val);
            }, function (err) {
                alert(err);
            });
        };
        self.deleteCategory = function (val) {
            tbl.del({ id: val }).done(function (d) {
                self.detailView(false);//hide view
            }, function (err) {
                alert(err);
            });
        };
        
        self.items = ko.observableArray(self.getCategories(''));
        self.selectedCategory = ko.observable();
        self.detailView = ko.observable(false);
        
        self.searchText = ko.observable();
        self.searchCategory = ko.computed(this.searchText).extend({ throttle: 700 });
        
        //Functionet
        self.selectCategory = function (element) {
            self.selectedCategory(element);
            self.detailView(true);
        };
        
        self.save = function (elementToSelect) {
            var element = ko.toJS(elementToSelect);
            self.saveCategory(element);
            self.selectedCategory(null);
            self.detailView(false);
        };
        self.delete = function (elementToDelete) {
            var element = ko.toJS(self.selectedCategory);
            self.deleteCategory(element.id);
            self.items.remove(elementToDelete);
            //self.selectedCategory(null);
            //
        };
        
        

        self.searchCategory.subscribe(function (val) {
            self.getCategories(val);
        }, this);
    }.bind(this);
    ko.applyBindings(new categoryViewModel());
});