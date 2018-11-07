import './css/styles.css';
import {sortTable, drow_table, check_tr, arr_values_create} from './funcs';
var $ = require("jquery");
import './DOM.js';

/*function sortTable (sortRow, sortCol, table) {
  let sorted

  if (sortRow !== null) {
    sorted = table[sortRow].map((val, index) => ({val, index}))
  } else if (sortCol !== null) {
    sorted = table.map((row, index) => ({val: row[sortCol], index}))
  }

  sorted = sorted.sort((a, b) => a.val - b.val || a.index - b.index).map(val => val.index)

  if (sortRow !== null) {
    return table.map(row => row.map((_, colIndex) => row[sorted[colIndex]]))
  } else if (sortCol !== null) {
    return table.map((_, rowIndex) => table[sorted[rowIndex]].map(col => col))
  }
}

function drow_table(arr_values, activeRow, activeCol){
	var $container = $('#for_table')

	var $table = $('<table>')

	arr_values.forEach(function(row, rowIndex) {

		var $row = $('<tr data-row = "' + rowIndex + '" >');

		if (rowIndex == activeRow && activeCol == -1) {

			$row.css('color', 'red');
			setTimeout(function(){
				$row.css('color', 'black');
			}, 500);
		}

		row.forEach(function(col, colIndex) {
			var $col = $('<td data-row="' + rowIndex + '" data-col="' + colIndex + '" >');

			$col.text(col);
			$row.append($col);

			if (colIndex == activeCol) {
				$col.css('color', 'red'); //#6BED54
				setTimeout(function(){
					$col.css('color', 'black');
				}, 500);
			}
		});

		$table.append($row)
	});

	$container.html($table)
}

function check_tr(arr_checked, value){
	var bool = false;
	for(var i = 0; i < arr_checked.length-1;i++){
		if (arr_checked[i]==value){
			bool = true;
		}
	}
	return (bool);
}

function arr_values_create(rows, columns) {
	var arr_values = [];

	for (var i =0; i < rows; i++){
		var podarr_values = [];

		for (var k = 0; k < columns; k++){
			podarr_values.push(Math.floor(Math.random() * (columns)) + 1);
		}

		arr_values.push(podarr_values);
	}

	return arr_values;
}*/

$(function(){

	//Переменные
	// var arr_values = [];
	// var columns;
	// var rows;

	// var activeRow = -1;
	// var activeCol = -1;

	// $('#button').click(function(){
	// 	rows = Number($('#row_value').val());
	// 	columns = Number($('#column_value').val());
  //
	// 	arr_values = arr_values_create(rows, columns);
  //
	// 	activeRow = -1;
	// 	activeCol = -1;
  //
	// 	drow_table(arr_values, activeRow, activeCol);
	// });
	// $('#for_table').on('click', 'td', function(){
  //
	// 	if (activeRow == -1) {
	// 		activeRow = $(this).attr('data-row');
	// 		arr_values = sortTable($(this).attr('data-row'), $(this).attr('data-col'), arr_values);
	// 		drow_table(arr_values, activeRow, activeCol);
	// 	} else if (activeCol == -1) {
	// 		activeCol = $(this).attr('data-col');
	// 		arr_values = sortTable(null, $(this).attr('data-col'), arr_values);
	// 		drow_table(arr_values, activeRow, activeCol);
	// 	}
	// });
});
