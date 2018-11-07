var $ = require("jquery");
import './DOM.js';

export function addTable (arr_values, activeCol = null, activeRow = null) {
  var arr1;
  var arr2;

  if (activeCol != null) {

    arr_values = arr_values.map(function(item, i, arr){
      arr1 = item.slice(0, activeCol);
      arr2 = item.slice(activeCol, item.length);

      arr1.push(Math.floor(Math.random() * (arr_values.length)) + 1);

      item = arr1.concat(arr2);
      return item;
    });
  } else if (activeRow != null ) {
    arr1 = arr_values.slice(0, activeRow);
    arr2 = arr_values.slice(activeRow, arr_values.length);

    var arr_new = [];
    for(var i = 0; i<arr_values[0].length;i++){
      arr_new.push(Math.floor(Math.random() * (arr_values[0].length)) + 1);
    }
    arr1.push(arr_new);

    arr_values = arr1.concat(arr2);
  }
  return arr_values;
}

function delTable (arr_values,  activeCol = null, activeRow = null) {
  if (activeCol != null) {
    arr_values.forEach(function(item, i, arr){
      item.splice(activeCol, 1);
    });
  } else if (activeRow != null) {
    arr_values.splice(activeRow, 1);
  }
  return arr_values;
}

function sortTable (sortRow, sortCol, table) {
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
  if (arr_values.length == 0 || arr_values[0].length == 0 ) {
    return
  }

  if (arr_values.length > 5) {
    alert("Таблица была на сокращена на " + (arr_values.length - 5) + " строк");
    arr_values.splice(5, arr_values.length);
  }
  // if (arr_values[0].length > 9) {
  //   alert("Таблица была на сокращена на " + (arr_values[0].length - 9) + " столбец");
  //   arr_values.forEach(function(item, i, arr){
  //     item.splice(9, item.length);
  //   });
  // }
  var $container = $('#for_table');

	var $table = $('<table>');

	arr_values.forEach(function(row, rowIndex) {

		var $row = $('<tr data-row = "' + rowIndex + '" >');

		if (rowIndex == activeRow && activeCol == -1) {

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
				$col.css('fontWeight', 'bold'); //#6BED54
				setTimeout(function(){
					$col.css('fontWeight', 'normal');
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
}

export {sortTable, drow_table, check_tr, arr_values_create, delTable};




// export function test(){
// 	return 'Hello webpack';
// }
