console.log("lets write js code now ");

// async function getSongs() {
//   let a = await fetch("http://127.0.0.1:5500/songs/");
//   let response = await a.text();
//   let div = document.createElement("div");
//   div.innerHTML = response;
//   let as = div.getElementsByTagName("a");

//   let songs = [];
//   for (let index = 0; index < as.length; index++) {
//     const element = as[index];
//     if (element.href.endsWith(".mp3")) {
//       songs.push(element.href.split("/songs/")[1]);
//     }
//   }
//   return songs;
// }

// async function main() {
//   //Get the list of all the songs
//   let Songs = await getSongs();
//   console.log(Songs);

//   let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
//   for (const song of Songs) {
//     songUL.innerHTML = songUL.innerHTML + '<li> ${Song} </li>';
//   }

//   //Play the first song
//   var audio = new Audio(Songs[0]);
//   // audio.play();

//   audio.addEventListener("loadeddata", () => {
//     console.log(audio.duration, audio.currentSrc, audio.currentTime)
//   });
// }

// main();

//chat
async function getSongs() {
  try {
    let response = await fetch("http://127.0.0.1:5500/songs/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let text = await response.text();
    let div = document.createElement("div");
    div.innerHTML = text;
    let as = div.getElementsByTagName("a");

    let songs = [];
    for (let index = 0; index < as.length; index++) {
      const element = as[index];
      if (element.href.endsWith(".mp3")) {
        songs.push(element.href.split("/songs/")[1]);
      }
    }
    return songs;
  } catch (error) {
    console.error("Failed to fetch songs:", error);
    return [];
  }
}

async function main() {
  
  let currentSong;

  // Get the list of all the songs
  let Songs = await getSongs();
  console.log(Songs);

  let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
  for (const song of Songs) {
    songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("-", "")}</div>
                                
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                          </li>`;
  }

  // Play the first song if available
  if (Songs.length > 0) {
    var audio = new Audio(`http://127.0.0.1:5500/songs/${Songs[0]}`);
    audio.play();

    audio.addEventListener("loadeddata", () => {
      console.log(audio.duration, audio.currentSrc, audio.currentTime);
    });
  } else {
    console.log("No songs found.");
  }

  //Attach an event listener to each song
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playMusic(e.querySelector(".info").firstElementChild.innerHTML)
    })
  })
}

main()

