$(document).ready(function () {
  var categoryObj;

  var category = [
    { categoryName: "Counter", categoryId: "1" },
    { categoryName: "Income", categoryId: "2" },
  ];

  var typeObj;

  var type = [
    { typeName: "PRONTO", typeId: "1" },
    { typeName: "SWORN LEGAL", typeId: "2" },
    { typeName: "UNOFFICIAL", typeId: "3" }
  ];

  ej.grids.Grid.Inject(ej.grids.PdfExport,ej.grids.ExcelExport,ej.grids.Sort, ej.grids.Group, ej.grids.Search, ej.grids.Edit, ej.grids.Toolbar,ej.grids.Page, ej.grids.Filter);

  // var hostUrl = '/api/posts/clientview';

  var hostUrl = "/api/demofire/";
  let ajax = new ej.base.Ajax(hostUrl + "Counter/GetData", "post");
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
      insertUrl: hostUrl + "Counter/BatchData",
      updateUrl: hostUrl + "Counter/BatchData",
      removeUrl: hostUrl + "Counter/BatchData"
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
      allowPdfExport: true,
      allowTextWrap: true,
      textWrapSettings: { wrapMode: 'Content' },
      // searchSettings: { fields: ['fullname'] , operator: 'contains', key: 'test', ignoreCase: true},
    //   allowTextWrap: true,
    //   textWrapSettings: { wrapMode: "Content" },
      toolbar: [
        "",
        "Edit",
        "",
        "Search",
        "",
        "",
        "",
        "",
        "",
        "",
        "", //PdfExport
      ], //ExcelExport
      //toolbar: ['Search'],
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Dialog",
        showDeleteConfirmDialog: true 
      }, //, allowDeleting: true
      columns: [
        {
          field: "name",
          headerText: "Invoice type",
          isPrimaryKey: true,
          validationRules: { required: true },
          width: 100,
          visible: true,
          allowEditing: false,
        },
        {
          field: "_id",
          //headerText: "Client ID",
          isPrimaryKey: true,
          textAlign: "center",
          width: 120,
          visible: false,
        },
        {
          field: "number",
          headerText: "Counter",
          textAlign: "Left",
          width: 100,
          type: "number",
          visible: true,
          //   validationRules: { required: true },
        },
        {
          field: "total",
          headerText: "total",
          textAlign: "Left",
          width: 100,
          type: "number",
          DefaultValue: 0,
          valueAccessor: currencyFormatter,
          visible: false,
          //   validationRules: { required: true },
        },
        {
          field: "created_at",
          headerText: "created_at",
          textAlign: "Left",
          width: 120,
          //   visible: false,
          allowEditing: false,
          type: "datetime",
          format: "dd/MM/yyyy hh:mm a",
          visible: false,
        },
        {
          field: "updated_at",
          headerText: "updated_at",
          textAlign: "Left",
          width: 120,
          //   visible: false,
          allowEditing: false,
          type: "datetime",
          format: "dd/MM/yyyy hh:mm a",
          visible: false,
        },
        {
          field: "phone",
          headerText: "Phone",
          textAlign: "Left",
          width: 100,
          type: "number",
          visible: false,
          //visible: false,
        },
        {
          field: "address",
          headerText: "address",
          textAlign: "Left",
          width: 100,
          visible: false,
        },
        {
          field: "note",
          headerText: "Note",
          textAlign: "Left",
          width: 100,
          visible: false,
        },
      ],
      actionComplete: function (args) {
        //console.log(args.requestType);
        // if (args.requestType === "delete") {
        //   return;
        // }
        // let dialog = args.dialog;
        // // dialog.height = 350;
        // // change the header of the dialog
        // if( dialog != null)
        // dialog.header =
        //   args.requestType === "beginEdit" ? "Edit Record" : "New Record";

        if (args.requestType === "save" || args.requestType === "beginEdit") {
          let dialog = args.dialog;
          // dialog.height = 350;
          // change the header of the dialog
          dialog.header =
            args.requestType === "beginEdit" ? "Edit Record" : "New Record";
          //Change header remains
          console.log(args);
          for (var i = 0; i < this.columns.length; i++) {
            if (
              this.columns[i].field == "created_at" ||
              this.columns[i].field == "updated_at"
            ) {
              //this.columns[i].visible = true;
            }
          }
        }
      },
      actionFailure: (e) => {
        var span = document.createElement("span");
        grid.element.parentNode.insertBefore(span, grid.element);
        span.style.color = "#FF0000";
        span.innerHTML = "Server exception: 404 Not found";
      },
      cellSelected: (args) => {
        //console.log(args.data.href);
        //console.log(args.currentCell.outerText);
        if (args.currentCell.outerText == "download") {
          var urlDownload = args.data.href;
          var currentDate = new Intl.DateTimeFormat("fr-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(Date.now());
        }
      },
      pageSettings: { pageCount: 10 },
    });

    grid.toolbarClick = function (args) {
      if (args["item"].id === "Grid_pdfexport") {
        grid.pdfExport();
      }
    };

    grid.appendTo("#Grid");
    

    function currencyFormatter(field, data, column) {
      //console.log(column);
      //console.log(field);
      if (data[field] == null) data[field] = 0;

      return data[field] + " LBP";
    }

    function totalRemains(field, data, column) {
      return data.total - data.paid + " LBP";
    }
  };
});
