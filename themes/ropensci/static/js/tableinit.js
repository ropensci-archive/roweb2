var oTable;
$(document).ready( function () {
    var radio = $('input[type=radio]')
    var checkbox = $('input[type=checkbox]')
    var markdown = new showdown.Converter();

    oTable = $('#packagestable').DataTable({
        "ajax" : {
            "url" : "https://gist.githubusercontent.com/maelle/9d7542859d1c998d0b4c4ad3905cfc70/raw/68cba8ebe4e0489e81338c136483875ac402743f/registry.json",
            "dataSrc": "packages"
        },
        "columns": [
            { "data" : function(row, type, set, meta){
                return '<a target="_blank" href="' + row.url + '"><p class="label icon-github"></p></a> ' + row.name;
            }},
            { "data": function(row, type, set, meta){
                return '<a href="#packagestable" onclick="oTable.search(\'' + row.maintainer + '\').draw();">' + row.maintainer + '</a>';
            }},
            { "data": function(row, type, set, meta){
                return markdown.makeHtml(row.status);
            }},
            { "data": function(row, type, set, meta){
                return markdown.makeHtml(row.description);
            }},
            { "data": function(row, type, set, meta){
                var src = '';
                if(row.on_cran){
                    src = '<a target="_blank" href="https://cran.r-project.org/package=' + row.name + '"><p class="label cran">cran</p></a>' + src;
                } else if(row.on_bioc){
                    src = '<a target="_blank" href="https://bioconductor.org/packages/release/bioc/html/' + row.name + '.html"><p class="label bioc">bioc</p></a>' + src;
                } else {
                    src = '<p class="label nocran">cran</p>' + src;
                }
                return src;
            }},
            { "data": function(row, type, set, meta){
                return markdown.makeHtml(row.onboarding);
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
        }],
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

    $(checkbox).change(function() {
        oTable.search("").draw();
    });

    /* Custom filtering function which will filter data in column four between two values */
    $.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
            var cran = $('input[type=checkbox]')
            var selected = $('input:checked')
            var filter = selected.attr('class')
            if (cran.is(':checked') && ! $(oSettings.aoData[iDataIndex].nTr).hasClass('on_cran')){
                return false;
            }
            return !filter || filter == 'all' || $(oSettings.aoData[iDataIndex].nTr).hasClass(filter);
        }
    );
});
