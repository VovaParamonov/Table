// TODO: move all code which work with server here

import $ from 'jquery';

export function loadTable(){
    $.get("http://dev.bittenred.com:61536/table").done(function(data){
        if (data && data.length !== 0){

        }

    }).fail(function(res){

    })
}
