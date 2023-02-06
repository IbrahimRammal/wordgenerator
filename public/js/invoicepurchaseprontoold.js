$(document).ready(function () {
    var categoryObj;
  
    var category = [
      { categoryName: "ProntoInvoice", categoryId: "1" },
      { categoryName: "SwornInvoice", categoryId: "2" },
      { categoryName: "Unofficial", categoryId: "3" }
    ];
    $.ajax({
        url: "/api/invoice/invoiceedit/GetData?action=purchasepronto&id=2",
        type: "POST",
        dataType: "json",
        cache: true,
        //data: { },
        success: function (result) {
            //console.log(result);
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
            var hostUrl = "/api/invoice/";
  
    //   var dataChild = new ej.data.DataManager({
    //     url: hostUrl + "invoiceedit/GetData?action=sworn&id=1",
    //     adaptor: new ej.data.UrlAdaptor(),
    //     crossDomain: true,
    //   });


    var data = new ej.data.DataManager({
        //url: hostUrl + "GetData",
        // crudUrl: hostUrl + "BatchData",
        // adaptor: new ej.data.WebMethodAdaptor(),
        // crossDomain: true,
        // offline: true
        json: result, //JSON.parse(result),
        adaptor: new ej.data.RemoteSaveAdaptor(), //remote save adaptor
        insertUrl: hostUrl + "invoiceedit/GetData?action=purchasepronto&id=2",
        updateUrl: hostUrl + "invoiceedit/GetData?action=purchasepronto&id=2",
        removeUrl: hostUrl + "invoiceedit/GetData?action=purchasepronto&id=2",
    });

  
    var grid = new ej.grids.Grid({
        
      dataSource: data,
      allowPaging: true,
      allowGrouping: true,
      //allowFiltering: true,
      allowSorting: true,
      allowSelection : true,
      allowMultiSorting: true,
      allowTextWrap: false,
      // allowFiltering: true,
      // filterSettings: {
      //   columns: [{ field: 'invoiceNumber', matchCase: true, operator: 'endswith', predicate: 'and', value: '/23' }]
      // },
      sortSettings: { columns: [{ field: 'invoiceNumber', direction: 'Ascending' }] },
      selectionSettings: { mode: "Both" },
      pageSettings: { pageCount: 10 },
      editSettings: {
        // allowEditing: true,
        allowDeleting: true,
        // allowAdding: true,
        mode: "Dialog",
        newRowPosition: "Top",
        showDeleteConfirmDialog: true,
      },
      //toolbar: ["Search"], //ExcelExport
      // allowExcelExport: true,
    //   allowPdfExport: true,
      toolbar: [{ text: '	&#43; Add', tooltipText: 'Add', id: 'Click' }, "Delete", "Search"],
      toolbarClick: clickHandler,
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
          field: "countervalue",
          headerText: "ID",
          //isPrimaryKey: true,
          validationRules: { required: true },
          textAlign: "center",
          width: 50,
          visible: false,
          //allowEditing: false,
        },
        {
          field: "voucher",
          headerText: "voucher",
          //isPrimaryKey: true,
          validationRules: { required: true },
          textAlign: "center",
          width: 50,
          visible: false,
          //allowEditing: false,
        },
        {
          field: "fullname",
          headerText: "fullname",
          validationRules: { required: true },
          width: 120,
          allowEditing: false,
          visible: true,
        },
        {
          field: "invoiceNumber",
          headerText: "invoiceNumber",
          textAlign: "Left",
          validationRules: { required: true },
          width: 80,
          allowEditing: true,
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
          visible: false,
          validationRules: { required: true },
          width: 90,
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
          visible: false,
          allowEditing: false,
        },
        {
          field: "docModel",
          headerText: "docModel",
          width: 120,
          textAlign: "Left",
          allowEditing: false,
          visible: false
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
          field: "currency",
          headerText: "Currency",
          width: 90,
          // format: "C",
          textAlign: "Left"
          //validationRules: { required: true, minLength: [customFn, 'Need to be less than paid value']}
        },
        {
          field: "total",
          headerText: "Total Price",
          width: 90,
          // format: "C",
          textAlign: "Right",
          type: "number"
          //validationRules: { required: true, minLength: [customFn, 'Need to be less than paid value']}
        },
        {
          field: "paid",
          headerText: "Paid Price",
          width: 90,
          // format: "C",
          textAlign: "Right",
          type: "number",
          visible: false,
          //validationRules: { required: true, minLength: [customFn, 'Need to be less than total value']}
        },
        {
          field: "Download",
          headerText: "",
          textAlign: "Right",
          width: 90,
          type: "number",
          visible: true,
        },
        {
          field: "Voucher",
          headerText: "",
          textAlign: "Right",
          width: 90,
          type: "number",
          visible: true,
        },
        {
          field: "Edit",
          headerText: "",
          textAlign: "Left",
          width: 60,
          //   visible: false,
        },
        {
          field: "currency",
          headerText: "currency",
          width: 90,
          // format: "C",
          textAlign: "Right",
          visible: false,
        },
        {
          field: "rate",
          headerText: "Dollar Rate",
          width: 90,
          // format: "C",
          textAlign: "Left"
          //validationRules: { required: true, minLength: [customFn, 'Need to be less than paid value']}
        },
        {
          field: "href",
          headerText: "DocLink",
          width: 90,
          // format: "C",
          textAlign: "Right",
          visible: false,
          allowEditing: false,
        },
      ],
      cellSelected: (args) => {
        //console.log(args.data.href);
        // console.log(args.currentCell.outerText);
        if (args.currentCell.outerText == "DOWNLOAD") {
            //console.log(args);
          $.ajax({
            url: "/api/voucher/deleteAfterDownload",
            type: "POST",
            dataType: "json",
            cache: true,
            data: { language: "English", docModel: "ProntoPurchaseInvoice", clientname: args.data.fullname, docID: args.data.docid },
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
        }  else if (args.currentCell.outerText == "EDIT") {
          //console.log(args);
          //var _id = this.parentDetails.parentRowData._id;
          //var fullname = this.parentDetails.parentRowData.fullname;
          //console.log(_id);
          //paymentid


          //const url='/api/actions/invoicecreate?' + "_id=" + _id + "&fullname=" + fullname;
          var keys = [];
          keys = args.data.combineid.split("_");
          //paymentid
          console.log("keys[3] " + keys);

          var transcationID = "";
          transcationID = keys[4];

          var voucherID = "";
  
          //const url='/api/actions/invoicecreate?' + "_id=" + _id + "&fullname=" + fullname;
          //receiptvoucher
          if(keys.length == 5 && keys[3] != 'undefined' && typeof keys[3] != 'undefined')
          {
            voucherID = keys[3];
            transcationID = keys[4];
          }
          else {
            transcationID = keys[3];
          }

          $.ajax({
            url: "/api/invoice/invoicetemplate",
            type: "POST",
            dataType: "json",
            cache: true,
            //data: { language: "English", docModel: "ProntoPurchaseInvoice", docID: args.data.docid, id: args.data.paymentid },
            data: { language: "English", currency: args.data.currency, total: args.data.total, docModel: "ProntoPurchaseInvoice", docID: args.data.docid, id: args.data.paymentid, mode: "invoice", voucher: voucherID, transcation: transcationID },
            success: function (fixtures) {
                var html = fixtures["html"];
                // var paid = fixtures["paid"];
                $("#panel").html(html);
                //$('#paid').html(paid);
                // $("#card_label").html(args.data.language + " > " + args.data.docModel);
            },
            error: function (jqXHR, textStatus, err) {
              //   alert("text status " + textStatus + ", err " + err);
            },
          });
      }       else if (args.currentCell.outerText == "VOUCHER") {
        //console.log(args);
        //var _id = this.parentDetails.parentRowData._id;
        //var fullname = this.parentDetails.parentRowData.fullname;
        //console.log(args.data.combineid);
        var keys = [];
        keys = args.data.combineid.split("_");
        //paymentid
        console.log("keys[3] " + keys);

        //const url='/api/actions/invoicecreate?' + "_id=" + _id + "&fullname=" + fullname;
        //receiptvoucher
        if(keys.length == 5 && keys[3] != '' && keys[3] != 'undefined' && keys[3] != '' && typeof keys[3] != 'undefined')
        {
          var voucherType = "ProntoPurchaseInvoice";
          //args.data.Type;
          //voucherType = voucherType.replace(/\s/g, "");
          
          $.ajax({
            url: "/api/voucher/vouchertemplate",
            type: "POST",
            dataType: "json",
            cache: true,
            data: { language: "English", invoice: keys[2],currency: args.data.currency, total: args.data.total, ClientID: keys[0], invoiceSchemaID: keys[1], transcation: keys[4], invoiceNumber: args.data.invoiceNumber, docModel: "Pronto Payment Voucher", mode: "invoice", docID: keys[3], id: keys[0] },
            success: function (fixtures) {
                var html = fixtures["html"];
                // var paid = fixtures["paid"];
                $("#panel1").html(html);
                //$('#paid').html(paid);
                // $("#card_label").html(args.data.language + " > " + args.data.docModel);
            },
            error: function (jqXHR, textStatus, err) {
              //   alert("text status " + textStatus + ", err " + err);
            },
          });
        } else {
          $.ajax({
            url: "/api/voucher/paymentvoucher",
            type: "POST",
            dataType: "json",
            cache: true,
            data: { language: "English", invoice: keys[2], ClientID: keys[0],currency: args.data.currency, total: args.data.total, invoiceSchemaID: keys[1], transcation: keys[4], invoiceNumber: args.data.invoiceNumber, type: "Pronto Payment Voucher", mode: "invoice", docID: "", id: keys[0] },
            success: function (fixtures) {
                var html = fixtures["html"];
                // var paid = fixtures["paid"];
                $("#panel1").html(html);
                //$('#paid').html(paid);
                // $("#card_label").html(args.data.language + " > " + args.data.docModel);
            },
            error: function (jqXHR, textStatus, err) {
              //   alert("text status " + textStatus + ", err " + err);
            },
          });
        }

      }
      },
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
        // dialog.header =
        //   args.requestType === "beginEdit" ? "Edit Record" : "New Record";

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
      }
    // detailDataBound: onExpand,
  });
  grid.appendTo("#Grid");


  function clickHandler(args){
    if (args.item.id === 'Click') {
      //console.log(args.parentDetails.parentRowData.Details);
        //console.log(this.parentDetails.parentRowData._id);
        //var _id = this.parentDetails.parentRowData._id;
        //var fullname = this.parentDetails.parentRowData.fullname;



        const url='/api/invoice/invoicecreatepurchase';
        window.location = url;
    } else if (args.item.id === 'Delete') {

    } else {
      
    }
 };


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
},
error: function (jqXHR, textStatus, err) {
  $('#load').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Load&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').toggleClass("disabled");
  toastr["error"]("Loading Data Faild", "Loading error");
},
});  

});

