$(document).ready(function() {
    
   $('.hamburger-menu').click(function() {
       
      $('.mobile-nav').toggle();
       
   });
    
    
    $(window).resize(function() {
        
       $('.mobile-nav').css("display","none");

    });
 
});