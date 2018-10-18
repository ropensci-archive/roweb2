var oTable;
$(document).ready(function() {
    var radio = $('input[type=radio]')
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
                title: "status",
                name: "select"
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
                title: "CRAN/Bioc",
                name: "select"
            },
            {
                data: 'onboarding',
                render: {
                    display: 'badge',
                    sort: 'review',
                    filter: 'review',
                    type: 'review'
                },
                title: "onboarding",
                name: "select"
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
    });
    
    yadcf.init(oTable, [{
        column_number: 1,
        column_data_type: "rendered_html",
        filter_type: "select",
        style_class: "footer",
        filter_default_label: "",
        filter_reset_button_text: false
    },
    {
        column_number: 4,
        column_data_type: "rendered_html",
        filter_type: "select",
        style_class: "footer",
        filter_default_label: "",
        filter_reset_button_text: false
    },
    {
        column_number: 5,
        column_data_type: "rendered_html",
        filter_type: "select",
        style_class: "footer",
        filter_default_label: "",
        filter_reset_button_text: false
    }
], 'header');
   
   yadcf.exFilterColumn(oTable, [
     [1, "active"]
   ]);  
  
   
   $(radio).change(function() {
        oTable.search("").draw();
    });

    /* Custom filtering function */
    $.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
            var selected = $('input:checked')
            var filter = selected.attr('class')
            return !filter || filter == 'all' || $(oSettings.aoData[iDataIndex].nTr).hasClass(filter);
        }
    );
    
});