/* Lizzzz... Can you make this get included pleeease? I'm temporarily putting this in
 * community.js for prototyping purposes but it's ugly and I'm ashamed of myself.
 * Also, any js I write is probably horrible so please refactor if it offends your sight.
**/

$(function() {

  // Show/hide pattern for the logo options tables
  $('.showhide').click(function(e) {
    e.preventDefault();
    $(this).find('span').toggleClass('glyphicon-plus-sign glyphicon-minus-sign');
    $(this).parent().next('.showhide-container').slideToggle();
  });

  // Smooth scroll
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });

});