/*Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro javascript in cui:
- Creiamo il nostro array di oggetti che rappresentano ciascun post.Ogni post dovrà avere le informazioni necessarie per stampare la relativa card: nome autore, foto profilo, data in formato americano, testo del post, immagine(non tutti i post devono avere una immagine), numero di likes.
*/

// creo un array di oggetti che contengono tutte le informazioni per generare un post
const arrayPosts = [
    {
        author: "Phil Mangione",
        profilepic: 15,
        time: "08-30-2021",
        text: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        image: 171,
        likecounter: 80
    },
    {
        author: "Felipe Pippone",
        profilepic: 10,
        time: "08-29-2021",
        text: "Mi domando quando mai una donna sarà disposta ad amare veramente in questa società piena di incoerenze, abbiamo perso quei valori che ci rendono speciali e umani. In un mondo impestato dalla tecnologia con cui sto scrivendo questo post IPOCRITA dove sarà finita tutta la bontà dei quarantenni pipponi che scrivono post filosofici senza senso su FB?????",
        image: 11,
        likecounter: 4600
    },
    {
        author: "Max Power",
        time: "08-28-2021",
        text: "ATTENZIONE AL 5G, PROVOCA TUMORI E I IL VACCINO HA DEI MICROCIP PER CONTROLLARE LE PERSONE.",
        image: 121,
        likecounter: 0
    }
]
// funzione che stampa i post prelevando i dati da arrayPosts
function printObjectsOnHTML(objectArray, positionOnDOM) {
    for (let i = 0; i < objectArray.length; i++) {
        let profileImg = `<img class="profile-pic" src="https://unsplash.it/300/300?image=${objectArray[i].profilepic}" alt="${objectArray[i].author}">`
        if (typeof (objectArray[i].profilepic) == "undefined") {
            let lastNameLetter = "";
            for (let j = 0; j < objectArray[i].author.length; j++) {
                if (objectArray[i].author[j] == " ") {
                    lastNameLetter = objectArray[i].author[j + 1]
                }
            }

            profileImg = `<div class="profile-pic-default"><span>${objectArray[i].author[0]} ${lastNameLetter}</span></div>`;
        }
        let italianDate = "";
        for (let j = 0; j < objectArray[i].time.length; j++) {
            if (j == 2 || j == 5) {
                italianDate += "/"
            } else if (j == 0 || j == 1) {
                italianDate += objectArray[i].time[j + 3];
            } else if (j == 3 || j == 4) {
                italianDate += objectArray[i].time[j - 3];
            } else {
                italianDate += objectArray[i].time[j];
            }
        }

        positionOnDOM.innerHTML += `
        <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                   ${profileImg}                     
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${objectArray[i].author}</div>
                    <div class="post-meta__time">${italianDate}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${objectArray[i].text}</div>
        <div class="post__image">
            <img src="https://unsplash.it/600/300?image=${objectArray[i].image}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="1">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${i + 1}" class="js-likes-counter">${objectArray[i].likecounter}</b> persone
                </div>
            </div> 
        </div>            
    </div>`

    }
}
// prelevo la posizione dal DOM
const container = document.getElementById("container");
// lancio la funzione con l'array dei post da inserire nel container preso in precedenza
printObjectsOnHTML(arrayPosts, container);
// aggiungo l'add event listener ai button like stampati in precedenza
for (let i = 0; i < arrayPosts.length; i++) {
    const aLikeButton = document.querySelectorAll(".js-like-button")[i];
    const aLikeCounter = document.querySelectorAll(".js-likes-counter")[i];
    aLikeButton.addEventListener("click",
        function (event) {
            // sto prevent default mi evita la storia che ad ogni click del like mi torna ad inizio pagina
            event.preventDefault();
            if (!(aLikeButton.classList.contains("like-button--liked"))) {
                arrayPosts[i].likecounter += 1;
                aLikeButton.classList.add("like-button--liked");
            } else {
                arrayPosts[i].likecounter -= 1;
                aLikeButton.classList.remove("like-button--liked");
            }
            aLikeCounter.innerHTML = arrayPosts[i].likecounter;
        }
    )
}