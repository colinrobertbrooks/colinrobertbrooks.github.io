//globals
var sliiideConfig = {
  toggle: "#menu-toggle", // the selector for the menu toggle, whatever clickable element you want to activate or deactivate the menu. A click listener will be added to this element.
  exit_selector: "#menu-exit", // the selector for an exit button in the div if needed, when the exit element is clicked the menu will deactivate, suitable for an exit element inside the nav menu or the side bar
  animation_duration: "0.5s", //how long it takes to slide the menu
  place: "right", //where is the menu sliding from, possible options are (left | right | top | bottom)
  animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)", //animation curve for the sliding animation
  body_slide: false, //set it to true if you want to use the effect where the entire page slides and not just the div
  no_scroll: true //set to true if you want the scrolling disabled while the menu is active
};
var techSVGs = [
  {id: "html5", file: 'html-5.svg', color: '#e44d26'},
  {id: "css3", file: 'css-3.svg', color: '#264de4'},
  {id: "javascript", file: 'javascript.svg', color: '#f7df1e'},
  {id: "bootstrap", file: 'bootstrap.svg', color: '#563d7c'},
  {id: "jquery", file: 'jquery.svg', color: '#21609b'},
  {id: "d3", file: 'd3.svg', color: '#f68e45'},
  {id: "rails", file: 'rails.svg', color: '#a62c39'}
];
var lastSVG;
var projects;


//document ready function
$( document ).ready(function(){
  //load project data and draw web projects
  d3.json('/data/projects.json', function(data) {
    projects = data.projects;
    drawProjects('web');
  });
  //initiate sliiide
  $('#menu').sliiide(sliiideConfig);
  //initiate splash typed
  $("#splash-typed-text").typed({
    strings: ['HTML5','CSS3','JavaScript','Bootstrap','jQuery','D3','Rails'],
    typeSpeed: 100,
    startDelay: 20,
    backSpeed: 35,
    backDelay: 2000,
    loop: true,
    preStringTyped: function(curString) {
      changeTechSVG(curString);
    }
  });
  //initiate contact typed
  $("#contact-typed-text").typed({
    strings: ['chat...','collaborate...','code...','create...','climb...'],
    typeSpeed: 100,
    startDelay: 20,
    backSpeed: 35,
    backDelay: 2000,
    loop: true
  });
});


//technology svg functions
function changeTechSVG (svgIndex) {
  var incomingSVG = techSVGs[svgIndex];
  $(lastSVG).addClass('slideOutLeft animated');
    setTimeout(function(){
      $(lastSVG).remove();
      lastSVG = '#' + incomingSVG.id;
  }, 210);
  $('#splash-typed-text').css('color', incomingSVG.color);
  $('#tech-svg').append("<img src=/images/tech-svg/" + incomingSVG.file  + " id='" + incomingSVG.id + "' class='tech-img slideInRight animated'>");
}


//project functions
function drawProjects (projType) {
  //add projects
  $('.project').remove();
  var typeProjects = projects.filter(function(d){ return d.type === projType; });
  typeProjects.forEach(function(d){
     $('#project-container').append(
      '<div class="col-md-6 project">' +
        '<img class="img-responsive project-img" src="/images/projects/' + d.image + '" title="Click for project details" onclick="showProjectModal(' + d.key + ')">' +
      '</div>'
    );
  });
  //update buttons
  $('.work-btn').removeClass('work-btn-selected');
  $('#' + projType + '-btn').addClass('work-btn-selected');
}

function showProjectModal (projKey) {
  //update modal content
  var projData = projects.filter(function(d){ return d.key === projKey; })[0];
  $('#proj-modal-name').text(projData.name);
  $('#proj-modal-img').attr('src', 'images/projects/' + projData.image);
  $('#proj-modal-release').text(projData.release);
  $('#proj-modal-description').text(projData.description);
  $('#proj-modal-technology').text(projData.technology.join(', '));
  $('#proj-modal-link').attr('href', projData.link);
  //show modal
  $('#project-modal').modal();
}


//waypoints
$('.wp1').waypoint(function() {
  $('.wp1-effect-1').addClass('animated fadeInDown');
  $('.wp1-effect-2').addClass('animated fadeIn');
  $('.wp1-effect-3').addClass('animated fadeInUp');
});
$('.wp2').waypoint(function() {
  $('.wp2-effect-1').addClass('animated fadeInUp');
});


//header background scroll
$(function() {
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 20) {
      $(".fixed-header").addClass("has-background fixed-header-sm");
    } else {
      $(".fixed-header").removeClass("has-background fixed-header-sm");
    }
  });
});


//smooth scroll
$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1200);
      return false;
    }
  }
});