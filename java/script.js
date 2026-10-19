const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.querySelector(".cover");
const progress = document.getElementById("progress");

let songs = [
  {
    src: "music/song1.mp3",
    title: "DARKSIDE",
    artist: "Neoni",
    cover: "css/cover1.jpg"
  },
  {
    src: "music/song2.mp3",
    title: "Impssibole",
    artist: "James Arthur",
    cover: "css/cover2.jpg"
  },
  {
    src: "music/song3.mp3",
    title: "People you know",
    artist: "Selena Gomez",
    cover: "css/cover3.jpg"
  },
  {
      src: "music/song4.mp3",
      title: "Tatto",
      artist: "Loreen",
      cover: "css/cover4.jpg"
  }
];



let currentSong = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;

  // تشغيل الأغنية لو كان الصوت شغال قبل كده
  if (isPlaying) {
    audio.play().catch(err => console.log("Autoplay blocked:", err));
  }
}

function playSong() {
  audio.play().then(() => {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
  }).catch((err) => {
    console.log("🔒 المتصفح منع التشغيل التلقائي:", err);
  });
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  isPlaying = false;
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

// تحميل أول أغنية
loadSong(currentSong);

// شريط التقدم
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;
  }
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

// مراقبة الصوت (هل بدأ بالفعل؟)
audio.addEventListener("play", () => {
  console.log("🔊 الصوت بدأ يشتغل");
});

audio.addEventListener("pause", () => {
  console.log("⏸️ تم الإيقاف المؤقت");
});

audio.addEventListener("error", (e) => {
  console.log("❌ خطأ في تحميل الملف الصوتي", e);
});
