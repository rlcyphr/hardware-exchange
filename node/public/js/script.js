// script to control navbar on mobile and when resizing the screen

$(document).ready(function() {


    if ($(document).width() < 768) {

        console.log('test');
        $('ul li a').addClass('hidden');

    }

    $('.hamburger-menu').click(function() {
        

        if ($('ul li a').hasClass('hidden') ) {
            // if the links have the hidden class, remove it, and set the navbar to take up 100% width
            $('ul li a').removeClass('hidden');
            $('.main-nav').addClass('nav-active');

        } else {
            // else, clicking the hamburger menu hides the dropdown box and only shows the menu
            $('ul li a').addClass('hidden');
            $('.main-nav').removeClass('nav-active');
        }
        
    });


    $(window).resize(function() {

        $('ul li a').addClass('hidden');

        if ($(document).width() > 768) {
            // if larger than 768 use the larger size layout 
            $('.main-nav').removeClass('nav-active');
            $('ul li a').removeClass('hidden');

        } else {
            // else use the mobile layout
            $('ul li a').addClass('hidden');
            $('.main-nav').removeClass('nav-active');
        }
        
        

    });

    // set background colours and other page-specific adjustments here
    $(() => {
        var page_url = window.location.href; // returns the full URL
        console.log(page_url);


        page = page_url.slice(21); // get everything after the domain name 
        console.log(page);
        console.log(page.length);

        if (page.length == 1) { // add classes based on length of the page title - going to be changed for release, this is just a test

            $('nav').addClass('fullimg-navbar');

        } else {

            $('nav').addClass('black-background');
        }


      });


 
});