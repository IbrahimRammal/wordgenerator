$(document).ready(function () {
  var categoryObj;

  var category = [
    { categoryName: "Pronto", categoryId: "1" },
    { categoryName: "Sworn legal", categoryId: "2" },
    { categoryName: "non legal", categoryId: "3" },
  ];

  //ej.grids.Grid.Inject(ej.grids.DetailRow);
  ej.grids.Grid.Inject(
    ej.grids.DetailRow,
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
  var hostUrl = "/api/posts/";

  let ajax = new ej.base.Ajax(
    hostUrl + "Payment/GetData?action=all&id=",
    "post"
  );
  ajax.send();
  ajax.onSuccess = function (result) {
    var data = new ej.data.DataManager({
      json: JSON.parse(result),
      adaptor: new ej.data.RemoteSaveAdaptor(), //remote save adaptor
      insertUrl: hostUrl + "Payment/BatchData",
      updateUrl: hostUrl + "Payment/BatchData",
      removeUrl: hostUrl + "Payment/BatchData",
    });

    var dataChild = new ej.data.DataManager({
      url: hostUrl + "Payment/GetData?action=sub&id=",
      adaptor: new ej.data.UrlAdaptor(),
      crossDomain: true,
    });

    var grid = new ej.grids.Grid({
      dataSource: data,
      allowPaging: true,
      allowGrouping: true,
      //allowFiltering: true,
      allowSorting: true,
      allowMultiSorting: true,
      toolbar: ["Search"], //ExcelExport
      // allowExcelExport: true,
      allowPdfExport: true,
      columns: [
        {
          field: "_id",
          headerText: "_id",
          isPrimaryKey: true,
          textAlign: "center",
          width: 120,
          visible: false,
        },
        {
          field: "fullname",
          headerText: "fullname",
          validationRules: { required: true },
          width: 100,
        },
        {
          field: "mobile",
          headerText: "mobile",
          textAlign: "Left",
          validationRules: { required: true },
          width: 100,
        },
        {
          field: "address",
          headerText: "address",
          textAlign: "Left",
          validationRules: { required: true },
          width: 100,
        },
        {
          field: "unit",
          headerText: "Count",
          textAlign: "Left",
          validationRules: { required: true },
          width: 100,
        },
        {
          field: "total",
          headerText: "Total Price",
          width: 85,
          // format: "C0",
          type: "number",
          textAlign: "Left",
          valueAccessor: currencyFormatter,
        },
        {
          field: "paid",
          headerText: "Paid Price",
          width: 90,
          // format: "C",
          textAlign: "Left",
          type: "number",
          valueAccessor: currencyFormatter,
        },
        {
          headerText: "Remains",
          valueAccessor: totalRemains,
          textAlign: "Right",
          width: 150,
        },
        // {
        //   field: "remain",
        //   headerText: "Remain Price",
        //   width: 90,
        //   // format: "C",
        //   textAlign: "Right",
        //   type: "number",
        // },
      ],
      childGrid: {
        dataSource: dataChild,
        queryString: "_id",
        // allowPaging: true,
        allowSelection: true,
        //allowGrouping: true,
        //allowFiltering: true,
        //allowSorting: true,
        //allowMultiSorting: true,
        toolbar: ["Search"], //ExcelExport
        selectionSettings: { mode: "Both" },
        pageSettings: { pageCount: 5 },
        editSettings: {
          allowEditing: true,
          allowDeleting: true,
          mode: "Dialog",
          newRowPosition: "Top",
          showDeleteConfirmDialog: true,
        },
        toolbar: ["Edit", "Delete"],
        columns: [
          {
            field: "combineid",
            headerText: "combineid",
            isPrimaryKey: true,
            validationRules: { required: true },
            textAlign: "center",
            width: 120,
            visible: false,
            allowEditing: false,
          },
          {
            field: "paymentid",
            headerText: "paymentid",
            //isPrimaryKey: true,
            validationRules: { required: true },
            textAlign: "center",
            width: 120,
            visible: false,
            allowEditing: false,
          },
          {
            field: "fullname",
            headerText: "fullname",
            validationRules: { required: true },
            width: 100,
            allowEditing: false,
          },
          {
            field: "docid",
            headerText: "docid",
            textAlign: "Left",
            validationRules: { required: true },
            width: 100,
            visible: false,
            allowEditing: false,
          },
          {
            field: "category",
            headerText: "type",
            textAlign: "Left",
            validationRules: { required: true },
            width: 80,
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
              write: function () {
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
                  placeholder: "Select a category",
                  floatLabelType: "Never",
                });
                categoryObj.appendTo(categoryElem);
              },
            },
          },
          {
            field: "language",
            headerText: "language",
            textAlign: "Left",
            validationRules: { required: true },
            width: 80,
            allowEditing: false,
          },
          {
            field: "docModel",
            headerText: "docModel",
            width: 120,
            textAlign: "Left",
            allowEditing: false,
          },
          {
            field: "createTime",
            headerText: "CreateTime",
            width: 85,
            textAlign: "Left",
            allowEditing: false,
          },
          {
            field: "updateTime",
            headerText: "UpdateTime",
            width: 85,
            textAlign: "Left",
            allowEditing: false,
          },
          {
            field: "total",
            headerText: "Total Price",
            width: 90,
            // format: "C",
            textAlign: "Right",
            type: "number",
            valueAccessor: currencyFormatter,
            //validationRules: { required: true, minLength: [customFn, 'Need to be less than paid value']}
          },
          {
            field: "paid",
            headerText: "Paid Price",
            width: 90,
            // format: "C",
            textAlign: "Right",
            type: "number",
            valueAccessor: currencyFormatter,
            //validationRules: { required: true, minLength: [customFn, 'Need to be less than total value']}
          },
          {
            field: "Download",
            headerText: "Download",
            width: 90,
            defaultValue: "Download",
            // format: "C",
            textAlign: "Right",
            allowEditing: false,
            visible: false,
            //commands: [{ buttonOption: { content: 'Download', cssClass: 'e-flat', click: onClick } }] //, click: onClick
            // visible: false
            // type: "number",
          },
          {
            field: "href",
            headerText: "DocLink",
            width: 90,
            // format: "C",
            textAlign: "Right",
            visible: false,
            allowEditing: false,
            // type: "number",
          },
        ],
        rowSelected: rowSelected,
        actionBegin: function (args) {
          if (args.requestType === "beginEdit" || args.requestType === "add") {
            for (var i = 0; i < this.columns.length; i++) {
              if (
                this.columns[i].field == "fullname" ||
                this.columns[i].field == "docModel" ||
                this.columns[i].field == "language"
              ) {
                this.columns[i].visible = false;
              } else if (
                this.columns[i].field == "total" ||
                this.columns[i].field == "paid"
              ) {
                //console.log(args.rowData[this.columns[i].field]);
                //var str = args.data[this.columns[i].field];
                //args.data[this.columns[i].field] = str.replace("LBP", "");
                // str.replace("LBP", "");
                // data[field] + " LBP"
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
          dialog.header =
            args.requestType === "beginEdit" ? "Edit Record" : "New Record";

          if (args.requestType === "save") {
            let dialog = args.dialog;
            // dialog.height = 350;
            // change the header of the dialog
            dialog.header =
              args.requestType === "beginEdit" ? "Edit Record" : "New Record";
            //Change header remains
            // console.log(args);
            for (var i = 0; i < this.columns.length; i++) {
              if (
                this.columns[i].field == "fullname" ||
                this.columns[i].field == "docModel" ||
                this.columns[i].field == "language"
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
            $.ajax({
              url: "/api/posts/deleteAfterDownload",
              type: "POST",
              dataType: "json",
              cache: true,
              data: { language: args.data.language, docModel: args.data.docModel, clientname: args.data.fullname, docID: args.data.docid },
              success: function (fixtures) {
                  var href = fixtures["href"];
                  // console.log(href);
                  window.location = href;
                  // // var paid = fixtures["paid"];
                  // $("#panel").html(html);
                  // //$('#paid').html(paid);
                  // $("#card_label").html(args.data.language + " > " + args.data.docModel);
              },
              error: function (jqXHR, textStatus, err) {
                //   alert("text status " + textStatus + ", err " + err);
              },
            });
          }
        },
      },
      // detailDataBound: onExpand,
    });
    grid.appendTo("#Grid");

    function currencyFormatter(field, data, column) {
      //console.log(column);
      //console.log(field);
      if(data[field] == null || data[field] == "")
      return "0 LBP";
      return data[field] + " LBP";
    }

    function totalRemains(field, data, column) {
      return data.total - data.paid + " LBP";
    }

    // var customFn = function(args) {
    //   console.log(args);
    //   return args['value'].length >= 5;
    //   };

    function rowSelected(args) {
      var selectedrowindex = grid.getSelectedRowIndexes(); // get the selected row indexes.
      //alert(selectedrowindex); // to alert the selected row indexes.
      var selectedrecords = grid.getSelectedRecords(); // get the selected records.
    }

    function click(args) {
      if (args.cell.find("a").hasClass("symbol")) {
        $("#commanddialog").ejDialog({ showOnInit: false });
        $("#commanddialog").ejDialog("open");
      }
    }

    var flag = 0;
    function onExpand(args) {
      var hostUrl = "/api/posts/";
      var proxy = this;

      // setTimeout(function () {
      //   //Ajax post back
      // }, 1000);

      $.ajax({
        url: hostUrl + "Payment/GetData?action=sub&id=" + args.data._id,
        method: "post",
        // dataType: "json",
        success: function (userData) {
          var dataManagerChild = new ej.data.DataManager({
            json: JSON.parse(JSON.stringify(userData)),
            adaptor: new ej.data.RemoteSaveAdaptor(), //remote save adaptor
            insertUrl: hostUrl + "Payment/BatchData",
            updateUrl: hostUrl + "Payment/BatchData",
            removeUrl: hostUrl + "Payment/BatchData",
          });
          proxy.childGrid.dataSource = dataManagerChild;
        },
      });
    }
  };
});
