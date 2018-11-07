import {addTable, sortTable, drow_table, check_tr, arr_values_create, delTable} from './funcs';
var $ = require("jquery");

export {
  sortRowActive,
  sortColActive,

  delRowActive,
  delColActive,

  createRowActive,
  createColActive
};
//-------Переменные-------
var $btn_create = $('#button');
var $btn_clear = $('#clear');
var $for_table = $('#for_table');
var $btn_del_row = $('.del_row');
var $btn_del_col = $('.del_col');
var $btn_create_row = $('.create_row');
var $btn_create_col = $('.create_col');
var $btn_sort_row = $('.sort_row');
var $btn_sort_col = $('.sort_col');
var $loader = $('.loader');
var $btn_save =  $('.ajax_save');
var $btn_load =  $('.ajax_load');

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

//---------------------Функции---------------
function action_clear(){
  createRowActive = false;
  createColActive = false;
  delRowActive = false;
  delColActive = false;
  sortColActive = false;
  sortRowActive = false;
}
function btns_activated() {
  $btn_del_row.addClass('btn_action');
  $btn_del_col.addClass('btn_action');
  $btn_create_row.addClass('btn_action');
  $btn_create_col.addClass('btn_action');
  $('.td').addClass('td-active');
}
function btns_deactivated(){
  $btn_del_row.removeClass("btn_action");
  $btn_del_col.removeClass("btn_action");
  $btn_create_row.removeClass("btn_action");
  $btn_create_col.removeClass("btn_action");
}

function loadTable(){
  $.get("http://dev.bittenred.com:61536/table", function(data){
    if (data != ""){
      arr_values = data;
      drow_table(arr_values);
      btns_activated();
    }
  }).done(function(res,inf){
    console.log(res);
    $loader.removeClass('loading');
  }).fail(function(res,inf){
    console.log(res);
    $loader.addClass('loader-fail');
    setTimeout(function(){
      $loader.removeClass('loader-fail');
      $loader.removeClass('loading');
    },1000)
  })
}

function saveTable() {
  $.ajax({
      url: 'http://dev.bittenred.com:61536/table',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(arr_values),
      timeout: 5000
  }).done(function (res) {
      console.log(res);

      $.get('http://dev.bittenred.com:61536/table').done(function (res) {
          console.log(res)
      $loader.removeClass('loading');
    })
  }).fail(function(res,inf){
      console.log(res);
      $loader.addClass('loader-fail');
      setTimeout(function(){
        $loader.removeClass('loader-fail');
        $loader.removeClass('loading');
      },1000)
    });
}

$btn_load.on('click', function(){
  $loader.addClass('loading');
  loadTable();
})
$btn_save.on('click', function(){
  $loader.addClass('loading');
  saveTable();
})

//-------------------Обработчики-------------------------
$btn_clear.on('click', function(){
  arr_values = [];
  btns_deactivated();
  drow_table(arr_values);
})

$btn_sort_row.on('click', function(){
  $('.td').addClass('td-active');
  action_clear();
  sortRowActive = true;

});

$btn_sort_col.on('click', function(){
  $('.td').addClass('td-active');
  action_clear()
  sortColActive = true;
});

$btn_del_col.on('click', function(){
  $('.td').addClass('td-active');
  action_clear();
  delColActive = true;
});
$btn_del_row.on('click', function(){
  $('.td').addClass('td-active');
  action_clear();
  delRowActive = true;
  // $for_table.children('td').map(function(index, elem) {});
});

$btn_create_col.on('click', function(){
  $('.td').addClass('td-active');
  action_clear();
  createColActive = true;
});
$btn_create_row.on('click', function(){
  $('.td').addClass('td-active');
  action_clear();
  createRowActive = true;
});

$btn_create.click(function(){
  // $.post( "http://dev.bittenred.com:61536/Table", [[1,2,3,4],[1,2,3,4]], function( data ) {
  // alert( "Data Loaded: " + data );
// });
  //$.post("http://dev.bittenred.com:61536/Table", $.extend({},[[1,2,3,4],[1,2,4,5]]),function(){});
  btns_activated();
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
