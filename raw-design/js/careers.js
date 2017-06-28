$(document).ready(function(){

    var closingPanel = $('.title')
    var description = $('.description').hide()
    var apply = $('.apply').hide()
    var arrow = $('.arrow').hide()
    var details = $('.detailed').hide()
    var expand = $('.expand').hide()

    closingPanel.click(function(){
        $target = $(this).next();

        if ($target.hasClass('active')){
            $target.removeClass('active').slideUp()
            apply.slideUp()
            arrow.slideUp()
            expand.removeClass('active').slideUp()
        } else {
            $target.addClass('active').slideDown()
            apply.slideDown()
            arrow.slideDown()
            expand.addClass('active').slideDown()
        }

    })

    expand.click(function(e){
        e.preventDefault()
        if (expand.prev().hasClass('active')) {
            expand.prev().removeClass('active').slideUp()
            expand.text('Read More')
        } else {
            expand.prev().addClass('active').slideDown()
            expand.text('Read Less')
        }
 
    })

    return false;
})