var App = App || {};
(function (App) {
    var FiVatCategory = {};
    FiVatCategory.Model = function (item) {
        item = item || {};
        this.id = item.id;
        this.VATCategoryNameEn = ko.protectedObservable(item.VATCategoryNameEn);
        this.VATPercentage = ko.protectedObservable(item.VATPercentage);
    };
    FiVatCategory.ViewModel = function () {
        var self = this;
        //Functions
        this.init = function (val) {
            FiVatCategory.Table = App.service.getTable('FiVatCategory');
            self.searchData(val);
        };
        this.searchData = function (val) {
            FiVatCategory.Table.read({ VATCategoryNameEn: val }).done(
              function (d) {
                  self.items($.map(d, function (item) {
                      return new FiVatCategory.Model(item);
                  }));
              });
        };
        this.saveData = function (val) {
            if (val.id != undefined && val.id > 0) {
                FiVatCategory.Table.update(val).done(function (d) {
                }, function (err) {
                    alert(err);
                });
            } else {
                FiVatCategory.Table.insert(val).done(function (d) {
                    var newItem = new FiVatCategory.Model(d);
                    self.items.push(newItem);
                }, function (err) {
                    alert(err);
                });
            }
        };
        //Observables
        this.items = ko.observableArray([]);
        this.selectedItem = ko.observable();
        this.searchText = ko.observable();
        this.search = ko.computed(this.searchText).extend({ throttle: 700 });
        this.detailView = ko.observable(false);
        this.isInEditMode = ko.observable(false);

        //events
        this.selectItem = function (item) {
            self.isInEditMode(false);
            self.selectedItem(item);
            self.detailView(true);
        };
        this.addItem = function () {
            var newItem = new FiVatCategory.Model({ id: undefined, VATCategoryNameEn: "name", VATPercentage: 1 });
            self.selectedItem(newItem);
            self.detailView(true);
            self.isInEditMode(true);
        };

        this.deleteItem = function (itemToDelete) {
            self.detailView(false);
            self.items.remove(itemToDelete);
            self.selectedItem(null);
        };

        this.editItem = function (item) {
            self.selectedItem(item);
            self.detailView(true);
            self.isInEditMode(true);
        };

        this.save = function () {
            self.selectedItem().VATCategoryNameEn.commit();
            self.selectedItem().VATPercentage.commit();
            var vatCategory = ko.toJS(self.selectedItem());
            self.saveData(vatCategory);
            self.selectedItem(null);
            self.detailView(false);
            self.isInEditMode(false);

        };

        this.cancel = function () {
            if (self.selectedItem().id === undefined) {
                self.selectedItem(null);
                self.detailView(false);
                self.isInEditMode(false);
            }
            else {
                self.selectedItem().VATCategoryNameEn.reset();
                self.selectedItem().VATPercentage.reset();
                self.detailView(true);
                self.isInEditMode(false);
            }

        };
        this.search.subscribe(function (val) {
            self.searchData(val);
        }, this);
    };
    App.FiVatCategory = FiVatCategory;
})(App);
$(document).ready(function () {
    var vm = new App.FiVatCategory.ViewModel();
    vm.init('');
    ko.applyBindings(vm);
});