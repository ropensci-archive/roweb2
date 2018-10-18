var oTable;
$(document).ready( function () {
    var radio = $('input[type=radio]')
    var markdown = new showdown.Converter();

    oTable = $('#packagestable').DataTable({
        "ajax" : {
            "url" : "https://gist.github.com/maelle/9d7542859d1c998d0b4c4ad3905cfc70/raw/18e1d46bb3b5e365786994a83c76606f3683cc6e/registry.json",
            "dataSrc": "packages"
        },
        "columns": [
            { "data" : function(row, type, set, meta){
                return '<a href="' + row.url + '">' + row.name + '</a>';
            }},
            { data: 'status',
    render: {
        display: 'badge',
        sort: 'status',
        filter: 'status',
        type: 'status'
    }},
            { "data": function(row, type, set, meta){
                return '<a href="#packagestable" onclick="oTable.search(\'' + row.maintainer + '\').draw();">' + row.maintainer + '</a>';
            }},
            { "data": function(row, type, set, meta){
                return markdown.makeHtml(row.description);
            }},
            { data: 'on_cran',
    render: {
        display: 'badge',
        sort: 'on_cran',
        filter: 'on_cran',
        type: 'on_cran'
    }},
            { data: 'onboarding',
    render: {
        display: 'badge',
        sort: 'review',
        filter: 'review',
        type: 'review'
    }},
            { "data": function(row, type, set, meta){
                return row.keywords;
            }}
        ],
        "createdRow" : function( row, data, index ){
            // combine some small categories
            if(data.ropensci_category == "data-analysis" || data.ropensci_category == "metadata")
               data.ropensci_category =  "data-tools";
            $(row).addClass(data.ropensci_category);
            if(data.on_cran)
                $(row).addClass('on_cran');
        },
        "info": false, // won't display showed entries of total
        "pagingType": "simple_numbers",
        "pageLength": 18,
        "lengthChange": false, // Disables ability to change results number per page
        "columnDefs": [{ 
            "searchable": true, 
            "targets": 3 
        },
            {
                "targets": 6,
                "visible": false
            },
            { "title": "Package",   "targets": 0 },
    { "title": "Status",  "targets": 1 },
    { "title": "Maintainer", "targets": 2 },
    { "title": "Description",  "targets": 3 },
    { "title": "CRAN/Bioc",    "targets": 4 },
    { "title": "Onboarding",  "targets": 5 }],
        "language": {
            "search": ' ', // Changes 'Search' label value
            "searchPlaceholder": "Type to search…", // adds placeholder text to search field
            "paginate": {
                "previous": "Prev", //changes 'Previous' label value
            }
        }
    }).on('search', function(){
        if(oTable.search())
            radio.prop('checked', false);
    });

    $(radio).change(function() {
        oTable.search("").draw();
    });


});
