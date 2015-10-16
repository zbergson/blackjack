//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::Global stuff:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var dealButton = document.createElement('button');
var betForm = document.getElementById('wager');
var container = document.getElementById('container')
var playerStack;
var dealerStack;
var dealerCards = document.getElementById('dealer-cards');
var dealerCardsArray = document.querySelectorAll('#dealer-cards');
var playerCards = document.getElementById('player-cards');
var hitButton = document.createElement('button');
var standButton = document.createElement('button');
var pot = document.getElementById('pot');
var playerStackValue;
var dealerStackValue;
var playerCardsStart;
var dealerCardsStart;
var amount = document.getElementById('amount');
var startingPot = [1000];
var playerOutcome;
var moneyLeft = document.getElementById('money');
var quitButton = document.getElementById('quit');
var doubleDown = document.createElement('button');
var insuranceButton = document.createElement('button');
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::Global stuff of cards::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var dealerFirstCard = document.createElement('div');
dealerFirstCard.setAttribute('class', 'card');
var dealerSecondCard = document.createElement('div');
dealerSecondCard.setAttribute('class', 'card');
var dealerThirdCard = document.createElement('div');
dealerThirdCard.setAttribute('class', 'card');
var playerFirstCard = document.createElement('div');
playerFirstCard.setAttribute('class', 'card');
var playerSecondCard = document.createElement('div');
playerSecondCard.setAttribute('class', 'card');
var playerThirdCard = document.createElement('div');
playerThirdCard.setAttribute('class', 'card');
var playerFourthCard = document.createElement('div');
playerFourthCard.setAttribute('class', 'card');
var playerFifthCard = document.createElement('div');
playerFifthCard.setAttribute('class', 'card');

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
	this.suits = ['♥','♦','♠','♣'];
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
//::::::::::::::::::::::::::::::::::::::Make Bet & Deal cards::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


