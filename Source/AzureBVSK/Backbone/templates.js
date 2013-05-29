_.templateSettings.interpolate = /\{\{(.*?)\}\}/g;
var App = App || {};
(function (App) {
    var Templates = {};
    Templates.VatCategory = [
        "<a href='vatCategory.id'>",
        "<h3>{{vatCategory.VATCategoryNameEn}}</h3>",
        "<p>{{vatCategory.VATPercentage}}</p>"
    ].join("\n");

    Templates.VatCategorys = [
        "<ul data-role='listview' data-theme='d' data-inset='true'>",
        "</ul>"
    ].join("\n");
    Templates.VatCategoryEdit = [
        "<div id='DivDetailView' class='ui-block-b' style='width: 69%; padding-left: 30px; padding-top: 0px; padding-right: 0px;'>",
        "<div class='ui-body ui-body-a'>",
            "<div class='ui-block-a'>",
                "<input class='item-text' value='{{vatCategory.VATPercentage}}'>",
           " </div>",
            "<div class='ui-block-b'>",
                "<input class='item-text' value='{{vatCategory.VATCategoryNameEn}}'>",
            "</div>",
            "<div class='ui-block-c'>",
                "<button type='button' data-theme='c'>Save</button></div>",
        "</div>",
    "</div>"
    ].join("\n");
;
    for (var temp in Templates) {
        if (Templates.hasOwnProperty(temp)) {
            Templates[temp] = _.template(Templates[temp]);
        }
    }

    App.Templates = Templates;
})(App);
