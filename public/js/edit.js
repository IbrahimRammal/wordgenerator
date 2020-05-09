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
  $("#paid").hide(paid);
  //window.alert(strClient);
  // Grab the template
  if (g.options[g.selectedIndex].text != "Client Select ...") {
    $.ajax({
      url: "/api/posts/edit",
      type: "POST",
      dataType: "json",
      cache: true,
      data: { client: strClient },
      success: function (result) {
        console.log(result);

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

        // // var hostUrl = '/api/posts/clientview';
        var hostUrl = "/api/posts/";
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
          insertUrl: hostUrl + "edit/BatchData",
          updateUrl: hostUrl + "edit/BatchData",
          removeUrl: hostUrl + "edit/BatchData",
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
              field: "language",
              headerText: "Language",
              validationRules: { required: true },
              width: 85,
            },
            {
              field: "_id",
              headerText: "Doc ID",
              isPrimaryKey: true,
              textAlign: "center",
              width: 120,
              visible: false,
            },
            {
                field: "client_id",
                headerText: "Client ID",
                isPrimaryKey: true,
                textAlign: "center",
                width: 120,
                visible: false,
              },
            {
              field: "docModel",
              headerText: "docModel",
              textAlign: "Left",
              width: 120,
              validationRules: { required: true },
              //   validationRules: { required: true },
            },
            {
              field: "createdBy",
              headerText: "Created By",
              textAlign: "Left",
              width: 100,
              validationRules: { required: true },
              //   validationRules: { required: true },
            },
            {
              field: "updateddBy",
              headerText: "Updated By",
              textAlign: "Left",
              width: 100,
              validationRules: { required: true },
              //   validationRules: { required: true },
            },
            {
              field: "created_at",
              headerText: "created_at",
              textAlign: "Left",
              width: 130,
              allowEditing: false,
              type: "datetime",
              format: "dd/MM/yyyy hh:mm a",
            },
            {
              field: "updated_at",
              headerText: "updated_at",
              textAlign: "Left",
              width: 130,
              allowEditing: false,
              type: "datetime",
              format: "dd/MM/yyyy hh:mm a",
            },
            {
              field: "download",
              headerText: "",
              textAlign: "Left",
              width: 90,
              type: "number",
              //visible: false,
            },
            {
              field: "edit",
              headerText: "",
              textAlign: "Left",
              width: 60,
              //   visible: false,
            },
            {
              field: "note",
              headerText: "Note",
              textAlign: "Left",
              width: 100,
              visible: false,
            },
          ],
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
                url: "/api/posts/download",
                type: "POST",
                dataType: "json",
                cache: true,
                data: { type: lan },
                success: function (fixtures) {

                },
                error: function (jqXHR, textStatus, err) {
                //   alert("text status " + textStatus + ", err " + err);
                },
              });
            } else if (args.currentCell.outerText == "EDIT") {
                // console.log(args);

              $.ajax({
                url: "/api/posts/template",
                type: "POST",
                dataType: "json",
                cache: true,
                data: { type: args.data.language, template: args.data.docModel, client: args.data.client_id, docID: args.data._id },
                success: function (fixtures) {
                    var html = fixtures["html"];
                    var paid = fixtures["paid"];
                    $("#panel").html(html);
                    //$('#paid').html(paid);
                    $("#card_label").html(args.data.language + " > " + args.data.docModel);
                },
                error: function (jqXHR, textStatus, err) {
                  //   alert("text status " + textStatus + ", err " + err);
                },
              });
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

        // }

        // var html = fixtures["html"];
        // var paid = fixtures["paid"];
        // $("#panel").html(html);

        //$('#paid').html(paid);
        //   $("#card_label").html(strType + " > " + strTemplate);
      },
      error: function (jqXHR, textStatus, err) {
        toastr["error"]("Payment not inserted", "Payment error");
        alert("text status " + textStatus + ", err " + err);
      },
    });
  } else {
    toastr["error"]("Please Pick Client before ...", "No Client Picked");
  }
}

function click(args) { 
    console.log(args);
    // if (args.cell.find('a').hasClass("symbol")) { 
    //     $("#commanddialog").ejDialog({ showOnInit: false }); 
    //     $("#commanddialog").ejDialog("open"); 
    // } 
} 

// });
