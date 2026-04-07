function selectProfile(name){
  document.getElementById("profileSelect").style.display="none";
  document.getElementById("welcomeScreen").classList.remove("hidden");
  document.getElementById("welcomeText").innerText="Welcome back, "+name+"!";
}

function enterAbout(){
  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("aboutPage").classList.remove("hidden");
}

/* ================= LETTER PAGE ================= */

function goToLetter(){
  document.getElementById("aboutPage").classList.add("hidden");

  const letterPage = document.getElementById("letterPage");
  letterPage.classList.remove("hidden");
  letterPage.classList.add("active"); // INI PENTING

  startTyping();
}

const text = `On your special day, I just want you to know how incredibly proud I am of the person you are...

I pray for your happiness, your health, and for you to be blessed with abundance in everything you do.

I love you so damn much.

xoxo, nares.`;

let i = 0;
let typingStarted = false;

function startTyping(){
  if(typingStarted) return;
  typingStarted = true;

  const typingDiv = document.getElementById("typingText");
  typingDiv.innerHTML = "";
  i = 0;

  function type(){
    if(i < text.length){
      typingDiv.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 25);
    }
  }
  type();
}

/* ================= PLAYLIST PAGE ================= */

function goToPlaylist(){

  // sembunyikan semua page
  document.querySelectorAll(".page").forEach(page=>{
    page.classList.add("hidden");
    page.classList.remove("active");
  });

  // tampilkan playlist
  const playlist = document.getElementById("playlistPage");
  playlist.classList.remove("hidden");
  playlist.classList.add("active");

}


const audio = document.getElementById("audioPlayer");
const songs = document.querySelectorAll(".song-item");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const totalDurationEl = document.getElementById("totalDuration");

let currentSongIndex = 0;

function formatTime(seconds){
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ":" + (secs < 10 ? "0" + secs : secs);
}

function togglePlay(){

  // kalau belum ada lagu sama sekali
  if(!audio.src){
    playSong(0);
    return;
  }

  if(audio.paused){
    audio.play();
  } else {
    audio.pause();
  }

}


// ================= NEXT =================
function nextSong(){

  currentSongIndex++;

  if(currentSongIndex >= songs.length){
    currentSongIndex = 0;
  }

  playSong(currentSongIndex);

}

function prevSong(){

  currentSongIndex--;
  if(currentSongIndex < 0){
    currentSongIndex = songs.length - 1;
  }

  playSong(currentSongIndex);

}


// ================= AUTO UPDATE ICON =================
audio.addEventListener("play", function(){
  playPauseBtn.textContent = "⏸";
});

audio.addEventListener("pause", function(){
  playPauseBtn.textContent = "▶";
});


// ================= AUTO NEXT =================
audio.addEventListener("ended", function(){
  nextSong();
});


// ================= TOTAL DURATION =================
audio.addEventListener("loadedmetadata", function(){
  totalDurationEl.textContent = formatTime(audio.duration);
});


// ================= UPDATE PROGRESS =================
audio.addEventListener("timeupdate", function(){

  if(audio.duration){

    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;

    currentTimeEl.textContent = formatTime(audio.currentTime);

  }

});


// ================= SEEK =================
progressBar.addEventListener("input", function(){

  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;

});


function playSong(index){

  currentSongIndex = index; // WAJIB ADA INI

  const selectedSong = songs[currentSongIndex];

  const songSrc = selectedSong.getAttribute("data-src");
  const songTitle = selectedSong.querySelector("h4").textContent;
  const songArtist = selectedSong.querySelector("p").textContent;
  const songImg = selectedSong.querySelector("img").src;

  if(!songSrc){
    console.log("Tidak ada file audio.");
    return;
  }

  audio.pause();
  audio.currentTime = 0;
  audio.src = songSrc;
  audio.load();
  audio.play();

  document.getElementById("playerTitle").textContent = songTitle;
  document.getElementById("playerArtist").textContent = songArtist;
  document.getElementById("playerImg").src = songImg;

  songs.forEach(song => song.classList.remove("active"));
  selectedSong.classList.add("active");
}

