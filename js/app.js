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
var playerStackValue;
var dealerStackValue;
var playerCardsStart;
var dealerCardsStart;


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

	playerCardsStart = playerStack[0]['name'] + " " + playerStack[1]['name'];
	playerCards.innerHTML = playerCardsStart;

	var removeForDealer1 = cards.pop();
	var removeForDealer2 = cards.pop();
	dealerStack = [removeForDealer1, removeForDealer2];
	dealerCardsStart = dealerStack[0]['name'];
	dealerCards.innerHTML = dealerCardsStart;
	dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'];

	//remove dealButton and add hit & stand buttons

	container.removeChild(dealButton);

	hitButton.setAttribute('class', 'hit');
	hitButton.innerHTML = "hit";
	pot.appendChild(hitButton);

	standButton.setAttribute('class', 'stand');
	standButton.innerHTML = "stand";
	pot.appendChild(standButton);

	playerStackValue = playerStack[0]['value'] + playerStack[1]['value'];

	//check if playerhand is equal to 21. If it is, stop the game and player wins.

	if (playerStackValue === 21) {
		alert("player wins!!");
	}

	if (dealerStackValue === 21) {
		alert('dealer wins');
	}

	else {
		chooseHitOrStand();
	}
	
}


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::Choose to hit or stand:::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var chooseHitOrStand = function() {
	//need to make a for loop for all clicks on hitbutton. Will do tomorrow during class. refer to tic tac toe for reference.

	hitButton.onclick = function() {
		var removeforPlayer3 = cards.pop();
		playerStack.push(removeforPlayer3);
	
		playerCardsStart = playerCardsStart + " " + playerStack[playerStack.length - 1]['name'];
		playerCards.innerHTML = playerCardsStart;

		playerStackValue = playerStackValue +  playerStack[playerStack.length - 1]['value'];

		if (playerStackValue > 21) {
			alert('player busts!');
		}

		else if (playerStackValue === 21) {
			alert('player wins');
		}

		else {
			chooseHitOrStand();
		}
	}

	standButton.onclick = function() {
		console.log('hi');
		if (playerStackValue > 21) {
			alert('player busts!');
		}

		else if (dealerStackValue < 17) {
			var removeForDealer3 = cards.pop();
			dealerStack.push(removeForDealer3);
			dealerCardsStart = dealerCardsStart + " " + dealerStack[1]['name'] + " " + dealerStack[dealerStack.length - 1]['name'];
			dealerCards.innerHTML = dealerCardsStart;
			dealerStackValue = dealerStackValue + dealerStack[2]['value'];

			if (dealerStackValue > 21) {
				alert('dealer busts');
			}

			else {
				checkForWin();
			}
		}

		else if (dealerStackValue > 17) {
			var removeForDealer3 = cards.pop();
			dealerStack.push(removeForDealer3);
			dealerCardsStart = dealerCardsStart + " " + dealerStack[1]['name'];
			dealerCards.innerHTML = dealerCardsStart;
			if (dealerStackValue === 21) {
				alert('dealer wins');
			}

			else {
				checkForWin();
			}
		}
	}	
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::Check for winner:::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var checkForWin = function() {

	if (playerStackValue === 21) {
			console.log('player wins');
	}
	else if ((21 - playerStackValue) > (21 - dealerStackValue)) {
			alert('dealer wins!')
	}

	else if ((21 - playerStackValue) < (21 - dealerStackValue))  {
			alert('player wins!');
	}

	else {
		alert('draw');
	}
}









