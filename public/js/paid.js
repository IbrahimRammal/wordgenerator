$( document ).ready(function() {
    // this.default = function () {
    //ej.grids.Grid.Inject(ej.grids.Search, ej.grids.Edit, ej.grids.Toolbar,ej.grids.Page, ej.grids.Filter);
    ej.grids.Grid.Inject(ej.grids.PdfExport,ej.grids.ExcelExport,ej.grids.Sort, ej.grids.Group, ej.grids.Search, ej.grids.Edit, ej.grids.Toolbar,ej.grids.Page, ej.grids.Filter);

    // var hostUrl = '/api/posts/clientview';



    var hostUrl = '/api/posts/'
    let ajax = new ej.base.Ajax(hostUrl + "Paid/GetData", "post");
    ajax.send();
    ajax.onSuccess = function (result) {
        //grid.dataSource = JSON.parse(data);
        //alert(result)

        var data = new ej.data.DataManager({
            //url: hostUrl + "GetData",
            // crudUrl: hostUrl + "BatchData",   
            // adaptor: new ej.data.WebMethodAdaptor(),
            // crossDomain: true,
            // offline: true
            json: JSON.parse(result),
            adaptor: new ej.data.RemoteSaveAdaptor(), //remote save adaptor 
            insertUrl: hostUrl + "Paid/BatchData", 
            updateUrl: hostUrl + "Paid/BatchData", 
            removeUrl: hostUrl + "Paid/BatchData"
        });

        //alert(result)

        var grid = new ej.grids.Grid({
            dataSource: data,
            allowPaging: true,
            // allowSearching : true,
            allowGrouping: true,
            allowFiltering: true,
            allowSorting: true,
            allowMultiSorting: true,
            // allowExcelExport: true,
            // allowPdfExport: true,
            // searchSettings: { fields: ['fullname'] , operator: 'contains', key: 'test', ignoreCase: true},
            toolbar: ['Add', 'Edit', 'Delete', 'Search','','','','','','',''], //ExcelExport PdfExport
            //toolbar: ['Search'],
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' }, //, allowDeleting: true
            columns: [
                {
                    field: 'fullname', headerText: 'fullname',
                    validationRules: { required: true }, width: 100
                },
                {
                    field: '_id', headerText: 'Client ID', isPrimaryKey: true, textAlign: 'center', width: 120, visible: false 
                }, 
                {
                    field: 'name', headerText: 'name', textAlign: 'Left', width: 100
                },
                {
                    field: 'surname', headerText: 'surname', textAlign: 'Left',
                    width: 100
                },
                {
                    field: 'father', headerText: 'father', textAlign: 'Left',
                    width: 100
                },
                {
                    field: 'mobile', headerText: 'phone', textAlign: 'Left', width: 100
                },
                {
                    field: 'address', headerText: 'address', textAlign: 'Left', width: 100
                }
                // {
                //     field: 'placeofbirthlocal', headerText: 'Place Of Birth', textAlign: 'Left', width: 120
                // },
                // {
                //     field: 'dateofbirth', headerText: 'Date Of Birth', type: 'date', textAlign: 'Center', width: 120, format: { type:'date', format:'dd.MM.yyyy' } ,editType: 'datepickeredit', edit: { params: { format:'dd.MM.yyyy' }  }
                // },
                // {
                //     field: 'noregistry', headerText: 'Registry', textAlign: 'Left', width: 100
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
