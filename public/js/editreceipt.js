var grid = "";

function getData() {
  //   var gridObj = new ej.grids.Grid({dataSource: [{}] });

  //   gridObj.appendTo("#grid");
  //   if (grid != "") {
  //     // var gridObj = document.getElementById("Grid");
  //     // var gridData = [];
  //     grid.dataSource = gridData;
  //   }

  $("#Grid").remove();

  var g = document.getElementById("client_list");
  var strClient = g.options[g.selectedIndex].value;
//   $("#paid").hide(paid);
  var selectedtext = "";
  //window.alert(strClient);
  // Grab the template
  if (g.options[g.selectedIndex].text != "Client Select ...") {
      selectedtext = g.options[g.selectedIndex].text;
      $('#load').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');
    $.ajax({
      url: "/api/voucher/ReceiptSearch/GetData?action=byuser&id=" + strClient,
      type: "POST",
      dataType: "json",
      cache: true,
      data: { client: strClient },
      success: function (result) {
        //console.log(result);
        $("#panel").html("");
        $('#paid').html("");
        $("#card_label").html("Document Card");
        $('#load').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Load&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').toggleClass("disabled");
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

        // // var hostUrl = '/api/voucher/clientview';
        var hostUrl = "/api/voucher/";
        // let ajax = new ej.base.Ajax(hostUrl + "edit/GetData", "post");
        // ajax.send();
        // ajax.onSuccess = function (result) {
        //     toastr["success"]("Documents succefully loaded", "Document Load")
        //   //grid.dataSource = JSON.parse(data);
        //   //alert(result)

        var data = new ej.data.DataManager({
          //url: hostUrl + "GetData",
          // crudUrl: hostUrl + "BatchData",
          // adaptor: new ej.data.WebMethodAdaptor(),
          // crossDomain: true,
          // offline: true
          json: result, //JSON.parse(result),
          adaptor: new ej.data.RemoteSaveAdaptor(), //remote save adaptor
          insertUrl: hostUrl + "editreceiptbyuser/BatchData",
          updateUrl: hostUrl + "editreceiptbyuser/BatchData",
          removeUrl: hostUrl + "editreceiptbyuser/BatchData",
        });

        //alert(result)

        grid = new ej.grids.Grid({
          dataSource: data,
          allowPaging: true,
          // allowSearching : true,
          allowGrouping: true,
          allowFiltering: true,
          allowSorting: true,
          allowMultiSorting: true,
          allowSelection : true,
          // allowTextWrap: true,
          textWrapSettings: { wrapMode: 'Content' },
          // allowExcelExport: true,
          allowPdfExport: true,
          // searchSettings: { fields: ['fullname'] , operator: 'contains', key: 'test', ignoreCase: true},
          //   allowTextWrap: true,
          //   textWrapSettings: { wrapMode: "Content" },
        //   toolbar: [
        //     // "Add",
        //     // "Edit",
        //     // "Delete",
        //     // "Search",
        //     // "PdfExport",
        //   ], //ExcelExport
          toolbar: ['Search'],
          selectionSettings: { mode: "Both" },
          editSettings: {
            // allowEditing: true,
            // allowAdding: true,
            // allowDeleting: true,
            mode: "Dialog",
          }, //, allowDeleting: true
          columns: [
            {
              field: "paymentid",
              headerText: "paymentid",
              isPrimaryKey: true,
              validationRules: { required: true },
              textAlign: "center",
              width: 120,
              visible: false,
              allowEditing: false,
            },
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
              visible: true,
              //allowEditing: false,
            },
            {
              field: "fullname",
              headerText: "fullname",
              validationRules: { required: true },
              width: 70,
              allowEditing: false,
              visible: true,
            },
            {
              field: "invoiceNumber",
              headerText: "invoiceNumber",
              textAlign: "Left",
              validationRules: { required: true },
              width: 100,
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
              visible: false
              //validationRules: { required: true, minLength: [customFn, 'Need to be less than total value']}
            },
            {
              field: "Download",
              headerText: "",
              textAlign: "Right",
              width: 90,
              type: "number",
              //visible: false,
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
              field: "href",
              headerText: "DocLink",
              width: 90,
              // format: "C",
              textAlign: "Right",
              visible: false,
              allowEditing: false,
            },
          ],
          // queryCellInfo: tooltip,
          // height: 315,
        //   actionFailure: (e) => {
        //     var span = document.createElement("span");
        //     grid.element.parentNode.insertBefore(span, grid.element);
        //     span.style.color = "#FF0000";
        //     span.innerHTML = "Server exception: 404 Not found";
        //   },
          cellSelected: (args) => {
            // console.log(args);
            //console.log(args.data.href);
            //console.log(args.currentCell.outerText);
            if (args.currentCell.outerText == "DOWNLOAD") {
                $.ajax({
                    url: "/api/voucher/deleteAfterDownload",
                    type: "POST",
                    dataType: "json",
                    cache: true,
                    data: { language: args.data.language, docModel: args.data.docModel, client: args.data.client_id, clientname: selectedtext, docID: args.data._id },
                    success: function (fixtures) {
                        var href = fixtures["href"];
                        // console.log(href);
                        window.location = href;
                        var paid = fixtures["paid"];
                        $("#panel").html(paid);
                        // //$('#paid').html(paid);
                        // $("#card_label").html(args.data.language + " > " + args.data.docModel);
                    },
                    error: function (jqXHR, textStatus, err) {
                      //   alert("text status " + textStatus + ", err " + err);
                    },
                  });
            } else if (args.currentCell.outerText == "EDIT") {
                //console.log(args);

                $.ajax({
                  url: "/api/voucher/vouchertemplate",
                  type: "POST",
                  dataType: "json",
                  cache: true,
                  data: { language: "English", docModel: args.data.category, docID: args.data.docid, id: args.data.paymentid },
                  success: function (fixtures) {
                      var html = fixtures["html"];
                      $("#panel").html(html);
                  },
                  error: function (jqXHR, textStatus, err) {
                    //   alert("text status " + textStatus + ", err " + err);
                  },
                });

            } else if (args.currentCell.outerText == "DELETE") {
              // console.log(args);
              var result = confirm("Do you really want to delete these records? This process cannot be undone.");
                if (result) {
                  $.ajax({
                    url: "/api/voucher/delete",
                    type: "POST",
                    dataType: "json",
                    cache: true,
                    data: { type: args.data.language, template: args.data.docModel, client: args.data.client_id, docID: args.data._id },
                    success: function (fixtures) {
                        // var html = fixtures["html"];
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
              }
          },
        //   recordClick: "click", 
          pageSettings: { pageCount: 5 },
        });

        grid.toolbarClick = function (args) {
          if (args["item"].id === "Grid_pdfexport") {
            grid.pdfExport();
          }
        };

        $("#contentgrid").append('<div id="Grid"></div>');

        grid.appendTo("#Grid");

        // function tooltip(args) { // event triggers on every cell render.
        //   var tooltip = new ej.popups.Tooltip({
        //       content: args.data[args.column.field].toString() // add Essential JS2 tooltip for every cell.
        //   },args.cell);
        // }

        // }

        // var html = fixtures["html"];
        // var paid = fixtures["paid"];
        // $("#panel").html(html);

        //$('#paid').html(paid);
        //   $("#card_label").html(strType + " > " + strTemplate);
      },
      error: function (jqXHR, textStatus, err) {
        $('#load').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Load&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').toggleClass("disabled");
        toastr["error"]("Loading Data Faild", "Loading error");
      },
    });
  } else {
    toastr["error"]("Please Pick Client before ...", "No Client Picked");
  }
}



function click(args) { 
    //console.log(args);
    // if (args.cell.find('a').hasClass("symbol")) { 
    //     $("#commanddialog").ejDialog({ showOnInit: false }); 
    //     $("#commanddialog").ejDialog("open"); 
    // } 
} 

// });
