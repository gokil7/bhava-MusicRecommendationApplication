let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = true;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [{
    name: "Lullaby of Woe",
    artist: "Marcin Przybyłowicz, Mikolai Stroinski",
    back_image: "/static/resources/images/albumart/Fear/4.jpg",
    path: "/static/resources/songs/Fear/4.mp3"
  },
  {
    name: "I Will Fear No More",
    artist: "The Afters",
    back_image: "/static/resources/images/albumart/Fear/44.jpg",
    path: "/static/resources/songs/Fear/44.mp3"
  },
  {
    name: "Yahan Ke Hum Sikander",
    artist: "Jatin-Lalit, Udit Narayan",
    back_image: "/static/resources/images/albumart/Fear/444.jpg",
    path: "/static/resources/songs/Fear/444.mp3"
  },
  {
    name: "You Should See Me in a Crown",
    artist: "Billie Eilish",
    back_image: "/static/resources/images/albumart/Fear/4444.jpg",
    path: "/static/resources/songs/Fear/4444.mp3"
  },
  {
    name: "The Ghost",
    artist: "NIVIRO",
    back_image: "/static/resources/images/albumart/Fear/44444.jpg",
    path: "/static/resources/songs/Fear/44444.mp3"
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  curr_track.autoplay = true;

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  // track_art.style.backgroundSize = 'cover';
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  document.body.style.background = "url(" + track_list[track_index].back_image + ")";
  document.body.style.backgroundSize = 'cover';

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);


function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}


function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
}


function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fas fa-play fa-2x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}


function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}