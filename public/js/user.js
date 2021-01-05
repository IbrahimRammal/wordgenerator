$(document).ready(function () {
  var categoryObj;

  var category = [
    // { categoryName: "SuperAdmin", categoryId: "1" },
    { categoryName: "Admin", categoryId: "1" },
    { categoryName: "User", categoryId: "2" },
  ];

  ej.grids.Grid.Inject(
    ej.grids.PdfExport,
    ej.grids.ExcelExport,
    ej.grids.Sort,
    ej.grids.Group,
    ej.grids.Search,
    ej.grids.Edit,
    ej.grids.Toolbar,
    ej.grids.Page,
    ej.grids.Filter
  );

  // var hostUrl = '/api/posts/clientview';

  var hostUrl = "/api/manage/User/";
  let ajax = new ej.base.Ajax(hostUrl + "GetData", "post");
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
      allowPdfExport: true,
      // searchSettings: { fields: ['fullname'] , operator: 'contains', key: 'test', ignoreCase: true},
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
        "",
      ], //ExcelExport PdfExport
      //toolbar: ['Search'],
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Dialog",
      },
      columns: [
        {
          field: "name",
          headerText: "name",
          validationRules: { required: true, minLength: 6, maxLength: 70 },
          width: 100,
        },
        {
          field: "_id",
          headerText: "User ID",
          isPrimaryKey: true,
          textAlign: "center",
          width: 120,
          visible: false,
        },
        {
          field: "email",
          headerText: "email",
          // format: email,
          // type: email,
          textAlign: "Left",
          validationRules: { required: true, minLength: 6, maxLength: 50, email: true },
          width: 100,
        },
        {
          field: "date",
          headerText: "Created Date",
          textAlign: "Left",
          // validationRules: { required: true },
          width: 100,
          allowEditing: false,
          type: "datetime",
          format: "dd/MM/yyyy hh:mm a",
        },
        {
          field: "password",
          headerText: "Password",
          textAlign: "Left",
          validationRules: { required: true, minLength: 6, maxLength: 25 },
          width: 100,
          visible: false,
        },
        // {
        //     headerText: 'User Role',
        //     template:
        //     `<div>
        //         <select class="e-control e-dropdownlist">
        //             <option value="1" selected="selected">Order Placed</option>
        //             <option value="2">Processing</option>
        //             <option value="3">Delivered</option>
        //         </select>
        //     </div>`, width: 140
        // },
        {
          field: "role",
          headerText: "role",
          textAlign: "Left",
          width: 100,
          validationRules: { required: true },
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
                placeholder: "Select a Role",
                // itemTemplate: initialValue,
                // valueTemplate: initialValue,

                floatLabelType: "Never",
              });
              categoryObj.appendTo(categoryElem);
            },
          },
          //   validationRules: { required: true },
        },
      ],
      pageSettings: { pageCount: 5 },
      queryCellInfo: dropdown,
      actionBegin: function (args) {
        if (args.requestType === "beginEdit" || args.requestType === "add") {
          for (var i = 0; i < this.columns.length; i++) {
            if (this.columns[i].field == "password") {
              this.columns[i].visible = true;
            }
          }
        }
      },
      actionComplete: function (args) {
        if (args.requestType === "save" || args.requestType === "beginEdit" || args.requestType === "add") {
          let dialog = args.dialog;
          // dialog.height = 350;
          // change the header of the dialog
          dialog.header =
            args.requestType === "beginEdit" ? "Edit Record" : "New Record";
          for (var i = 0; i < this.columns.length; i++) {
            if (this.columns[i].field == "password") {
              this.columns[i].visible = false;
            }
          }
        }
      },
    });

    grid.toolbarClick = function (args) {
      if (args["item"].id === "Grid_pdfexport") {
        grid.pdfExport();
      }
    };

    grid.appendTo("#Grid");
  };
});

function dropdown(args) {
  var ele = args.cell.querySelector("select");
  var drop = new ej.dropdowns.DropDownList({
    popupHeight: 150,
    popupWidth: 150,
  });
  drop.appendTo(ele);
}

// grid.appendTo('#Grid');

// let button = document.getElementById('btn');
// button.addEventListener("click", function(e){
// let ajax = new ej.base.Ajax("http://192.168.0.100:4000/api/posts/clientview", "GET");
// ajax.send();
// ajax.onSuccess = function (data) {
//     grid.dataSource = JSON.parse(data);
// };
// });
