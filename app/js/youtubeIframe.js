const youtubeScriptTag = document.createElement("script");
youtubeScriptTag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(youtubeScriptTag);

let players = {};
let apiLoaded = false;

function onYouTubeIframeAPIReady() {
  apiLoaded = true;
}

function initializeYouTubePlayers() {
  if (!apiLoaded) {
    setTimeout(initializeYouTubePlayers, 500);
    return;
  }

  document.querySelectorAll(".feedback-gallery__content").forEach((el, index) => {
    const videoId = el.dataset.videoId;
    if (!videoId) return;

    players[index] = new YT.Player(el.children[0].id, {
      videoId,
      playerVars: { autoplay: 0, controls: 1, rel: 0 },
      events: {
        onReady: (event) => {
          el.addEventListener("click", () => toggleVideo(event.target));
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            stopOtherVideos(index);
          }
        },
      },
    });
  });
  observerYT.unobserve(document.querySelector(".feedback-gallery"));
}

function toggleVideo(player) {
  const state = player.getPlayerState();
  state === YT.PlayerState.PLAYING ? player.pauseVideo() : player.playVideo();
}

function stopOtherVideos(currentIndex) {
  Object.keys(players).forEach((index) => {
    if (index != currentIndex) players[index].pauseVideo();
  });
}

const observerYT = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initializeYouTubePlayers();
      }
    });
  },
  { rootMargin: '1500px' }
);

const galleryYT = document.querySelector(".feedback-gallery");
if (galleryYT) observerYT.observe(galleryYT);
