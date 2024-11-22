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
      hostUrl + "/InvoiceSearch/GetData?action=all&id=",
      "post"
    );

    ajax.send();
    ajax.onSuccess = function (result) {
      var data = new ej.data.DataManager({
        json: JSON.parse(result)
        //,
        // adaptor: new ej.data.RemoteSaveAdaptor(), //remote save adaptor
        // insertUrl: hostUrl + "Invoice/BatchData",
        // updateUrl: hostUrl + "Invoice/BatchData",
        // removeUrl: hostUrl + "Invoice/BatchData",
      });
  
      // var dataChild = new ej.data.DataManager({
      //   url: hostUrl + "/InvoiceSearch/GetData?action=sub&id=",
      //   adaptor: new ej.data.UrlAdaptor(),
      //   crossDomain: true,
      // });
  
      var grid = new ej.grids.Grid({
        dataSource: data,
        //allowPaging: true,
        //allowGrouping: true,
        //allowFiltering: true,
       // allowSorting: true,
        //allowMultiSorting: true,
        //allowTextWrap: true,
        //toolbar: ["Search"], //ExcelExport
        // allowExcelExport: true,

        queryString: "_id",
        allowPaging: true,
        allowTextWrap: true,
        // allowSearching : true,
        allowGrouping: true,
        allowFiltering: true,
        allowSorting: true,
        allowMultiSorting: true,
        allowSelection : true,
        // allowExcelExport: true,
        allowPdfExport: true,

        toolbar: ["Search"], //ExcelExport
        selectionSettings: { mode: "Both" },

        allowPdfExport: true,
        columns: [
          {
            field: "docid",
            headerText: "_id",
            isPrimaryKey: true,
            textAlign: "center",
            width: 120,
            visible: false,
          },
          {
            field: "paymentid",
            headerText: "paymentid",
            isPrimaryKey: true,
            textAlign: "center",
            width: 120,
            visible: false,
          },
          {
            field: "combineid",
            headerText: "combineid",
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
            field: "invoiceNumber",
            headerText: "invoiceNumber",
            textAlign: "Left",
            validationRules: { required: true },
            width: 100,
          },
          {
            field: "href",
            headerText: "href",
            textAlign: "Left",
            validationRules: { required: true },
            width: 100,
            visible: false,
          },
          {
            field: "category",
            headerText: "category",
            textAlign: "Left",
            validationRules: { required: true },
            width: 100,
          },
          {
            field: "Download",
            headerText: "DOWNLOAD",
            textAlign: "Left",
            validationRules: { required: true },
            width: 100,
          },
          {
            field: "Edit",
            headerText: "EDIT",
            textAlign: "Left",
            validationRules: { required: true },
            width: 100,
          }
        // createTime: query[x]["invoice"][j].createTime,
        // updateTime: query[x]["invoice"][j].updateTime
        ],
        cellSelected: (args) => {
          //console.log(args);
          //console.log(args.data.href);
          // console.log(args.currentCell.outerText);
                  const cellContent = args.currentCell.innerHTML;

        //if (args.currentCell.outerText == "DOWNLOAD") {
        if (cellContent.includes('fa-download')) {
            //console.log(args);
            $.ajax({
              url: "/api/posts/deleteAfterDownload",
              type: "POST",
              dataType: "json",
              cache: true,
              data: { language: "English", docModel: args.data.category, clientname: args.data.fullname, docID: args.data.docid },
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
          }  else if (cellContent.includes('fa-edit')) {
            //console.log(args);
            // var _id = this.parentDetails.parentRowData._id;
            // //var fullname = this.parentDetails.parentRowData.fullname;
            // console.log(_id);
            //paymentid


            //const url='/api/actions/invoicecreate?' + "_id=" + _id + "&fullname=" + fullname;

            $.ajax({
              url: "/api/posts/invoicetemplate",
              type: "POST",
              dataType: "json",
              cache: true,
              data: { language: "English", docModel: args.data.category, docID: args.data.docid, id: args.data.paymentid },
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
        }
        },
        // detailDataBound: onExpand,
      });
      grid.appendTo("#Grid");

      function clickHandler(args){
        if (args.item.id === 'Click') {
          //console.log(args.parentDetails.parentRowData.Details);
            //console.log(this.parentDetails.parentRowData._id);
            var _id = this.parentDetails.parentRowData._id;
            var fullname = this.parentDetails.parentRowData.fullname;



            const url='/api/actions/invoicecreate?' + "_id=" + _id + "&fullname=" + fullname;
            window.location = url;
        } else if (args.item.id === 'Edit') {

          //var count = this.rowSelected;   
          
          var selectedrowindex = grid.getSelectedRowIndexes(); // get the selected row indexes.
          //alert(selectedrowindex); // to alert the selected row indexes.
          var selectedrecords = grid.getSelectedRecords();  
          // console.log(selectedrecords);

            // $.ajax({
            //   url: "/api/posts/invoicetemplate",
            //   type: "POST",
            //   dataType: "json",
            //   cache: true,
            //   data: { type: args.data.language, template: args.data.docModel, client: args.data.client_id, clientname: selectedtext, docID: args.data._id },
            //   success: function (fixtures) {
            //       var html = fixtures["html"];
            //       // var paid = fixtures["paid"];
            //       $("#panel").html(html);
            //       //$('#paid').html(paid);
            //       $("#card_label").html(args.data.language + " > " + args.data.docModel);
            //   },
            //   error: function (jqXHR, textStatus, err) {
            //     //   alert("text status " + textStatus + ", err " + err);
            //   },
            // });
        } else {
          
        }
     };
  
  
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
          url: hostUrl + "Invoice/GetData?action=sub&id=" + args.data._id,
          method: "post",
          // dataType: "json",
          success: function (userData) {
            var dataManagerChild = new ej.data.DataManager({
              json: JSON.parse(JSON.stringify(userData)),
              adaptor: new ej.data.RemoteSaveAdaptor(), //remote save adaptor
              insertUrl: hostUrl + "Invoice/BatchData",
              updateUrl: hostUrl + "Invoice/BatchData",
              removeUrl: hostUrl + "Invoice/BatchData",
            });
            proxy.childGrid.dataSource = dataManagerChild;
          },
        });
      }
    };
  });
  