var App = App || {};
ko.protectedObservable = function (initialValue) {
    var _temp = initialValue;
    var _actual = ko.observable(initialValue);

    var result = ko.dependentObservable({
        read: _actual,
        write: function (newValue) {
            _temp = newValue;
        }
    });
    result.commit = function () {
        if (_temp !== _actual()) {
            _actual(_temp);
        }
    };
    result.reset = function () {
        _actual.valueHasMutated();
        _temp = _actual();
    };

    return result;
};
(function (ko, undefined) {
    ko.BaseCRUDViewModel = function () {
        var self = this;
        self.Table = '';
        self.items = ko.observableArray([]);
        self.selectedItem = ko.observable();
        self.searchText = ko.observable();
        self.searchItem = ko.computed(self.searchText).extend({ throttle: 700 });
        self.detailView = ko.observable(false);
        self.isInEditMode = ko.observable(false);
        self.isLoggedIn = ko.observable(App.service.currentUser !== null);

        self.selectItem = function (item) {
            self.isInEditMode(false);
            self.selectedItem(item);
            self.detailView(true);
        };
        self.addItem = function () {
            var newItem = self.DefaultModel();
            self.selectedItem(newItem);
            self.detailView(true);
            self.isInEditMode(true);
        };

        self.deleteItem = function (itemToDelete) {
            self.detailView(false);
            self.items.remove(itemToDelete);
            self.selectedItem(null);
        };

        self.editItem = function (item) {
            self.selectedItem(item);
            self.detailView(true);
            self.isInEditMode(true);
        };

        self.saveItem = function () {
            self.selectedItem().commitAll();
            var objectData = ko.toJS(self.selectedItem());
            self.saveData(objectData);
            self.detailView(true);
            self.isInEditMode(false);

        };

        self.cancelItem = function () {
            if (self.selectedItem().id === undefined) {
                self.selectedItem(null);
                self.detailView(false);
                self.isInEditMode(false);
            }
            else {
                self.selectedItem().resetAll();
                self.detailView(true);
                self.isInEditMode(false);
            }

        };
        self.saveData = function (val) {
            if (val.id != undefined && val.id > 0) {
                self.Table.update(val).done(function (d) {
                }, function (err) {
                    alert(err);
                });
            } else {
                self.Table.insert(val).done(function (d) {
                    var newItem = self.DefaultModel(d);
                    self.items.push(newItem);
                }, function (err) {
                    alert(err);
                });
            }
        };
        self.searchData = function (val) {
            self.detailView(false);
            self.selectedItem(null);
            self.Table.read({ SearchString: val }).done(
              function (d) {
                  self.items($.map(d, function (item) {
                      return self.DefaultModel(item);
                  }));
              }, function (err) {
                  alert(err);
              });
        };
        self.searchItem.subscribe(function (val) {
            self.searchData(val);
        });
        self.Menu = function () {//Every page should have button to meny
            $.mobile.changePage("/Beans/CuberryCommon/Menu.html", { transition: "slidedown" });
        };

        self.LogInLogOut = function () {
            var isLoggin = self.isLoggedIn();
            if (isLoggin === false) {
                App.service.login("google").then(function () {
                    self.isLoggedIn(App.service.currentUser !== null);
                    self.searchData('');
                }, function (error) {
                    alert(error);
                });
            } else {
                App.service.logout();
                self.isLoggedIn(false);
                $.mobile.changePage("/Beans/Index.html", { transition: "slideup" });
            }
        };
        self.LogInLogOutText = ko.computed(function () {
            if (self.isLoggedIn() === true) {
                return 'LogOut';
            }
            return "LogIn";
        });
    };
}(ko));
function parseDate(date) {
    /// <summary>
    /// Parses the cuberryItem date to give a more readable format.
    /// </summary>
    var diff = (new Date() - new Date(date)) / 1000;

    if (diff < 60) {
        return diff.toFixed(0) + " seconds ago";
    }

    diff = diff / 60;
    if (diff < 60) {
        return diff.toFixed(0) + " minutes ago";
    }

    diff = diff / 60;
    if (diff < 10) {
        return diff.toFixed(0) + " hours ago";
    }

    diff = diff / 24;

    if (diff.toFixed(0) === 1) {
        return diff.toFixed(0) + " day ago";
    }

    return diff.toFixed(0) + " days ago";
}