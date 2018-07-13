var onResize = function() {
  // apply dynamic padding at the top of the body according to the fixed navbar height
  $(".main-container").css("margin-top", $(".navbar.fixed-top").outerHeight());
};

// attach the function to the window resize event
//$(window).resize(onResize);

// call it also when the page is ready after load or reload
$(document).ready(function() {
  //onResize();
});
