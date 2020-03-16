$(document).ready(function() {

  var columnDefs = [{
    data: "_id",
    title: "Id",
    type: "readonly",
    "visible": false
  },
  {
    data: "fullname",
    title: "Full Name"
  },
  {
    data: "s0.name",
    title: "Name"
  },
 {
    data: "s0.surname",
    title: "Surname"
  },
 {
    data: "s0.father",
    title: "Father Name"
  },
  {
    data: "s0.mother",
    title: "Mother Name"
  },
  {
    data: "s0.sex",
    title: "Gender"
  },
 {
    data: "s0.placeofbirthlocal",
    title: "Place of Birth"
  },
 {
    data: "s0.dateofbirth",
    title: "Date of Birth"
  },
 {
    data: "s0.noregistry",
    title: "Registry Number"
  }];

  var myTable;

  // local URL's are not allowed
  var url_ws_mock_get = '/api/posts/jsonget';
  var url_ws_mock_ok = '/api/posts/jsonok';
  
  myTable = $('#example').DataTable({
    "sPaginationType": "full_numbers",
    ajax: {
        url : url_ws_mock_get,
        // our data is an array of objects, in the root node instead of /data node, so we need 'dataSrc' parameter
        dataSrc : ''
    },
    columns: columnDefs,
	    dom: 'Bfrtip',        // Needs button container
        select: 'single',
        responsive: true,
        altEditor: true,     // Enable altEditor
        buttons: [{
            text: 'Add',
            name: 'add'        // do not change name
        },
        {
            extend: 'selected', // Bind to Selected row
            text: 'Edit',
            name: 'edit'        // do not change name
        },
        {
            extend: 'selected', // Bind to Selected row
            text: 'Delete',
            name: 'delete'      // do not change name
        },
        {
            text: 'Refresh',
            name: 'refresh'      // do not change name
        }],
        onAddRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be / with type='PUT'
                url: url_ws_mock_ok + "/" + "type=PUT",
                type: 'GET',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='DELETE'
                url: url_ws_mock_ok + "/" + "type=DELETE",
                type: 'GET',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='POST'
                url: url_ws_mock_ok + "/" + "type=POST",
                type: 'GET',
                data: rowdata,
                success: success,
                error: error
            });
        }
  });


});
