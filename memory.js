const cards = document.querySelectorAll(".memoryCard");
var isFlipped = false;
var firstCard,secondCard;
var lock = false;
var counter = 0;
cards.forEach(card => card.addEventListener("click",flip));

function flip(){
    if(lock) return;
    if(this === firstCard) return;
    this.classList.add("flip");
    if(!isFlipped){
        isFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    check();
}

function check(){
    var isMatch = firstCard.dataset.image === secondCard.dataset.image
    if(isMatch){
        success();
    }else{
        fail();
    }
    //isMatch ? success() : fail();

}
function success(){
    reset();
    firstCard.removeEventListner("click",flip);
    secondCard.removeEventListner("click",flip);
}

function fail(){
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        reset();
    }, 1000);
}

function reset(){
    [isFlipped, lock] = [false,false];
    [firstCard,secondCard] = [null,null];
}
(function shuffle(){
    cards.forEach(card => {
        var position = Math.floor(Math.random() * 16);
        card.style.order = position;
    });
})();

