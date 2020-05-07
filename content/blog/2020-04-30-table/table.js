function format ( d ) {
    console.log(d);
    var markdown = new showdown.Converter();
    
    var src = "";
    
    src = src + markdown.makeHtml(d[5]);
    
    if (d[7]){
                  src = src + '<p><a target=\"_blank\" href="' + d[7] + '">This package has passed open software peer review.</a></p>';
                } 
    if (d[8]) {
    src = src +
       'Scientific use cases' +
        markdown.makeHtml(d[8]);
    } 
    
    return src
}
 
$(document).ready(function() {
    var dt = $('#packagestable').DataTable( {
        // Disables ability to change results number per page
                "language": {
            "search": ' ', // Changes 'Search' label value
            "searchPlaceholder": "Search by: name, maintainer, or keyword", // adds placeholder text to search field
            "paginate": {
                "previous": "Prev", //changes 'Previous' label value
            }},
        "columnDefs": [
            {
                "class":          "details-control",
                "orderable":      false,
                targets:           [ 0 ],
                visible: true,
                title: "<small>Click for Details</small>"
            },
            {
                render : function(data, type, row, meta){
                return '<a href="https://docs.ropensci.org/' + data + '">' + data + '</a>';
},
                targets: [1],
                visible: true
            },
            {
                targets: [2],
                title: "Description",
                visible: true
            },
            {
                render:  function(data, type, row, meta){
                  var markdown = new showdown.Converter({simplifiedAutoLink: true});
                      return markdown.makeHtml(data);             
},
                title: "Data Source",
                targets: [3],
                visible: true
            },
            {
                targets: [4],
                title: "Maintainer",
                visible: true
            },
            {
                "targets": '_all',
                "visible": false
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