$(document).ready(function () {
    // this.default = function () {
    //ej.grids.Grid.Inject(ej.grids.Search, ej.grids.Edit, ej.grids.Toolbar,ej.grids.Page, ej.grids.Filter);
    ej.grids.Grid.Inject(
      ej.grids.Sort,
      ej.grids.Group,
      ej.grids.Search,
      ej.grids.Toolbar,
      ej.grids.Page,
      ej.grids.Filter
    );
  
    // var hostUrl = '/api/posts/clientview';
  
    var hostUrl = "/api/invoice/code?type=prontoservice";
    let ajax = new ej.base.Ajax(hostUrl, "post");
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
        insertUrl: hostUrl + "BatchData",
        updateUrl: hostUrl + "BatchData",
        removeUrl: hostUrl + "BatchData",
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
        toolbar: ["Search"], //ExcelExport
        //toolbar: ['Search'],
        gridLines: 'Default',
        allowTextWrap: true,
        textWrapSettings: { wrapMode: 'Content' },
        // editSettings: {
        //   allowEditing: true,
        //   allowAdding: true,
        //   allowDeleting: true,
        //   mode: "Dialog",
        // },
        columns: [
          {
            field: "id",
            headerText: "Code",
            isPrimaryKey: true,
            textAlign: "Left",
            width: 100,
          },
          {
            field: "value",
            headerText: "Service",
            validationRules: { required: true },
            width: 100,
          },
        ],
        pageSettings: { pageCount: 5 },
      });
  
      // grid.toolbarClick = function (args) {
      //   if (args["item"].id === "Grid_pdfexport") {
      //     grid.pdfExport();
      //   }
      // };
  
      grid.appendTo("#Grid");
    };
  });
  