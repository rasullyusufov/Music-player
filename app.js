
const container = document.getElementById('container')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const title = document.getElementById('title')
const start = document.getElementById('start')
const end = document.getElementById('end')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const range = document.getElementById('range')
const span = document.querySelector('.span')


const songs = [
    'Eysan_Unutamyorumon',
    'Sauqbilu_Ya_Kholiqi',
    'Ending Isak Donielson',
    'Imlay al-Ard bi Takbir',
]
//song idex
let songIndex = 1

loadSong(songs[songIndex])



//functionlar 
function loadSong(song) {
    title.textContent = song
    audio.src = `audio/${song}.mp3`
    cover.src = `img/${song}.jpeg`

}
//play music
function playSongs() {
    container.classList.add('play')
    span.classList.add('play')
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`
    audio.play()
}
//pause music
function pauseSongs() {
    container.classList.remove('play')
    span.classList.remove('play')
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
    audio.pause()
}

//next music
function nextmusic() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    audio.play()
    playSongs() 
}
//prev music
function prevMusic() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    audio.play()
    playSongs() 
}
//progress

function progres(e) {
    const duration = e.srcElement.duration
    const curTime = e.srcElement.currentTime
    const presentageWidth = (curTime / duration) * 100
    progress.style.width = `${presentageWidth}%`
    //end 
    let endminutes = Math.floor(duration / 60)
    let endsecund = Math.floor(duration % 60)
    end.textContent = `-${endminutes}:${(endsecund = endsecund < 10 ? '0' + endsecund : endsecund)}`
    //start 
    let startminutes = Math.floor(curTime / 60)
    let staresecund = Math.floor(curTime % 60)
    start.textContent = `${startminutes = startminutes < 10 ? '0' + startminutes : startminutes}:${(staresecund = staresecund < 10 ? '0' + staresecund : staresecund)}`
}

//keypress
document.addEventListener('keyup', (e)=>{


    if (e.key == " ") {
        openSongs()
    }
    if(e.key == 'ArrowRight'){
        nextmusic()
    }
    if(e.key == 'ArrowLeft'){
        prevMusic()
    }

  
})

function openSongs() {
    const isPlaying = container.classList.contains('play')

    if (isPlaying ) {
        pauseSongs()
    }
    else {  
        playSongs()
    }
}




//setprogress
function setprogress(e) {
    const width = this.clientWidth
    const widthX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (widthX / width) * duration
}

function rangeVolume(e) {
    const volumeMusic = +range.value / range.max
    audio.volume = volumeMusic
}



playBtn.addEventListener('click', function () {
    const isPlaying = container.classList.contains('play')

    if (isPlaying) {
        pauseSongs()
    }
    else {
        playSongs()
    }
})
nextBtn.addEventListener('click', nextmusic)
prevBtn.addEventListener('click', prevMusic)
audio.addEventListener('timeupdate', progres)
audio.addEventListener('ended', nextmusic)
progressContainer.addEventListener('click', setprogress)
range.addEventListener('input', rangeVolume)