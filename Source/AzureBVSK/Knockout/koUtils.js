var App = App || {};
App.service = new WindowsAzure.MobileServiceClient('https://beans.azure-mobile.net/', 'PzOgnOzLrLxdRmTcMawYYxkBZdvxXo80');
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