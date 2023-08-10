$( document ).ready(function() {
    // this.default = function () {
    //ej.grids.Grid.Inject(ej.grids.Search, ej.grids.Edit, ej.grids.Toolbar,ej.grids.Page, ej.grids.Filter);
    ej.grids.Grid.Inject(ej.grids.PdfExport,ej.grids.ExcelExport,ej.grids.Sort, ej.grids.Group, ej.grids.Search, ej.grids.Edit, ej.grids.Toolbar,ej.grids.Page, ej.grids.Filter);

    // var hostUrl = '/api/posts/clientview';



    var hostUrl = '/api/invoice/'
    let ajax = new ej.base.Ajax(hostUrl + "GetExpenseTypeCode", "post");
    ajax.send();
    ajax.onSuccess = function (result) {
        //grid.dataSource = JSON.parse(data);
        //alert(result)

        var data = new ej.data.DataManager({
            //url: hostUrl + "GetDataPronto",
            // crudUrl: hostUrl + "BatchData",   
            // adaptor: new ej.data.WebMethodAdaptor(),
            // crossDomain: true,
            // offline: true
            json: JSON.parse(result),
            adaptor: new ej.data.RemoteSaveAdaptor(), //remote save adaptor 
            insertUrl: hostUrl + "ExpenseCodeManage", 
            updateUrl: hostUrl + "ExpenseCodeManage", 
            removeUrl: hostUrl + "ExpenseCodeManage"
        });

        //alert(result)

        var grid = new ej.grids.Grid({
            dataSource: data,
            allowPaging: true,
            allowTextWrap: true,
            // allowSearching : true,
            allowGrouping: true,
            allowFiltering: true,
            allowSorting: true,
            allowMultiSorting: true,
            // allowExcelExport: true,
            allowPdfExport: true,
            // searchSettings: { fields: ['fullname'] , operator: 'contains', key: 'test', ignoreCase: true},
            toolbar: ['Add', 'Edit', 'Delete', 'Search','','','','','','',''], //ExcelExport /PdfExport
            //toolbar: ['Search'],
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog',showDeleteConfirmDialog: true },
            columns: [
                {
                    field: 'expenseType', headerText: 'ExpenseType',
                    validationRules: { required: true }, width: 100
                },
                {
                    field: '_id', headerText: 'Project ID', isPrimaryKey: true, textAlign: 'center', width: 120, visible: false 
                }, 
                {
                    field: 'name', headerText: 'name', textAlign: 'Left',
                    validationRules: { required: true }, width: 100, visible: false
                },
                {
                    field: 'namea', headerText: 'surname', textAlign: 'Left',
                    width: 100, visible: false
                },
                {
                    field: 'father', headerText: 'father', textAlign: 'Left',
                    width: 100, visible: false
                }
            ],
            pageSettings: { pageCount: 5 },
        });
    

        grid.toolbarClick = function(args){
            if (args['item'].id === 'Grid_pdfexport') {
                grid.pdfExport();
            }
         }

        grid.appendTo('#Grid');


    };


});


// grid.appendTo('#Grid');

// let button = document.getElementById('btn');
// button.addEventListener("click", function(e){
// let ajax = new ej.base.Ajax("http://192.168.0.100:4000/api/posts/clientview", "GET");
// ajax.send();
// ajax.onSuccess = function (data) {
//     grid.dataSource = JSON.parse(data);
// };
// });
