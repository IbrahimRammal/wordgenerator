$(document).ready(function () {
  ej.grids.Grid.Inject(ej.grids.DetailRow);

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
      allowSorting: true,
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
        },
        {
          field: "paid",
          headerText: "Paid Price",
          width: 90,
          // format: "C",
          textAlign: "Left",
          type: "number",
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
        allowPaging: true,
        allowSelection: true,
        // queryCellInfo: function (args) {
        //   if (args.column.type == "number" || args.column.type == "number") {
        //     var val = ej.getObject(args.column.field, args.data);
        //     if (ej.isNullOrUndefined(val) || val == "")
        //       $(args.cell).text("0");
        //   }
        // },
        columns: [
          {
            field: "paymentid",
            headerText: "paymentid",
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
            field: "docid",
            headerText: "docid",
            textAlign: "Left",
            validationRules: { required: true },
            width: 100,
            visible: false,
          },
          {
            field: "category",
            headerText: "type",
            textAlign: "Left",
            validationRules: { required: true },
            width: 100,
          },
          {
            field: "language",
            headerText: "language",
            textAlign: "Left",
            validationRules: { required: true },
            width: 100,
          },
          {
            field: "docModel",
            headerText: "docModel",
            width: 85,
            textAlign: "Left",
          },
          {
            field: "total",
            headerText: "Total Price",
            width: 90,
            // format: "C",
            textAlign: "Right",
            type: "number",
          },
          {
            field: "paid",
            headerText: "Paid Price",
            width: 90,
            // format: "C",
            textAlign: "Right",
            type: "number",
          },
          {
            field: "Download",
            headerText: "Download",
            width: 90,
            defaultValue: "Download",
            // format: "C",
            textAlign: "Right",
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
            // type: "number",
          },
          // {
          //   field: "total",
          //   headerText: "Total Price",
          //   width: 90,
          //   format: "C",
          //   textAlign: "Right",
          //   type: "number",
          // },
        ],
      },
      // recordClick: click,
      // detailDataBound: onExpand,
    });
    grid.appendTo("#Grid");

    // var childGrid;

    function click(args) {
      if (args.cell.find("a").hasClass("symbol")) {
        $("#commanddialog").ejDialog({ showOnInit: false });
        $("#commanddialog").ejDialog("open");
      }
    }

    function onExpand(args) {
      // console.log( grid.childGrid);
      childGrid = this.childGrid;
      //console.log(childGrid);
      var hostUrl = "/api/posts/";
      let ajax = new ej.base.Ajax(
        hostUrl + "Payment/GetData?action=sub&id=" + args.data._id,
        "post"
      );
      ajax.send();
      ajax.onSuccess = function (result) {
        grid.childGrid.dataSource = JSON.parse(result);
        //console.log( grid.childGrid.dataSource);
        //grid.childGrid.dataSource
        // dataChild = new ej.data.DataManager({
        //   json: JSON.parse(result),
        //   adaptor: new ej.data.RemoteSaveAdaptor(), //remote save adaptor
        //   insertUrl: hostUrl + "Payment/BatchData",
        //   updateUrl: hostUrl + "Payment/BatchData",
        //   removeUrl: hostUrl + "Payment/BatchData",
        // });

        console.log(this.childGrid.dataSource);
        // //console.log(this.childGrid.dataSource);
        // //console.log(result);
        //dataChild.json = JSON.parse(result)
        // //childGrid.dataSource = JSON.parse(result); // assign data source for child grid.
        // console.log(childGrid.dataSource);
      };
    }
  };
});
