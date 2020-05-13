var oTable;
$(document).ready( function () {
    var radio = $('input[type=radio]')
    var checkbox = $('input[type=checkbox]')
    var markdown = new showdown.Converter();

    oTable = $('#packagestable').DataTable({
        "ajax": {
            "url": "https://ropensci.github.io/roregistry/registry.json",
            "dataSrc": function ( json ) {
                var data = json.packages;
                data = data.sort(function(a, b) {
    return Date.parse(b.date_last_commit) - Date.parse(a.date_last_commit);
});
                return(data);
            }
        },
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '<i class="label fa fa-caret-right"></i>'
            },
            {
                "data" : function(row, type, set, meta){
                    return '<a href="https://docs.ropensci.org/' + row.name + '">' + row.name + '</a>';
                },
                title: "Name"
            },
            {
                data: 'status',
                visible: false,
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
                "data" : function(row, type, set, meta){
                    return '<a target="_blank" href=\"https://www.repostatus.org/#' + row.status + '"><i class="label icon-ropensci-short ' + row.status  +'" ' + row.status + '" title = "' + row.status + ' package"></i></a>';
                },
                title: ""
            },
            {
                "data": function(row, type, set, meta){
                    var src = '';
                    if(row.on_cran){
                        src = '<a target="_blank" href="https://cran.r-project.org/package=' + row.name + '"><p class="label cran">cran</p></a>' + src;
                    } else if(row.on_bioc){
                        src = '<a target="_blank" href="https://bioconductor.org/packages/release/bioc/html/' + row.name + '.html"><p class="label bioc">bioc</p></a>' + src;
                    } else {
                        src = '<p class="label nocran">cran</p>' + src;
                    }
                    if (row.onboarding){
                      src = src + '<a target=\"_blank\" href="' + row.onboarding + '"><i class="fas fa-comments fa-onboarding yes" title = "rOpenSci software review"></i></a>'
                    } else {
                      src = src + '<i class="fas fa-comments fa-onboarding no"></i>'
                    }
                    return src;
                },
                title: "Status"
            },
            {
                "data": function(row, type, set, meta){return row.keywords || ""},
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
            if(data.status == "active" || data.status == "good")
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

    var citedata = {};
    $.get('https://ropenscilabs.github.io/ropensci_citations/citations_all.tsv').done(function(x){
        x.split("\n").forEach(function(line){
            var pkgdata = line.split('\t');
            var pkgname = pkgdata[0];
            if( ! citedata[pkgname] )
                citedata[pkgname] = [];
            citedata[pkgname].push({
                doi: pkgdata[1],
                citation: pkgdata[2]
            });
        });
        //console.log(citedata)
    });


    function makeDetailsRow(data){
        //console.log(data)
        var text = '<h5>Description</h5><p><i>' + (data.details || "No detail for this package available.") + "</i><p>";
        if(Object.keys(citedata).length == 0){
            text = text + "Citation data unavailable";
            return text;
        }
        var citations = citedata[data.name];
        if(citations){
            var list = citations.map(function(cite){
                var doilink = "";
                if(cite.doi && cite.doi != "NA"){
                    doilink = '<a href="https://doi.org/' + cite.doi + '">DOI:' + cite.doi + "</a>";
                }
                return '<li>' + cite.citation + doilink + '</li>';
            }).join('\n');
            text = text + "<br /><h5>Scientific use cases</h5> <ol>" + list + "</ol>";
        }
        return '<div class="packagedetails">' + text + '</div>';
    }

    // Add event listener for opening and closing details
    $('#packagestable tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = oTable.row( tr );
        if ( row.child.isShown() ) {
            $(this).empty().append('<i class="label fa fa-caret-right"></i>')
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            $(this).empty().append('<i class="label fa fa-caret-down"></i>')
            // Open this row
            row.child( makeDetailsRow(row.data())).show();
            tr.addClass('shown');
        }
    });
});
