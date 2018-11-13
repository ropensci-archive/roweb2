var oTable;
$(document).ready( function () {
    var radio = $('input[type=radio]')
    var checkbox = $('input[type=checkbox]')
    var markdown = new showdown.Converter();

    oTable = $('#packagestable').DataTable({
        "ajax": {
            "url": "https://raw.githubusercontent.com/ropensci/roregistry/ex/registry2.json",
            "dataSrc": "packages"
        },
        "columns": [
          {
                data: 'name_col',
                title: "Name"
            },
            {
                data: 'status',
                visible: false,
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
                "title": "maintainer"
            },
            {
                "data": function(row, type, set, meta) {
                    return markdown.makeHtml(row.description);
                },
                "title": "description",
            },
            {
                data: 'details',
                title: "Details"
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
            if(data.on_cran.on_cran)
                $(row).addClass('on_cran');
            if(data.status.status == "active")
                $(row).addClass('active');
        },
        "info": false, // won't display showed entries of total
        "pagingType": "simple_numbers",
        "pageLength": 18,
        "lengthChange": false, // Disables ability to change results number per page
                "language": {
            "search": ' ', // Changes 'Search' label value
            "searchPlaceholder": "Search by: name, maintainer, or keyword", // adds placeholder text to search field
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
            var cran = $('input[class="on_cran"]')
            var active = $('input[class="active"]')
            var selected = $('input:checked')
            var filter = selected.attr('class')
            if ((cran.is(':checked') && ! $(oSettings.aoData[iDataIndex].nTr).hasClass('on_cran')) || (active.is(':checked') && ! $(oSettings.aoData[iDataIndex].nTr).hasClass('active'))){
                return false;
            }
            return !filter || filter == 'all' || $(oSettings.aoData[iDataIndex].nTr).hasClass(filter);
        }
    );
});
