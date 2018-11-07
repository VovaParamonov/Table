import {addTable, sortTable, arr_values_create, delTable} from './funcs';
import $ from 'jquery';

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

function drow_table(arr_values, activeRow, activeCol){
    if (arr_values != ''){
        if (arr_values.length > 20) {
            alert("Таблица была на сокращена на " + (arr_values.length - 20) + " строк");
            arr_values.splice(20, arr_values.length);
        }
        if (arr_values[0].length > 9) {
            alert("Таблица была на сокращена на " + (arr_values[0].length - 9) + " столбец");
            arr_values.forEach(function(item, i, arr){
                item.splice(9, item.length);
            });
        }
    }
    var $container = $('#for_table');

    var $table = $('<table>');

    arr_values.forEach(function(row, rowIndex) {

        var $row = $('<tr data-row = "' + rowIndex + '" >');

        if (rowIndex == activeRow && activeCol == -1) {

            //-----Выделение
            $row.css('fontWeight', 'bold');
            setTimeout(function(){
                $row.css('fontWeight', 'normal');
            }, 500);
        }

        row.forEach(function(col, colIndex) {
            var $col = $('<td class="td" data-row="' + rowIndex + '" data-col="' + colIndex + '" >');

            $col.text(col);
            $row.append($col);

            if (colIndex == activeCol) {
                $col.css('fontWeight', 'bold');
                setTimeout(function(){
                    $col.css('fontWeight', 'normal');
                }, 500);
            }
        });
        $table.append($row)
    });
    $container.html($table)
}

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
      $loader.removeClass('loading');
      console.log(res);
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
  btns_activated();
  rows = Number($('#row_value').val());
  columns = Number($('#column_value').val());

  arr_values = arr_values_create(rows, columns);

  activeRow = -1;
  activeCol = -1;
  if (arr_values.length == 0 || arr_values[0].length == 0){
    btns_deactivated();
  }
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
        btns_deactivated();
      }
      drow_table(arr_values);
    } else if (delColActive == true) {
      activeCol = $(this).attr('data-col');
      arr_values = delTable(arr_values, activeCol);
      delColActive = false;
      delRowActive = false;
      if (arr_values[0].length == 0) {
        btns_deactivated();
      }
      drow_table(arr_values);
    }
  } else if (createColActive == true || createRowActive == true) {
    if (createRowActive == true) {
      activeRow = $(this).attr('data-row');
      arr_values = addTable(arr_values, null, activeRow);
      drow_table(arr_values);
      activeRow = -1;
      createRowActive = false;
    } else if (createColActive == true) {
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
});
