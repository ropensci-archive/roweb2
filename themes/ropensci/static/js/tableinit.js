$(document).ready( function () {
    var radio = $('input[type=radio]')
    var checkbox = $('input[type=checkbox]')

    var oTable = $('#packagestable').DataTable({
        "ajax" : {
            "url" : "https://ropensci.github.io/roregistry/registry.json",
            "dataSrc": "packages"
        },
        "columns": [
            { "data" : function(row, type, set, meta){
                return '<a href="' + row.url + '">' + row.name + '</a>';
            }},
            { "data": "maintainer" },
            { "data": "description" },
            { "data": function(row, type, set, meta){
                var src = '<a target="_blank" href="' + row.url + '"><p class="label icon-github"></p></a>';
                if(row.on_cran){
                    src = '<a target="_blank" href="https://cran.r-project.org/package=' + row.name + '"><p class="label cran">cran</p></a>' + src;
                } else if(row.on_bioc){
                    src = '<a target="_blank" href="https://bioconductor.org/packages/release/bioc/html/' + row.name + '.html"><p class="label bioc">bioc</p></a>' + src;
                } else {
                    src = '<p class="label nocran">cran</p>' + src;
                }
                return src;
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
            "searchable": false, 
            "targets": 3 
        }],
        "language": {
            "search": ' ', // Changes 'Search' label value
            "searchPlaceholder": "Type to search…", // adds placeholder text to search field
            "paginate": {
                "previous": "Prev", //changes 'Previous' label value
            }
        }
    });

    $(radio).change(function() {
        oTable.draw();
    });

    $(checkbox).change(function() {
        oTable.draw();
    });

    /* Custom filtering function which will filter data in column four between two values */
    $.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
            var cran = $('input[type=checkbox]')
            var selected = $('input:checked')
            var $class = selected.attr('class')
            if (cran.is(':checked') && ! $(oSettings.aoData[iDataIndex].nTr).hasClass('on_cran')){
                return false;
            }
            return ($class === 'all') || $(oSettings.aoData[iDataIndex].nTr).hasClass($class);
        }
    );
});
