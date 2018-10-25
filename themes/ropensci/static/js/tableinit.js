var oTable;
$(document).ready( function () {
    var radio = $('input[type=radio]')
    var checkbox = $('input[type=checkbox]')
    var markdown = new showdown.Converter();

    oTable = $('#packagestable').DataTable({
        "ajax": {
            "url": "https://gist.githubusercontent.com/maelle/9d7542859d1c998d0b4c4ad3905cfc70/raw/18e1d46bb3b5e365786994a83c76606f3683cc6e/registry.json",
            "dataSrc": "packages"
        },
        "columns": [
          {
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
                    type: 'status',
                    _: 'status'
                    },
                title: "status"
            },
            {
                "data": function(row, type, set, meta){
                return '<a href="#packagestable" onclick="oTable.search(\'' + row.maintainer + '\').draw();">' + row.maintainer + '</a>';
},
                "title": "maintainer",
                "name": "select"
            },
            {
                "data": function(row, type, set, meta) {
                    return markdown.makeHtml(row.description);
                },
                "title": "description",
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
                "data": 'keywords',
                "visible": false
            }
        ],
        "createdRow" : function( row, data, index ){
            // combine some small categories
            if(data.ropensci_category == "data-analysis" || data.ropensci_category == "metadata")
               data.ropensci_category =  "data-tools";
            $(row).addClass(data.ropensci_category);
            if(data.on_cran)
                $(row).addClass('on_cran');
            if(data.status == "active")
                $(row).addClass('active');
        },
        "info": false, // won't display showed entries of total
        "pagingType": "simple_numbers",
        "pageLength": 18,
        "lengthChange": false, // Disables ability to change results number per page
                "language": {
            "search": ' ', // Changes 'Search' label value
            "searchPlaceholder": "Type to search on all fields incl. hidden fields like keywords", // adds placeholder text to search field
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

    $(checkbox).change(function() {
        oTable.search("").draw();
    });

    /* Custom filtering function which will filter data in column four between two values */
    $.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
            var cran = $('input[type=checkbox]')
            var active = $('input[type=checkbox]')
            var selected = $('input:checked')
            var filter = selected.attr('class')
            if (cran.is(':checked') && ! $(oSettings.aoData[iDataIndex].nTr).hasClass('on_cran')){
                return false;
            }
            if (active.is(':checked') && ! $(oSettings.aoData[iDataIndex].nTr).hasClass('active')){
                return false;
            }
            return !filter || filter == 'all' || $(oSettings.aoData[iDataIndex].nTr).hasClass(filter);
        }
    );
});
