$(document).ready(function () {
  var categoryObj;

  var category = [
    { categoryName: "Expenses", categoryId: "1" },
    { categoryName: "Income", categoryId: "2" },
  ];

  ej.grids.Grid.Inject(ej.grids.PdfExport,ej.grids.ExcelExport,ej.grids.Sort, ej.grids.Group, ej.grids.Search, ej.grids.Edit, ej.grids.Toolbar,ej.grids.Page, ej.grids.Filter);

  // var hostUrl = '/api/posts/clientview';

  var hostUrl = "/api/posts/";
  let ajax = new ej.base.Ajax(hostUrl + "Expense/GetData", "post");
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
      insertUrl: hostUrl + "Expense/BatchData",
      updateUrl: hostUrl + "Expense/BatchData",
      removeUrl: hostUrl + "Expense/BatchData"
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
      // searchSettings: { fields: ['fullname'] , operator: 'contains', key: 'test', ignoreCase: true},
    //   allowTextWrap: true,
    //   textWrapSettings: { wrapMode: "Content" },
      toolbar: [
        "Add",
        "Edit",
        "Delete",
        "Search",
        "",
        "",
        "",
        "",
        "",
        "",
        "PdfExport",
      ], //ExcelExport
      //toolbar: ['Search'],
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Dialog",
      }, //, allowDeleting: true
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
          textAlign: "center",
          width: 120,
          visible: false,
        },
        {
          field: "category",
          headerText: "category",
          textAlign: "Left",
          width: 100,
          edit: {
            create: function () {
              categoryElem = document.createElement("input");
              return categoryElem;
            },
            read: function () {
              return categoryObj.text;
            },
            destroy: function () {
              categoryObj.destroy();
            },
            write: function (args) {
              var initialValue = args.rowData.category;
              console.log(initialValue);

              categoryObj = new ej.dropdowns.DropDownList({
                dataSource: category,
                fields: { value: "categoryId", text: "categoryName" },
                change: function () {
                  //stateObj.enabled = true;
                  // var tempQuery = new Query().where(
                  //   "categoryId",
                  //   "equal",
                  //   categoryObj.value
                  // );
                  //stateObj.query = tempQuery;
                  //stateObj.text = null;
                  //stateObj.dataBind();
                },
                DefaultValue: initialValue,
                placeholder: "Select a category",
                // itemTemplate: initialValue,
                // valueTemplate: initialValue,

                floatLabelType: "Never",
              });
              categoryObj.appendTo(categoryElem);
            },
          },
          //   validationRules: { required: true },
        },
        // {
        //   field: "paymentMode",
        //   headerText: "paymentMode",
        //   textAlign: "Left",
        //   visible: false,
        //   width: 100,
        //   edit: {
        //     create: function () {
        //       paymentModeElem = document.createElement("input");
        //       return paymentModeElem;
        //     },
        //     read: function () {
        //       return paymentModeObj.text;
        //     },
        //     destroy: function () {
        //       paymentModeObj.destroy();
        //     },
        //     write: function () {
        //       paymentModeObj = new ej.dropdowns.DropDownList({
        //         dataSource: paymentMode,
        //         fields: { value: "paymentModeId", text: "paymentModeName" },
        //         change: function () {
        //           //stateObj.enabled = true;
        //           // var tempQuery = new Query().where(
        //           //   "categoryId",
        //           //   "equal",
        //           //   categoryObj.value
        //           // );
        //           //stateObj.query = tempQuery;
        //           //stateObj.text = null;
        //           //stateObj.dataBind();
        //         },
        //         placeholder: "Select a payment mode",
        //         floatLabelType: "Never",
        //       });
        //       paymentModeObj.appendTo(paymentModeElem);
        //     },
        //   },
        //   //   validationRules: { required: true },
        // },
        {
          field: "paid",
          headerText: "paid",
          textAlign: "Left",
          width: 100,
          type: "number",
          DefaultValue: 0,
          valueAccessor: currencyFormatter,
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
          //   validationRules: { required: true },
        },
        {
          field: "created_at",
          headerText: "created_at",
          textAlign: "Left",
          width: 140,
          //   visible: false,
          allowEditing: false,
          type: "datetime",
          format: "dd/MM/yyyy hh:mm a",
        },
        {
          field: "updatedAt",
          headerText: "updated_at",
          textAlign: "Left",
          width: 140,
          //   visible: false,
          allowEditing: false,
          type: "datetime",
          format: "dd/MM/yyyy hh:mm a",
        },
        {
          field: "phone",
          headerText: "Phone",
          textAlign: "Left",
          width: 100,
          type: "number",
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
        },
      ],
      actionBegin: function (args) {
        if (args.requestType === "beginEdit" || args.requestType === "add") {
          for (var i = 0; i < this.columns.length; i++) {
            if (
              this.columns[i].field == "created_at" ||
              this.columns[i].field == "updatedAt"
            ) {
              this.columns[i].visible = false;
            }
          }
        }
      },
      actionComplete: function (args) {
        //console.log(args.requestType);
        if (args.requestType === "delete") {
          return;
        }
        let dialog = args.dialog;
        // dialog.height = 350;
        // change the header of the dialog
        if( dialog != null)
        dialog.header =
          args.requestType === "beginEdit" ? "Edit Record" : "New Record";

        if (args.requestType === "save") {
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
              this.columns[i].field == "updatedAt"
            ) {
              this.columns[i].visible = true;
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
