$(document).ready(function() {
    var dt = $('table').DataTable({searching: false, paging: false, info: false, "columns": [
        {
            "className":      'details-control',
            "orderable":      false
        },
        null,
        null
    ]});
    
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
    });

    function makeDetailsRow(data){
        //console.log(data)
        var pkgname = $(data[0]).text();
        var text = '<h5>Package Homepage: <a href="https://docs.ropensci.org/' + pkgname + '">https://docs.ropensci.org/' + pkgname + '</a></h5>';
        if(Object.keys(citedata).length === 0){
            text = text + "Citation data unavailable";
            return text;
        }
        var citations = citedata[pkgname];
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
    $('table tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = dt.row( tr );
        if ( row.child.isShown() ) {
            //$(this).empty().append('<i class="label fa fa-caret-right"></i>');
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('details');
        }
        else {
            //$(this).empty().append('<i class="label fa fa-caret-down"></i>');
            // Open this row
            row.child( makeDetailsRow(row.data())).show();
            tr.addClass('details');
        }
    });
    
    // Do not collapse when clicking package name
    $('td.details-control a').on('click', function(e){
        e.preventDefault();
    });
});
