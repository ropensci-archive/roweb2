function format ( d ) {
    var markdown = new showdown.Converter();
    if (d.citations) {
    return markdown.makeHtml(d.details)+
       'Scientific use cases' +
        markdown.makeHtml(d.citations);
    } else {
    return markdown.makeHtml(d.details)
    }
}
 
$(document).ready(function() {
    var dt = $('#packagestable').DataTable( {
        
        "ajax": {
            "url": "registry.json",
            "dataSrc": "packages"
        },
        "columns": [
            {
                "class":          "details-control",
                "orderable":      false,
                "data":           null,
                "defaultContent": ""
            },
            {
                "data" : function(row, type, set, meta){
                return '<a href="https://docs.ropensci.org/' + row.name + '">' + row.name + '</a>';
},
                title: "Package"
            },
            {
                data: "description",
                title: "Description",
            },
            {
                data:  function(row, type, set, meta){
                  if (row.link) {
                     return '<a href="' + row.link + '">' + row.data_source + '</a>'; 
                  } else {
                    return row.data_source;
                  }               
},
                title: "Data Source"
            },
            {
                data: 'maintainer',
                title: "Maintainer"
            }
        ],
        "order": [[1, 'asc']]
    } );
 
    // Array to track the ids of the details displayed rows
    var detailRows = [];
 
    $('#packagestable tbody').on( 'click', 'tr td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = dt.row( tr );
        var idx = $.inArray( tr.attr('id'), detailRows );
 
        if ( row.child.isShown() ) {
            tr.removeClass( 'details' );
            row.child.hide();
 
            // Remove from the 'open' array
            detailRows.splice( idx, 1 );
        }
        else {
            tr.addClass( 'details' );
            row.child( format( row.data() ) ).show();
 
            // Add to the 'open' array
            if ( idx === -1 ) {
                detailRows.push( tr.attr('id') );
            }
        }
    } );
 
    // On each draw, loop over the `detailRows` array and show any child rows
    dt.on( 'draw', function () {
        $.each( detailRows, function ( i, id ) {
            $('#'+id+' td.details-control').trigger( 'click' );
        } );
    } );
} );