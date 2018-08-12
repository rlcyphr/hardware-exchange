$(document).ready(() => {

    $('ul li a').addClass('hidden');
    
    $('.hamburger-menu').click(() => {
        

        if ($('ul li a').hasClass('hidden') ) {

            $('ul li a').removeClass('hidden');

        } else {

            $('ul li a').addClass('hidden');

        }
        
    });


    $(window).resize(() => {
        
        $('ul li a').css("display","none");

    });
 
});