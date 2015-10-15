//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::Global stuff:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var dealButton = document.getElementById('deal');
var container = document.getElementById('container')
var playerStack;
var dealerStack;
var dealerCards = document.getElementById('dealer-cards');
var playerCards = document.getElementById('player-cards');
var hitButton = document.createElement('button');
var standButton = document.createElement('button');
var pot = document.getElementById('pot');


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::Create my deck & shuffle it::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var cards = [];

function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}



var shuffle = function(cards){
    for(var j, x, i = cards.length; i; j = parseInt(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
    return cards;
};

var deck = function() {
	this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['Hearts','Diamonds','Spades','Clubs'];
	this.values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
	
    
    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            cards.push(new card( this.values[n], this.names[n], this.suits[s]));
        }
    }

    shuffle(cards);
}

deck();

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::Deal cards:::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


//when user clicks deal, we need to pop() from cards array and stick it into a new array for player & dealer
dealButton.onclick = function() {
	var removeForPlayer1 = cards.pop();
	var removeForPlayer2 = cards.pop();
	playerStack = [removeForPlayer1, removeForPlayer2];

	playerCards.innerHTML = playerStack[0]['name'] + " " + playerStack[1]['name'];

	var removeForDealer1 = cards.pop();
	var removeForDealer2 = cards.pop();
	dealerStack = [removeForDealer1, removeForDealer2];
	dealerCards.innerHTML = dealerStack[0]['name'] + " " + dealerStack[1]['name'];

	//remove dealButton and add hit & stand buttons

	container.removeChild(dealButton);

	hitButton.setAttribute('class', 'hit');
	hitButton.innerHTML = "hit";
	pot.appendChild(hitButton);

	standButton.setAttribute('class', 'stand');
	standButton.innerHTML = "stand";
	pot.appendChild(standButton);

	//check if playerhand is equal to 21. If it is, stop the game and player wins.

	if ((playerStack[0]['value'] + playerStack[0]['value']) === 21) {
		alert("player wins!!");
	}

	else {
		chooseHitOrStand();
	}
	
}


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::Choose to hit or stand:::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var chooseHitOrStand = function() {
	hitButton.onclick = function() {
		var removeforPlayer3 = cards.pop();
		playerStack.push(removeforPlayer3);
		playerCards.innerHTML = playerStack[0]['name'] + " " + playerStack[1]['name'] + " " + playerStack[2]['name'];
		
		if ((playerStack[0]['value'] + playerStack[1]['value'] + playerStack[2]['value']) === 21) {
			alert("player wins!!");
		}
		else if ((playerStack[0]['value'] + playerStack[1]['value'] + playerStack[2]['value']) < 21) {
			alert("continue");
		}
		else {
			alert('you lose');
		}
	}
}









