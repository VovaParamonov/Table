import {addTable, sortTable, drow_table, check_tr, arr_values_create, delTable} from './funcs';
var $ = require("jquery");
//-------Переменные-------
var $btn_create = $('#button');
var $for_table = $('#for_table');
var $btn_del_row = $('.del_row');
var $btn_del_col = $('.del_col');
var $btn_create_row = $('.create_row');
var $btn_create_col = $('.create_col');
var $btn_sort_row = $('.sort_row');
var $btn_sort_col = $('.sort_col');

var arr_values = [];
var columns;
var rows;

var activeRow = -1;
var activeCol = -1;

var sortRowActive = false;
var sortColActive = false;

var delRowActive = false;
var delColActive = false;

var createRowActive = false;
var createColActive = false;

$(document).ready(function(){
  $.get("http://dev.bittenred.com:61536/table", function(data){
    if (data != ""){
      arr_values = data;
      drow_table(arr_values);
    }
  })
})

//-------------------Обработчики-------------------------
$btn_sort_row.on('click', function(){
  $('.td').addClass('td-active');
  sortRowActive = true;
  createRowActive = false;
  createColActive = false;
  delRowActive = false;
  delColActive = false;
  sortColActive = false;
});

$btn_sort_col.on('click', function(){
  $('.td').addClass('td-active');
  sortColActive = true;
  createRowActive = false;
  createColActive = false;
  delRowActive = false;
  delColActive = false;
  sortRowActive = false;
});

$btn_del_col.on('click', function(){
  $('.td').addClass('td-active');
  delColActive = true;
  createRowActive = false;
  createColActive = false;
  delRowActive = false;
  sortColActive = false;
  sortRowActive = false;
});
$btn_del_row.on('click', function(){
  $('.td').addClass('td-active');
  delRowActive = true;
  createRowActive = false;
  createColActive = false;
  // $for_table.children('td').map(function(index, elem) {});
});

$btn_create_col.on('click', function(){
  $('.td').addClass('td-active');
  createColActive = true;
  delRowActive = false;
  delColActive = false;
});
$btn_create_row.on('click', function(){
  $('.td').addClass('td-active');
  createRowActive = true;
  delRowActive = false;
  delColActive = false;
});

$btn_create.click(function(){
  // $.post( "http://dev.bittenred.com:61536/Table", [[1,2,3,4],[1,2,3,4]], function( data ) {
  // alert( "Data Loaded: " + data );
// });
  //$.post("http://dev.bittenred.com:61536/Table", $.extend({},[[1,2,3,4],[1,2,4,5]]),function(){});
  $.ajax({
      url: 'http://dev.bittenred.com:61536/table',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify([[1, 2, 3], [1, 2, 3], [1, 2, 3]]),
  }).done(function (res) {
      console.log(res);

      $.get('http://dev.bittenred.com:61536/table').done(function (res) {
          console.log(res)
      })
  })
  $('.td').addClass('td-active');
  $btn_del_row.addClass('btn_action');
  $btn_del_col.addClass('btn_action');
  $btn_create_row.addClass('btn_action');
  $btn_create_col.addClass('btn_action');
  rows = Number($('#row_value').val());
  columns = Number($('#column_value').val());

  arr_values = arr_values_create(rows, columns);

  activeRow = -1;
  activeCol = -1;

  drow_table(arr_values, activeRow, activeCol);
});
$for_table.on('click', 'td', function(){
  if (delColActive == true || delRowActive == true) {
    if (delRowActive == true) {
      activeRow = $(this).attr('data-row');
      arr_values = delTable(arr_values, null, activeRow);
      delColActive = false;
      delRowActive = false;
      if (arr_values.length == 0) {
        $btn_del_row.removeClass("btn_action");
        $btn_del_col.removeClass("btn_action");
        $btn_create_row.removeClass("btn_action");
        $btn_create_col.removeClass("btn_action");
      }
      drow_table(arr_values);
    } else if (delColActive == true) {
      activeCol = $(this).attr('data-col');
      arr_values = delTable(arr_values, activeCol);
      delColActive = false;
      delRowActive = false;
      if (arr_values[0].length == 0) {
        $btn_del_row.removeClass("btn_action");
        $btn_del_col.removeClass("btn_action");
        $btn_create_row.removeClass("btn_action");
        $btn_create_col.removeClass("btn_action");
      }
      drow_table(arr_values);
    }
  } else if (createColActive == true || createRowActive == true) {
    if (createRowActive == true) {
      // alert('createRowActive');
      activeRow = $(this).attr('data-row');
      arr_values = addTable(arr_values, null, activeRow);
      drow_table(arr_values);
      activeRow = -1;
      createRowActive = false;
    } else if (createColActive == true) {
      // alert('createColActive');
      activeCol = $(this).attr('data-col');
      arr_values = addTable(arr_values, activeCol, null);
      drow_table(arr_values);
      createColActive = false;
      activeCol = -1;
    }
  } else if (sortColActive == true || sortRowActive == true) {
    if (sortRowActive == true) {
      activeRow = $(this).attr('data-row');
      arr_values = sortTable($(this).attr('data-row'), null, arr_values);
      drow_table(arr_values, activeRow, activeCol);
      activeRow = -1;
      sortRowActive = false;
    } else if (sortColActive == true){
      activeCol = $(this).attr('data-col');
      arr_values = sortTable(null, $(this).attr('data-col'), arr_values);
      drow_table(arr_values, activeRow, activeCol);
      activeCol = -1;
      sortColActive = false;
    }
  }
  else {
    // if (activeRow == -1) {
    //   activeRow = $(this).attr('data-row');
    //   arr_values = sortTable($(this).attr('data-row'), $(this).attr('data-col'), arr_values);
    //   drow_table(arr_values, activeRow, activeCol);
    // } else if (activeCol == -1) {
    //   activeCol = $(this).attr('data-col');
    //   arr_values = sortTable(null, $(this).attr('data-col'), arr_values);
    //   drow_table(arr_values, activeRow, activeCol);
    // }
  }
});
