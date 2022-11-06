console.log(
  "pretty good innit \n\nstolen from jack\n\nwen eta"
);

const parseResponse = (res) => {
  const track = res.recenttracks.track[0];
  const artist = track.artist["#text"];
  const image = track.image[3]["#text"];
  const name = track.name;

  const np = track["@attr"] ? track["@attr"]["nowplaying"] === "true" : false;

  return {
    artist,
    name,
    image,
    np,
  };
};

const setResponse = (res) => {
  if (res.np) {
    console.log(`[last.fm] Received song data: ${res.name} - ${res.artist}`);
    document.querySelector(
      "#spotify"
    ).innerHTML = `<div class="spotify-rainbow-animation px-6 md:px-4 py-4" style="display:block">
      <div class="max-w-6xl mx-auto container text-blue-300">
        <div class="flex">
          <div class="flex-initial">
            <i class="fad fa-play-circle mr-2"></i>
          </div>
          <div class="flex-1">
            Dakota is currently listening to <b>${res.name}</b> by <b>${res.artist}</b> on <u>Spotify</u>
          </div>
        </div>
      </div>
    </div>`;
  } else {
    console.log(`[last.fm] No song data received, waiting...`);
    document.querySelector("#spotify").innerHTML = ``;
  }
};

const getSong = () => {
  fetch(
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=r31gnonyou&api_key=03437af1b2faa2862ff63e4e43452997&format=json&limit=1"
  )
    .then((res) => res.json())
    .then(parseResponse)
    .then(setResponse);
};

setInterval(getSong, 15 * 1000);
getSong();

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}