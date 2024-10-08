// configs
const sliiideConfig = {
  toggle: "#menu-toggle",
  exit_selector: "#menu-exit",
  animation_duration: "0.5s",
  place: "right",
  animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)",
  body_slide: false,
  no_scroll: true,
};
let projects;
let clients;
const techArr = [
  {
    id: "typescript",
    file: "typescript.svg",
    color: "#007acc",
    name: "TypeScript",
  },
  { id: "node", file: "node.svg", color: "#8cc84b", name: "Node" },
  { id: "graphql", file: "graphql.svg", color: "#E534AB", name: "GraphQL" },
  { id: "react", file: "react.svg", color: "#53c1de", name: "React" },
  { id: "d3", file: "d3.svg", color: "#f68e45", name: "D3" },
  { id: "jest", file: "jest.svg", color: "#c63d14", name: "Jest" },
  { id: "cypress", file: "cypress.svg", color: "#fbfbfb", name: "Cypress" },
];
let lastTech;

// document ready function
$(document).ready(function () {
  // load project data and draw projects
  d3.json("/data/projects.json", function (data) {
    projects = data.projects;
    drawProjects();
  });
  // load client data and draw clients
  d3.json("/data/clients.json", function (data) {
    clients = data.clients;
    drawClients();
  });
  // initiate sliiide
  $("#menu").sliiide(sliiideConfig);
  // initiate splash typed
  $("#splash-typed-text").typed({
    strings: techArr.map(function (d) {
      return d.name;
    }),
    typeSpeed: 100,
    startDelay: 20,
    backSpeed: 35,
    backDelay: 2000,
    loop: true,
    preStringTyped: function (curString) {
      changeTech(curString);
    },
  });
  // initiate contact typed
  $("#contact-typed-text").typed({
    strings: ["onnect...", "hat...", "ollaborate...", "ode...", "reate..."],
    typeSpeed: 100,
    startDelay: 20,
    backSpeed: 35,
    backDelay: 2000,
    loop: true,
  });
});

// project functions
function drawProjects() {
  projects.forEach(function (d) {
    $("#project-container").append(
      '<div class="col-md-6 project">' +
        '<img class="img-responsive center-block project-img" src="/images/projects/' +
        d.image +
        '" title="Click for project details" onclick="showProjectModal(' +
        d.key +
        ')">' +
        "</div>"
    );
  });
}

// client functions
function drawClients() {
  clients.forEach(function (d) {
    $("#client-container").append(
      '<img class="client-img" alt="' +
        d.name +
        '" ' +
        'src="/images/clients/' +
        d.image +
        '" title="' +
        d.name +
        '">'
    );
  });
}

function showProjectModal(projKey) {
  // update modal content
  const projData = projects.filter(function (d) {
    return d.key === projKey;
  })[0];
  $("#proj-modal-name").text(projData.name);
  $("#proj-modal-img").attr("src", "images/projects/" + projData.image);
  $("#proj-modal-release").text(projData.release);
  $("#proj-modal-description").text(projData.description);
  $("#proj-modal-technology").text(projData.technology.join(", "));
  $("#proj-modal-link").attr("href", projData.link);
  // show modal
  $("#project-modal").modal();
}

// technology functions
function changeTech(techIndex) {
  const incomingTech = techArr[techIndex];
  $(lastTech).addClass("slideOutLeft animated");
  setTimeout(function () {
    $(lastTech).remove();
    lastTech = "#" + incomingTech.id;
  }, 500);
  $("#splash-typed-text").css("color", incomingTech.color);
  $("#tech-svg").append(
    '<img src="/images/tech/' +
      incomingTech.file +
      '" id="' +
      incomingTech.id +
      '" class="tech-img slideInRight animated">'
  );
}

// header background scroll
$(function () {
  $(window).scroll(function () {
    const scroll = $(window).scrollTop();
    if (scroll >= 20) {
      $(".fixed-header").addClass("has-background fixed-header-sm");
    } else {
      $(".fixed-header").removeClass("has-background fixed-header-sm");
    }
  });
});

// smooth scroll
$("a[href*=#]:not([href=#])").click(function () {
  if (
    location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
    location.hostname === this.hostname
  ) {
    let target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    if (target.length) {
      $("html,body").animate(
        {
          scrollTop: target.offset().top,
        },
        1200
      );
      return false;
    }
  }
});
