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

  var hostUrl = "/api/actions/history/";
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
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Dialog",
      },
      columns: [
        {
          field: "fullname",
          headerText: "fullname",
          validationRules: { required: true },
          width: 100,
        },
        {
          field: "_id",
          headerText: "Client ID",
          isPrimaryKey: true,
          textAlign: "Left",
          width: 120,
          visible: false,
        },
        {
          field: "action",
          headerText: "action",
          validationRules: { required: true },
          width: 100,
        },
        {
          field: "created_at",
          headerText: "created_at",
          textAlign: "Left",
          width: 100,
          //   visible: false,
          allowEditing: false,
          type: "datetime",
          format: "dd/MM/yyyy hh:mm a",
        },
        {
          field: "details",
          headerText: "details",
          textAlign: "Left",
          width: 200,
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

// grid.appendTo('#Grid');

// let button = document.getElementById('btn');
// button.addEventListener("click", function(e){
// let ajax = new ej.base.Ajax("http://192.168.0.100:4000/api/posts/clientview", "GET");
// ajax.send();
// ajax.onSuccess = function (data) {
//     grid.dataSource = JSON.parse(data);
// };
// });
