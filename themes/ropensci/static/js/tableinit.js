var oTable;
$(document).ready(function() {
    var markdown = new showdown.Converter();

    oTable = $('#packagestable').DataTable({
        "ajax": {
            "url": "https://gist.github.com/maelle/9d7542859d1c998d0b4c4ad3905cfc70/raw/18e1d46bb3b5e365786994a83c76606f3683cc6e/registry.json",
            "dataSrc": "packages"
        },
        "columns": [{
                "data": function(row, type, set, meta) {
                    return '<a href="' + row.url + '">' + row.name + '</a>';
                },
                "title": "name"
            },
            {
                data: 'status',
                render: {
                    display: 'badge',
                    sort: 'status',
                    filter: 'status',
                    type: 'status'
                },
                title: "status"
            },
            {
                "data": 'maintainer',
                "title": "maintainer"
            },
            {
                "data": function(row, type, set, meta) {
                    return markdown.makeHtml(row.description);
                },
                "title": "description",
                "searchable": "true"
            },
            {
                data: 'on_cran',
                render: {
                    display: 'badge',
                    sort: 'on_cran',
                    filter: 'on_cran',
                    type: 'on_cran'
                },
                title: "CRAN/Bioc"
            },
            {
                data: 'onboarding',
                render: {
                    display: 'badge',
                    sort: 'review',
                    filter: 'review',
                    type: 'review'
                },
                title: "onboarding"
            },
            {
                "data": function(row, type, set, meta) {
                    return row.keywords;
                },
                "visible": "false"
            }
        ],
        "createdRow": function(row, data, index) {
            // combine some small categories
            if (data.ropensci_category == "data-analysis" || data.ropensci_category == "metadata")
                data.ropensci_category = "data-tools";
            $(row).addClass(data.ropensci_category);
            if (data.on_cran)
                $(row).addClass('on_cran');
        },
        "info": false, // won't display showed entries of total
        "pagingType": "simple_numbers",
        "pageLength": 18,
        "lengthChange": false, // Disables ability to change results number per page
        "language": {
            "paginate": {
                "previous": "Prev", //changes 'Previous' label value
            }
        },
        initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
    })


});