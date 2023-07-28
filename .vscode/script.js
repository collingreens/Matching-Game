const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
    let clickedCard = e.target; //getting user clicked card
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");
        if(!cardOne) {
            //return the cardOne value to clickedCard
            return cardOne = clickedCard;
        }
         cardTwo = clickedCard;
        disableDeck = true;
         let cardOneImg = cardOne.querySelector("img").src,
         cardTwoImg = cardTwo.querySelector("img").src;
         matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
   if(img1 === img2) { // if two cards matched
        matchedCard++; //increment matched value by 1
        if(matchedCard == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000); //call for suffleCard function after 1 sec
                
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //setting both card value to blank
        return disableDeck = false;
   }

   setTimeout(() => {
    // add shake class to both cards after 400 ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
   }, 400);

   setTimeout(() => {
    // remove shake and flip after 1.2 secs
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; // setting both card value to blank
        disableDeck = false;
   }, 1200);
}


function shuffleCard() {
    matchedCard = 0;
    cardOne= cardTwo = "";
    disableDeck = false;
    // creating array for array of the 16 cards
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //sorting arry item randomly

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `/Memory Card Game Images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => { //adding click event to cards
    card.addEventListener("click", flipCard);
});
