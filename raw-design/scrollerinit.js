$(document).ready(function(){
    var back = $('.back')
    var next = $('.next')
    var contents = $('.content')
    var x = $(window).scrollLeft();

    next.click(function(delta){
        contents.animate({
            scrollLeft: '+=305'
        }, 400, 'easeOutQuad')
    })

    back.click(function(){
        contents.animate({
            scrollLeft: '-=305'
        }, 400, 'easeOutQuad')
    })
})