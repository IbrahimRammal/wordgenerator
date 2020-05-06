function InsertClient () {
    var keys = $('#add-client').val()
  
    console.log(keys)
    var url = '/api/posts/addclient'
  
    callAjaxInsert(keys, url)
  }

  
  function callAjax (parameters, url, handleData) {
    var result = ''
    method = 'POST'
    var params = parameters
  
    $.ajax({
      url: url,
      type: method,
      cache: false,
      data: params,
      dataType: 'json',
      beforeSend: function () {
        // console.log("defore");
        // console.log(params)
      },
      success: function (fixtures) {
        console.log('success')
        console.log(fixtures['html'])
        if (fixtures) {
          // var e = document.getElementById("client_list");
  
          var newOptions = fixtures['html']
  
          var select = $('#client_list')
          var selectedOption = 'Client Select ...'
  
          if (select.prop) {
            var options = select.prop('options')
          } else {
            var options = select.attr('options')
          }
          $('option', select).remove()
  
          $.each(newOptions, function (val, text) {
            options[options.length] = new Option(text, val)
          })
          // console.log("data");
          // console.log(data.update);
          // alert(data.update)
          result = 'True'
        }
      },
      timeout: 5000,
      error: function () {
        alert('error')
        result = 'False'
      },
  
      failure: function (data) {
        console.log(data)
        alert('error')
        result = 'False'
      }
    })
    return result
  }
  
  function callAjaxInsert (parameters, url, handleData) {
    $("#lan_list").material_select();
    var result = ''
    method = 'POST'
    var params = {
      value: parameters // blldkf,fdsjlk,sdalfkj,sdklfj
    }
  
    $.ajax({
      url: url,
      type: method,
      cache: false,
      data: params,
      dataType: 'json',
      beforeSend: function () {
        // console.log("defore");
        // console.log(params)
      },
      success: function (fixtures) {
        console.log('success')
        console.log(fixtures['html'])
        if (fixtures) {
          // var e = document.getElementById("client_list");
  
          var newOptions = fixtures['html']
  
          var select = $('#client_list')
          // var selectedOption = 'Client Select ...'
  
          // if (select.prop) {
          //   var options = select.prop('options')
          // } else {
          //   var options = select.attr('options')
          // }
          // $('option', select).remove()

          $('#client_list').empty(); 
  
          $.each(newOptions, function (val, text) {
            //var clientjson = JSON.parse(text) val
            // options[options.length] = new Option(text["fullname"], text["_id"])
            var id = text['_id'];
            var name = text['fullname'];
            $('#client_list').append($("<option value='" + id + "'>" + name +"</option>"));
          })

          // $('#client_list').material_select();





          // console.log("data");
          // console.log(data.update);
          // alert(data.update)
          result = 'True'
        }
      },
      timeout: 5000,
      error: function () {
        alert('error')
      },
  
      failure: function (data) {
        console.log(data)
        alert('error')
      }
    })
    return result
  }
  