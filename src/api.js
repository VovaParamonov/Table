// TODO: move all code which work with server here
// Completed

import $ from 'jquery';

export function loadAjax(callback, id){
  var result;
  $.get("http://dev.bittenred.com:61536/table/" + id, function(data){
    result = data;
    callback(result)
  }).fail(function(res){
    console.log(res);
    result = "fail";
    callback(result);
  })
}
export function saveAjax(arr_values,callback, id) {
  var result;
  $.ajax({
      url: 'http://dev.bittenred.com:61536/table/' + id,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(arr_values),
      timeout: 5000
  }).done(function (res) {
      console.log(res);
      result = "Done";
      callback(result);
  }).fail(function(res,inf){
      console.log(res);
      result = 'fail';
      callback(result);
    });
}
