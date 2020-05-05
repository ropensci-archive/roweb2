function format ( d ) {
    var markdown = new showdown.Converter();
    
    var src = "";
    
    src = src + markdown.makeHtml(d.details);
    
    if (d.onboarding){
                  src = src + '<p><a target=\"_blank\" href="' + d.onboarding + '">This package has passed open software peer review.</a>.</p>';
                } 
    if (d.citations) {
    src = src +
       'Scientific use cases' +
        markdown.makeHtml(d.citations);
    } 
    
    return src
}
 
$(document).ready(function() {
    var dt = $('#packagestable').DataTable( {
        
        "ajax": {
            "url": "registry.json",
            "dataSrc": "packages"
        }, // Disables ability to change results number per page
                "language": {
            "search": ' ', // Changes 'Search' label value
            "searchPlaceholder": "Search by: name, maintainer, or keyword", // adds placeholder text to search field
            "paginate": {
                "previous": "Prev", //changes 'Previous' label value
            }},
        "columns": [
            {
                "class":          "details-control",
                "orderable":      false,
                "data":           null,
                "defaultContent": "",
                title: "<small>Click for Details</small>"
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
                      var markdown = new showdown.Converter({simplifiedAutoLink: true});
                      return markdown.makeHtml(row.data_source);
                  }               
},
                title: "Data Source"
            },
            {
                data: 'maintainer',
                title: "Maintainer"
            },
            {
                "data": function(row, type, set, meta){return row.keywords || ""},
                "visible": false
            },
            {
                "data": function(row, type, set, meta){return row.citations || ""},
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