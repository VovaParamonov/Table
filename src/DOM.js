import {addTable, sortTable, arr_values_create, delTable} from './funcs';
import {loadAjax, saveAjax} from './api.js';
import $ from 'jquery';

// TODO: continue this changes
// TODO: remove most global state

export default function table($container) {

    var $btn_create = $container.find('#button');

    var $btn_clear = $container.find('#clear');
    var $for_table = $container.find('#for_table');
    var $btn_del_row = $container.find('.del_row');
    var $btn_del_col = $container.find('.del_col');
    var $btn_create_row = $container.find('.create_row');
    var $btn_create_col = $container.find('.create_col');
    var $btn_sort_row = $container.find('.sort_row');
    var $btn_sort_col = $container.find('.sort_col');
    var $loader = $container.find('.loader');
    var $btn_save =  $container.find('.ajax_save');
    var $btn_load =  $container.find('.ajax_load');

    //-------Переменные-------

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

function drow_table(arr_values, activeRow, activeCol, btn){
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
    $container.find('#for_table').html($table);
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

}
function btns_deactivated(){
  $btn_del_row.removeClass("btn_action");
  $btn_del_col.removeClass("btn_action");
  $btn_create_row.removeClass("btn_action");
  $btn_create_col.removeClass("btn_action");
}

function loadTable(){
  function callLoad(result){
    if (typeof(result)=='object') {
      if (result.length == 0 || result[0].length == 0){
        alert("На сервере нет сохраненных таблиц");
        $loader.removeClass('loading');
      } else {
        arr_values = result;
        drow_table(arr_values);
        btns_activated();
        $loader.removeClass('loading');
      }
    } else {
      console.log(result);
      alert("Ошибка загрузки")
      alert(result)
      $loader.addClass('loader-fail');
      setTimeout(function(){
        $loader.removeClass('loader-fail');
        $loader.removeClass('loading');
      },1000);
    }
  }
  loadAjax(callLoad);
}

function saveTable() {
  function callSave(result){
    if (result == "Done"){
      $loader.removeClass('loading');
    } else if (result == "fail"){
      $loader.addClass('loader-fail');
      setTimeout(function(){
        $loader.removeClass('loader-fail');
        $loader.removeClass('loading');
      },1000)
    }
  }
  saveAjax(arr_values,callSave);
}

$btn_load.on('click', function(eventObj){
  //table($(eventObj).parents('container'));
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
  $container.find('.td').addClass('td-active');
  action_clear();
  sortRowActive = true;
});

$btn_sort_col.on('click', function(){
  $container.find('.td').addClass('td-active');
  action_clear()
  sortColActive = true;
});

$btn_del_col.on('click', function(){
  $container.find('.td').addClass('td-active');
  action_clear();
  delColActive = true;
});
$btn_del_row.on('click', function(){
  $container.find('.td').addClass('td-active');
  action_clear();
  delRowActive = true;
});

$btn_create_col.on('click', function(){
  $container.find('.td').addClass('td-active');
  action_clear();
  createColActive = true;
});
$btn_create_row.on('click', function(){
  $container.find('.td').addClass('td-active');
  action_clear();
  createRowActive = true;
});

$btn_create.click(function(eventObj){
  btns_activated();
  rows = Number($container.find('#row_value').val());
  columns = Number($container.find('#column_value').val());

  arr_values = arr_values_create(rows, columns);

  activeRow = -1;
  activeCol = -1;
  if (arr_values.length == 0 || arr_values[0].length == 0){
    btns_deactivated();
  }
  drow_table(arr_values, activeRow, activeCol, eventObj);
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
}
