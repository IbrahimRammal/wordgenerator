$( document ).ready(function() {
    // this.default = function () {
    //ej.grids.Grid.Inject(ej.grids.Search, ej.grids.Edit, ej.grids.Toolbar,ej.grids.Page, ej.grids.Filter);
    ej.grids.Grid.Inject(ej.grids.PdfExport,ej.grids.ExcelExport,ej.grids.Sort, ej.grids.Group, ej.grids.Search, ej.grids.Edit, ej.grids.Toolbar,ej.grids.Page, ej.grids.Filter);

    // var hostUrl = '/api/posts/clientview';



    var hostUrl = '/api/invoice/'
    let ajax = new ej.base.Ajax(hostUrl + "GetDataTransaction", "post");
    ajax.send();
    ajax.onSuccess = function (result) {
        //grid.dataSource = JSON.parse(data);
        //alert(result)

        var data = new ej.data.DataManager({
            //url: hostUrl + "GetDataSworn",
            // crudUrl: hostUrl + "BatchData",   
            // adaptor: new ej.data.WebMethodAdaptor(),
            // crossDomain: true,
            // offline: true
            json: JSON.parse(result),
            adaptor: new ej.data.RemoteSaveAdaptor(), //remote save adaptor 
            insertUrl: hostUrl + "Transaction", 
            updateUrl: hostUrl + "Transaction", 
            removeUrl: hostUrl + "Transaction"
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
            sortSettings: { columns: [{ field: 'created_at', direction: 'descending' }] },
            // searchSettings: { fields: ['fullname'] , operator: 'contains', key: 'test', ignoreCase: true},
            toolbar: ['Add', 'Edit', 'Delete', 'Search','','','','','','',''], //ExcelExport /PdfExport
            //toolbar: ['Search'],
            //allowEditing: true, allowAdding: true, allowDeleting: true,
            editSettings: {   mode: 'Dialog',showDeleteConfirmDialog: true },
            columns: [
                // paidClinetName: query[i].paidClinetName,
                // voucherAddress: query[i].voucherAddress,
                // voucherType: query[i].voucherType,
                // invoiceType: query[i].invoiceType,
                // invoiceAddress: query[i].invoiceAddress,
                // invoiceNumber: query[i].invoiceNumber,
                // rate: query[i].rate,
                // currency: query[i].currency,
                // ready: query[i].ready,
                // deleted: query[i].deleted,
                // flag: query[i].flag,
                // total: query[i].total,
                // paidClinetName: query[i].paidClinetName,
                // paidClientID: query[i].paidClientID,
                // counter: query[i].counter,
                // debit: query[i].debit,
                // credit: query[i].credit

                {
                    field: 'paidClinetName', headerText: 'Client',
                    validationRules: { required: true }, width: 100
                },
                {
                    field: '_id', headerText: '_id', isPrimaryKey: true, textAlign: 'center', width: 120, visible: false 
                }, 
                {
                    field: 'voucherAddress', headerText: 'voucherAddress', textAlign: 'Left',
                    validationRules: { required: true }, width: 100, visible: false
                },
                {
                    field: "created_at",
                    headerText: "Create Date",
                    textAlign: "Left",
                    width: 100,
                    //   visible: false,
                    allowEditing: false,
                    type: "datetime",
                    format: "dd/MM/yyyy hh:mm",
                },
                {
                    field: 'voucherType', headerText: 'voucherType', textAlign: 'Left',
                    width: 100, visible: false
                },
                {
                    field: 'invoiceType', headerText: 'invoiceType', textAlign: 'Left',
                    width: 100, visible: true
                },
                {
                    field: 'invoiceAddress', headerText: 'invoiceAddress', textAlign: 'Left',
                    width: 100, visible: false
                },
                {
                    field: 'rate', headerText: 'rate', textAlign: 'Left',
                    width: 100, visible: true
                },
                {
                    field: 'currency', headerText: 'currency', textAlign: 'Left',
                    width: 100, visible: true
                },
                {
                    field: 'paidClientID', headerText: 'paidClientID', textAlign: 'Left',
                    width: 100, visible: false
                },
                {
                    field: 'invoiceType', headerText: 'invoiceType', textAlign: 'Left',
                    width: 100, visible: false
                },
                {
                    field: 'debit', headerText: 'debit', textAlign: 'Left',
                    width: 100, visible: true
                },
                {
                    field: 'credit', headerText: 'credit', textAlign: 'Left',
                    width: 100, visible: true
                },
                // {
                //     field: 'counter', headerText: 'counter', textAlign: 'Left',
                //     width: 100, visible: true
                // }
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
