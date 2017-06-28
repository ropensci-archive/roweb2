$(document).ready(function(){
    var sticky = new Waypoint.Sticky({
        element: $('.subnav')[0],
        wrapper: false
    })

    var closingPanel = $('.subnav > ul li')
    var subitem = $('.subitem').hide()

    closingPanel.click(function(){
        var $this = $(this);
        var $target = $this.find('.subitem')

        if ($target){
            subitem.removeClass('active').slideUp()
            $target.addClass('active').slideDown()
        } else {
            subitem.addClass('active').slideDown()
            $target.removeClass('active').slideUp()
        }
    })

    return false;
})