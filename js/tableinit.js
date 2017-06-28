$(document).ready( function () {
    var radio = $('input[type=radio]')
    var checkbox = $('input[type=checkbox]')

    var oTable = $('#packagestable').DataTable({
        "info": false, // won't display showed entries of total
        "pagingType": "simple_numbers",
        "pageLength": 18,
        "lengthChange": false, // Disables ability to change results number per page
        "columnDefs": [{ 
            "searchable": false, 
            "targets": 2 
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
            var radio = $('input[type=radio]') //defines radio as variable to be able to get class
            var cran = $('input[type=checkbox]')
            var selected = $('input:checked')
            var $class = selected.attr('class')
            console.log($class)

            //if CRAN checkbox is :checked
            if (cran.is(':checked')) {

                //if radio value is all
                if ( $class === 'all'){
                    //add available class to table rows with available CRAN
                    var available = $('a .cran')
                    var parent = available.parent().parent().parent() //…Yeah, I know. 
                    parent.addClass('available')
                    var element = $(oSettings.aoData[iDataIndex].nTr).hasClass('available');
                    return element
                }

                // if radio button is something else than all
                else {

                    var element = $(oSettings.aoData[iDataIndex].nTr).hasClass($class);
                    return element
                }

            // If CRAN checkbox is something else than checked
            } else {

                if ( $class === 'all'){
                    var available = $('a .cran')
                    var parent = available.parent().parent().parent() //…Yeah, I know. 
                    parent.addClass('available')
                    var element = $(oSettings.aoData[iDataIndex].nTr)
                    return element
                }

                else {
                    var element = $(oSettings.aoData[iDataIndex].nTr).hasClass($class)
                    return element
                }

            }

        }

    );

} );