//when user clicks deal, we need to pop() from cards array and stick it into a new array for player & dealer
betForm.onsubmit = function(event) {	
	event.preventDefault();
	if (amount.value > startingPot[0]) {
		alert("You don't have that much! Enter in a different value.")
		return false;
	}

	if (amount.value === "") {
		alert("You must place a minimum bet of 50!");
		return false;
	}

	if (startingPot > 50 && amount.value < 50 ) {
		alert("You must place a minimum bet of 50!");
		return false;
	}

	pot.innerHTML = "Your current bet is $" + amount.value + ". Click deal to begin!";
	betForm.setAttribute('style', 'display: none');
	dealButton.setAttribute('id', 'deal');
	dealButton.innerHTML = "Deal";
	pot.appendChild(dealButton);

		dealButton.onclick = function() {
			
			var removeForPlayer1 = cards.pop();
			var removeForPlayer2 = cards.pop();
			playerStack = [removeForPlayer1, removeForPlayer2];

			playerCards.appendChild(playerFirstCard);
			playerFirstCard.innerHTML = playerStack[0]['name'];
			playerCards.appendChild(playerSecondCard);
			playerSecondCard.innerHTML = playerStack[1]['name'];

			var removeForDealer1 = cards.pop();
			var removeForDealer2 = cards.pop();
			dealerStack = [removeForDealer1, removeForDealer2];
			dealerCardsStart = dealerStack[0]['name'];
			dealerCards.appendChild(dealerFirstCard);
			dealerFirstCard.innerHTML = dealerCardsStart;
			dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'];

			//remove dealButton and add hit & stand buttons
			pot.removeChild(dealButton);
			pot.innerHTML = "Your current bet is $" + amount.value + "."
			

			hitButton.setAttribute('class', 'hit');
			hitButton.innerHTML = "Hit";
			pot.appendChild(hitButton);

			standButton.setAttribute('class', 'stand');
			standButton.innerHTML = "Stand";
			pot.appendChild(standButton);

			doubleDown.setAttribute('class', 'double-down');
			doubleDown.innerHTML = "Double Down";
			pot.appendChild(doubleDown);

			playerStackValue = playerStack[0]['value'] + playerStack[1]['value'];

			if (dealerStack[0]['name'] === "A") {
				insuranceButton.setAttribute('class', 'insurance');
				pot.appendChild(insuranceButton);
				insuranceButton.innerHTML = "Insurance";
					insuranceButton.onclick = function() {
						dealerCards.appendChild(dealerSecondCard);
						dealerSecondCard.innerHTML = dealerStack[1]['name'];

						if (dealerStackValue === 21) {
							playerWinsDouble();
						}

						else if (dealerStackValue > 21 || dealerStackValue < 21) {
							dealerWinsDouble();
						}
					}
			}

			if (playerStackValue === 21 && dealerStackValue !== 21) {
				dealerCards.appendChild(dealerSecondCard);
				dealerSecondCard.innerHTML = dealerStack[1]['name'];
				playerWins();
				
			}

			if (playerStackValue === 21 && dealerStackValue === 21) {
				dealerCards.appendChild(dealerSecondCard);
				dealerSecondCard.innerHTML = dealerStack[1]['name'];
				drawOutcome();	
			}

			if (playerStackValue > 21) {
				dealerWins();
			}

			else {
				chooseHitOrStand();
			}
			
		}
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::Choose to hit, stand or double down:::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var chooseHitOrStand = function() {

	doubleDown.onclick = function() {
		var removeforPlayer3 = cards.pop();
		playerStack.push(removeforPlayer3);
		playerCards.appendChild(playerThirdCard);
		playerThirdCard.innerHTML = playerStack[2]['name'];

		playerStackValue = playerStack[0]['value'] + playerStack[1]['value'] + playerStack[2]['value'];

		if (playerStackValue > 21) {
			dealerWinsDouble();
		}

		else if (playerStackValue === 21 && dealerStackValue !== 21) {

			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'];
			playerWinsDouble();
		}

		else if (playerStackValue === 21 && dealerStackValue === 21) {
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'];
			drawOutcome();
		}

		else if (dealerStackValue < 17) {
		
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'];
			dealerCards.appendChild(dealerThirdCard);
			dealerThirdCard.innerHTML = dealerStack[dealerStack.length - 1]['name'];
			dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'] + dealerStack[2]['value'];

			if (dealerStackValue > 21) {
				playerWinsDouble();
			}

			else {
				checkForWinDoubleDown();
			}
		}

		else if (dealerStackValue >= 17) {
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'];
			if (dealerStackValue === 21 && playerStackValue !== 21) {
				dealerWinsDouble();
			}

			else {
				checkForWinDoubleDown();
			}
		}

	}

	hitButton.onclick = function() {
		var removeforPlayer3 = cards.pop();
		playerStack.push(removeforPlayer3);
	
		// playerCardsStart = playerCardsStart + " " + playerStack[playerStack.length - 1]['name'];
		// playerCards.innerHTML = playerCardsStart;
		if (playerStack.length === 3) {
			playerStackValue = playerStackValue +  playerStack[playerStack.length - 1]['value'];
			playerCards.appendChild(playerThirdCard);
			playerThirdCard.innerHTML = playerStack[2]['name'];

			if (playerStackValue > 21) {
				dealerWins();
			}

			else if (playerStackValue === 21 && dealerStackValue !== 21) {

				dealerCards.appendChild(dealerSecondCard);
				dealerSecondCard.innerHTML = dealerStack[1]['name'];
				playerWins();
			}

			else if (playerStackValue === 21 && dealerStackValue === 21) {
				dealerCards.appendChild(dealerSecondCard);
				dealerSecondCard.innerHTML = dealerStack[1]['name'];
				drawOutcome();
			}

		}

		else if (playerStack.length === 4) {
			playerStackValue = playerStackValue +  playerStack[playerStack.length - 1]['value'];
			playerCards.appendChild(playerFourthCard);
			playerFourthCard.innerHTML = playerStack[3]['name'];

			if (playerStackValue > 21) {
				dealerWins();
			}

			else if (playerStackValue === 21 && dealerStackValue !== 21) {

				dealerCardsStart = dealerStack[0]['name'] + dealerStack[1]['name'];
				dealerCards.innerHTML = dealerCardsStart;
				playerWins();
			}

			else if (playerStackValue === 21 && dealerStackValue === 21) {
				dealerCardsStart = dealerStack[0]['name'] + dealerStack[1]['name'];
				dealerCards.innerHTML = dealerCardsStart;
				drawOutcome();
			}
		}

		else if (playerStack.length === 5) {
			playerStackValue = playerStackValue +  playerStack[playerStack.length - 1]['value'];
			playerCards.appendChild(playerFifthCard);
			playerFifthCard.innerHTML = playerStack[4]['name'];

			if (playerStackValue > 21) {
				dealerWins();
			}

			else if (playerStackValue === 21 && dealerStackValue !== 21) {

				dealerCardsStart = dealerStack[0]['name'] + dealerStack[1]['name'];
				dealerCards.innerHTML = dealerCardsStart;
				playerWins();
			}

			else if (playerStackValue === 21 && dealerStackValue === 21) {
				dealerCardsStart = dealerStack[0]['name'] + dealerStack[1]['name'];
				dealerCards.innerHTML = dealerCardsStart;
				drawOutcome();
			}
		}
	}



	standButton.onclick = function() {
		
		if (dealerStackValue < 17) {
			var removeForDealer3 = cards.pop();
			dealerStack.push(removeForDealer3);
			// dealerCardsStart = dealerCardsStart + " " + dealerStack[1]['name'] + " " + dealerStack[dealerStack.length - 1]['name'];
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'];
			dealerCards.appendChild(dealerThirdCard);
			dealerThirdCard.innerHTML = dealerStack[dealerStack.length - 1]['name'];
			
			dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'] + dealerStack[2]['value'];

			if (dealerStackValue > 21) {
				playerWins();
			}

			else {
				checkForWin();
			}
		}

		else if (dealerStackValue >= 17) {
			// var removeForDealer3 = cards.pop();
			// dealerStack.push(removeForDealer3);
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'];
			if (dealerStackValue === 21 && playerStackValue !== 21) {
				dealerWins();
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
		playerWins();
	}
	else if (((21 - playerStackValue) > (21 - dealerStackValue)) && !(21 - dealerStackValue <= 0)) {
		dealerWins();
	}

	else if ((21 - playerStackValue) < (21 - dealerStackValue))  {
		playerWins();
	}
	
	else if (playerStackValue === dealerStackValue) {
		drawOutcome();
	}
}

var checkForWinDoubleDown = function() {
	if (playerStackValue === 21) {
		playerWinsDouble();
	}
	else if ((21 - playerStackValue) > (21 - dealerStackValue)) {
		dealerWinsDouble();
	}

	else if ((21 - playerStackValue) < (21 - dealerStackValue))  {
		playerWinsDouble();
	}

	else if (playerStackValue === dealerStackValue) {
		drawOutcome();
	}
}

var playerWins = function() {
	playerOutcome = startingPot[0] + parseInt(amount.value);
	moneyLeft.innerHTML = playerOutcome;
	alert('player wins!');
	restart();
}

var playerWinsDouble = function() {
	playerOutcome = startingPot[0] + parseInt(2 * amount.value);
	moneyLeft.innerHTML = playerOutcome;
	alert('player wins!');
	restart();
}

var dealerWinsDouble = function() {
	playerOutcome = startingPot[0] - parseInt(2 * amount.value);
	moneyLeft.innerHTML = playerOutcome;
	alert('dealer wins!');
	restart();
}

var dealerWins = function() {
	playerOutcome = startingPot[0] - parseInt(amount.value);
	moneyLeft.innerHTML = playerOutcome;
	alert('dealer wins!');
	restart();
}

var drawOutcome = function() {
	playerOutcome = startingPot[0];
	moneyLeft.innerHTML = playerOutcome;
	alert('Draw!');
	restart();
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::Restart the Game!::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var restart = function() {

	if (playerOutcome > 0) {
		setTimeout(function(){

			betForm.setAttribute('style', 'display: block');
			pot.removeChild(hitButton);
			pot.removeChild(standButton);
			pot.innerHTML = "Enter your bet!";
			startingPot.pop();
			startingPot.push(playerOutcome);
			amount.value = "";
			playerCards.innerHTML = "";
			dealerCards.innerHTML = "";
			console.log('howwwwdddyyyy');
		},1500);

	}
	else if (playerOutcome <= 0) {
		alert("You're out of cash");
	}

	else {
		betForm.setAttribute('style', 'display: block');
		pot.removeChild(hitButton);
		pot.removeChild(standButton);
		amount.value = "";
		dealerCards.innerHTML = "";
		playerCards.innerHTML = "";

	}
}


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::Start Over Option::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

quitButton.onclick = function() {
	var decide = prompt("Do you want to restart your game?");

	if(decide === "yes" || decide === "Yes") {
		location.reload();
	}

	else if (decide === "no" || decide === "No") {
		alert('Awesome! Best of luck!');
	}
}

// var appendNewCards = function() {
// 		for (i = 0; i < dealerStack.length; i++) {
// 				dealerCards.appendChild(newCard);
// 				newCard.setAttribute('class','card');
// 				var newCardArray = document.querySelectorAll('.card');
// 				newCardArray[1].innerHTML = dealerStack[1]['name'];
// 				newCardArray[2].innerHTML = dealerStack[2]['name'];
// 			}
// }









