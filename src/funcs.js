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

export function delTable (arr_values,  activeCol = null, activeRow = null) {
  if (activeCol != null) {
    arr_values.forEach(function(item, i, arr){
      item.splice(activeCol, 1);
    });
  } else if (activeRow != null) {
    arr_values.splice(activeRow, 1);
  }
  return arr_values;
}

export function sortTable (sortRow, sortCol, table) {
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


export function arr_values_create(rows, columns) {
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
