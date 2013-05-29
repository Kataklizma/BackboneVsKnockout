$(function () {
    var client = new WindowsAzure.MobileServiceClient('https://beans.azure-mobile.net/', 'PzOgnOzLrLxdRmTcMawYYxkBZdvxXo80'),
        todoItemTable = client.getTable('FiVatCategory');

    // Read current data and rebuild UI.
    // If you plan to generate complex UIs like this, consider using a JavaScript templating library.
    function refreshTodoItems(searchValue) {
        var query = todoItemTable.read({ VATCategoryNameEn: searchValue }).then(function (todoItems) {
            var listItems = $.map(todoItems, function (item) {
                return $('<li>')
                    .attr('data-todoitem-id', item.id)
                    .append($('<a>')
                        .append($('<h3>').append((item.VATCategoryNameEn)))
                        .append($('<i>').append(' 3000 xxx'))
                        .append('<button class="item-edit">Edit</button>'));
            });

            $('#todo-items').empty().append(listItems);

            $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
            $('#todo-items').listview('refresh');
        });
    }

    function getTodoItemId(formElement) {
        return Number($(formElement).closest('li').attr('data-todoitem-id'));
    }

    function getTodoItemId2(formElement) {
        return Number($(formElement).closest('div').attr('data-todoitem-id'));
    }

    // Handle insert
    $('#add-item').submit(function (evt) {
        var textbox = $('#new-item-text'),
            itemText = textbox.val();
        if (itemText !== '') {
            todoItemTable.insert({ vatcategorynameen: itemText, active: false }).then(refreshTodoItems('lale1'));
        }
        textbox.val('').focus();
        evt.preventDefault();
    });

    // Handle Search
    $(document.body).on('change', '.itemsFind', function () {
        var searchValue = $(this).val();
        //todoItemTable.update({ id: getTodoItemId(this), vatcategorynameen: newText });

        refreshTodoItems(searchValue);
    });

    // Handle update
    $(document.body).on('change', '.item-text', function () {
        var newText = $(this).val();
        todoItemTable.update({ id: getTodoItemId(this), vatcategorynameen: newText });
    });

    $(document.body).on('change', '.item-complete', function () {
        var isComplete = $(this).prop('checked');
        todoItemTable.update({ id: getTodoItemId(this), active: isComplete }).then(refreshTodoItems('lale1'));
    });

    // Handle delete
    $(document.body).on('click', '.item-delete', function () {
        todoItemTable.del({ id: getTodoItemId(this) }).then(refreshTodoItems('lale1'));
    });


    // Handle edit 2
    $(document.body).on('click', '.item-edit-detail', function () {
        //alert(getTodoItemId2(this));
        var query = todoItemTable.where({ id: getTodoItemId2(this) }).read({ VATCategoryNameEn: '' }).done(function (results) {
            //            alert(results);
            var innerDiv2 = $.map(results, function (value) {
                return $('<div class="ui-body ui-body-a">')
                .attr('data-todoitem-id', value.id)
                .append('<button style ="text-align:right; float:right" class="item-save-detail">Save</button>')
                .append($('<div>').append($('<input class="item-text">').val(value.VATPercentage)))
                //.append('</br>').append(value.VATCategoryNameEn).append('')
                .append($('<div>').append($('<input class="item-text">').val(value.VATCategoryNameEn)));
            });

            $('#DivDetailView').empty().append(innerDiv2);
            //            alert(value.id);

            //--error handling
        }, function (err) {
            alert("Error: " + err);
            //--error handling
        });
    });

    // Handle edit
    $(document.body).on('click', '.item-edit', function (e) {

        var query = todoItemTable.where({ id: getTodoItemId(this) }).read({ VATCategoryNameEn: '' }).done(function (results) {

            //            alert(results);
            var innerDiv = $.map(results, function (value) {
                return $('<div class="ui-body ui-body-a">')
                .attr('data-todoitem-id', value.id)
                //.append($('<div><h3>' + myFiVATCategory.VATPercentage + "% - " + myFiVATCategory.VATCategoryNameCur)
                //                .append($('<div>').append($('<h3>').val(value.VATCategoryNameCur)))
                .append(value.VATPercentage).append('%')
                //.append($('<input type="button" id="btnNewEntity" value="Edit" class="button" onclick="newEntity();" data-theme="b" />'))
                .append('<button style ="text-align:right; float:right" class="item-edit-detail">Edit</button>')
                //                .append($('<div style ="text-align:right; float:right"><a href="" data-role="button" id="btnNewEntity" onclick="" data-icon="grid" data-theme="b">Edit</a></div>'))
                .append('</br>').append(value.VATCategoryNameEn).append('')
                //.append($('<div>').append($('<input class="item-text">').val(value.VATCategoryNameEn)));


            });

            $('#DivDetailView').empty().append(innerDiv);
            //$('#DivDetailView').html(innerDiv); 
            //'<strong>hello ' + _.pluck(results, 'VATCategoryNameEn') + '</strong> world');
        }, function (err) {
            alert("Error: " + err);
        });
        //        //-------

        //taking a shortcut. with org this was: query.read(.... 
        //with read({....}) server side code can access the parameters: request.parameters.VATCategoryNameEn



        //        ////////TEMPLATE////////
        //        //this.template = _.template($("script#vatCategoryItems").html(), { "searchResultCollection": this.results });             
        //        var tmplMarkup = $('#vatCategoryDetailView').html();
        //        var compiledTmpl = _.template(tmplMarkup, { searchResultCollection: results });
        //        $('#DivDetailView').html(compiledTmpl);
        //        ////////TEMPLATE////////


    });

    // On initial load, start by fetching the current data
    refreshTodoItems('');
});