var App = App || {};
var AZUREClient = new WindowsAzure.MobileServiceClient('https://beans.azure-mobile.net/', 'PzOgnOzLrLxdRmTcMawYYxkBZdvxXo80');

$(document).ready(function () {
    var tbl = AZUREClient.getTable('FiVatCategory');
    var categoryViewModel = function () {
        var self = this;
        this.items = ko.observableArray();
        
        self.getCategories = function (val) {
            tbl.read({ VATCategoryNameEn: val }).done(
              function (d) {
                  self.items(d);
              });
        };
        this.searchText = ko.observable();
        
        this.searchCategory = ko.computed(this.searchText).extend({ throttle: 700 });

        this.searchCategory.subscribe(function (val) {
            self.getCategories(val);
        }, this);
    }.bind(this);
    ko.applyBindings(new categoryViewModel());
});