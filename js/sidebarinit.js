$(document).ready(function(){
    var sticky = new Waypoint.Sticky({
        element: $('.sidebar')[0],
        wrapper: false
    })
    createMenu()
    initClosingPanel()
})
function createMenu() {
    /*
    ul
     ' li.h3 Pu
       li.h4 pusauria
       li.h4 puniverse
       li.h3 gato
       li.h4 tonto
       li.h4 lobo'
    */
    var $ul = $('<ul />')

    $('h3').each(function() {
        var $this = $(this)
        var $li = createMenuItem($this)

        $ul.append($li)
        var $section = $this.closest('section')
        var $h4 = $section.find('h4')

        if ($h4.length > 0){
            var $innerUl = $('<ul />')
            $h4.each(function(){
                var $this = $(this)
                $li = createMenuItem($this)
                $innerUl.append($li)
            })
            $ul.append($innerUl)
        }

    })

    var $autoSidebar = $('.autoSidebar')
    $autoSidebar.html($ul.html())

    function createMenuItem($el) {
        var $li = document.createElement('li')
        var $a = document.createElement('a')
        $li.className = $el.prop('tagName').toLowerCase()
        $li.innerText = $el.text()
        $a.setAttribute('href', '#'+$el.text().replace(/ /g,'-').toLowerCase() )
        $a.append($li)
        return $a
    }
}

function initClosingPanel() {
    var closingPanel = $('.sidebar > ul li')
    var subitem = $('.subitem').hide()

    closingPanel.on('click', function(){
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
}