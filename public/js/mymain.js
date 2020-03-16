function headerserv () {
    // var keys = $('#queryvalue').val();
    // document.getElementById('search_input').value=keys;
    var keys = $('#search_input').val()
  
    console.log(keys)
    var res = keys.split(',')
    var last = []
    data = JSON.stringify(res)
    var parsed = JSON.parse(data)
    // window.location= "http://192.168.10.19:8443/search="+parsed+"&page=1";
    window.location = '/search?searched=' + parsed + '&page=1'
  }
  
  function advanceSearch () {
    var keys = $('#advance-search').val()
  
    console.log(keys)
    // var res = keys.split(",");
    // var last = [];
    // data = JSON.stringify(res);
    // var parsed = JSON.parse(data);
    // window.location= "http://192.168.10.19:8443/search="+parsed+"&page=1";
    window.location = '/advance?searched=' + keys + '&page=1'
  }
  
  function InsertClient () {
    var keys = $('#add-client').val()
  
    console.log(keys)
    var url = '/api/posts/addclient'
  
    callAjaxInsert(keys, url)
  }
  
  function setval () {
    var keys = $('#queryvalue').val()
    document.getElementById('search_input').value = keys
  }
  
  function search (page) {
    var keys = $('#search_input').val()
    var skip = 0
    if (page > 0) {
      skip = 20 * page
    }
    var res = keys.split(' ')
    var last = []
    data = JSON.stringify(res)
    var parsed = JSON.parse(data)
    document.getElementById('testtest1').innerHTML = JSON.stringify(parsed)
    // console.log(parsed);
    // callAjax(parsed,skip);
  }
  
  function inserttargetinfo (json) {
    var url = '/add'
  
    var result = callAjax(json, url)
    return result
  }
  
  function insert_data (json) {
    var url = '/insert'
    // var result="";
    var result = callAjax(json, url)
    return result
  }
  
  function savetargetinfo (json) {
    var url = '/edit'
  
    callAjax(json, url)
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
          var selectedOption = 'Client Select ...'
  
          if (select.prop) {
            var options = select.prop('options')
          } else {
            var options = select.attr('options')
          }
          $('option', select).remove()
  
          $.each(newOptions, function (val, text) {
            //var clientjson = JSON.parse(text) val
            options[options.length] = new Option(text["fullname"], text["_id"])
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
      },
  
      failure: function (data) {
        console.log(data)
        alert('error')
      }
    })
    return result
  }
  