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
var playerMessage = document.getElementById('message');
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::Global stuff of cards::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var dealerFaceDownCard = document.createElement('div');
dealerFaceDownCard.setAttribute('class', 'cardback');
var dealerFirstCard = document.createElement('div');
dealerFirstCard.setAttribute('class', 'card');
var dealerSecondCard = document.createElement('div');
dealerSecondCard.setAttribute('class', 'card');
var dealerThirdCard = document.createElement('div');
dealerThirdCard.setAttribute('class', 'card');
var dealerFourthCard = document.createElement('div');
dealerFourthCard.setAttribute('class', 'card');
var dealerFifthCard = document.createElement('div');
dealerFifthCard.setAttribute('class', 'card');
var dealerSixthCard = document.createElement('div');
dealerSixthCard.setAttribute('class', 'card');
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
var playerSixthCard = document.createElement('div');
playerSixthCard.setAttribute('class', 'card');
var playerSeventhCard = document.createElement('div');
playerSeventhCard.setAttribute('class', 'card');

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

var deckRunsOut = function() {
	if (cards.length < 20) {
		deck();
	}
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::Make Bet & Deal cards & Insurance::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

betForm.onsubmit = function(event) {	
	event.preventDefault();
	if (amount.value > startingPot[0]) {
		playerMessage.innerHTML = "You don't have that much! Enter in a different value.";
		return false;
	}

	if (amount.value === "") {
		playerMessage.innerHTML = "You must place a minimum bet of 50!";
		return false;
	}

	if (startingPot > 50 && amount.value < 50 ) {
		playerMessage.innerHTML = "You must place a minimum bet of 50!";
		return false;
	}

	playerMessage.innerHTML = "";

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
			playerFirstCard.innerHTML = playerStack[0]['name'] + playerStack[0]['suit'];
			playerCards.appendChild(playerSecondCard);
			playerSecondCard.innerHTML = playerStack[1]['name'] + playerStack[1]['suit'];

			var removeForDealer1 = cards.pop();
			var removeForDealer2 = cards.pop();
			dealerStack = [removeForDealer1, removeForDealer2];
			dealerCardsStart = dealerStack[0]['name'] + dealerStack[0]['suit'];
			dealerCards.appendChild(dealerFirstCard);
			dealerFirstCard.setAttribute('class', 'dealercard');
			dealerFirstCard.innerHTML = dealerCardsStart;

			dealerCards.appendChild(dealerFaceDownCard);

			pot.removeChild(dealButton);
			pot.innerHTML = "Your current bet is $" + amount.value + ". Choose your move.";

			hitButton.setAttribute('class', 'hit');
			hitButton.innerHTML = "Hit";
			pot.appendChild(hitButton);

			standButton.setAttribute('class', 'stand');
			standButton.innerHTML = "Stand";
			pot.appendChild(standButton);

			doubleDown.setAttribute('class', 'double-down');
			doubleDown.innerHTML = "Double Down";
			pot.appendChild(doubleDown);

			if (playerStack[0]['name'] === "A" && playerStack[1]['name'] === "A") {
				playerStack[1]['value'] = 1;
			}

			playerStackValue = playerStack[0]['value'] + playerStack[1]['value'];

			if (dealerStack[0]['name'] === "A" && dealerStack[1]['name'] === "A") {
				dealerStack[1]['value'] = 1;
			}
			dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'];

			if (dealerStack[0]['name'] === "A") {
				insuranceButton.setAttribute('class', 'insurance');
				dealerCards.appendChild(insuranceButton);
				insuranceButton.innerHTML = "Insurance";
					insuranceButton.onclick = function() {
						dealerCards.removeChild(dealerFaceDownCard);
						dealerFirstCard.setAttribute('class', 'card');
						dealerCards.appendChild(dealerSecondCard);
						dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];

						if (dealerStackValue === 21) {
							playerWinsDouble();
						}

						else if (dealerStackValue > 21 || dealerStackValue < 21) {
							dealerWinsDouble();
						}
					}
			}

			if (playerStackValue === 21 && dealerStackValue !== 21) {
				dealerCards.removeChild(dealerFaceDownCard);
				dealerFirstCard.setAttribute('class', 'card');
				dealerCards.appendChild(dealerSecondCard);
				dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];
				playerWins();
				
			}

			if (playerStackValue === 21 && dealerStackValue === 21) {
				dealerCards.removeChild(dealerFaceDownCard);
				dealerFirstCard.setAttribute('class', 'card');
				dealerCards.appendChild(dealerSecondCard);
				dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];
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
		playerThirdCard.innerHTML = playerStack[2]['name'] + playerStack[2]['suit'];
		playerStackValue = playerStack[0]['value'] + playerStack[1]['value'] + playerStack[2]['value'];

		checkForAce();

		if (playerStackValue > 21) {
			dealerWinsDouble();
		}

		else if ((playerStackValue === 21 && dealerStackValue !== 21) && dealerStackValue >= 17) {
			dealerCards.removeChild(dealerFaceDownCard);
			dealerFirstCard.setAttribute('class', 'card');
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];
			playerWinsDouble();
		}

		else if (playerStackValue === 21 && dealerStackValue === 21) {
			dealerCards.removeChild(dealerFaceDownCard);
			dealerFirstCard.setAttribute('class', 'card');
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];
			drawOutcome();
		}

		else if (dealerStackValue < 17) {
			var removeForDealer3 = cards.pop();
			dealerStack.push(removeForDealer3);
			dealerCards.removeChild(dealerFaceDownCard);
			dealerFirstCard.setAttribute('class', 'card');
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];
			dealerCards.appendChild(dealerThirdCard);
			dealerThirdCard.innerHTML = dealerStack[dealerStack.length - 1]['name'] + dealerStack[dealerStack.length - 1]['suit']
			
			dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'] + dealerStack[2]['value'];

			if (dealerStackValue < 17) {
				var removeForDealer3 = cards.pop();
				dealerStack.push(removeForDealer3);
				dealerCards.appendChild(dealerFourthCard);
				dealerFourthCard.innerHTML = dealerStack[dealerStack.length - 1]['name'] + dealerStack[dealerStack.length - 1]['suit']
				dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'] + dealerStack[2]['value'] + dealerStack[3]['value'];
				if (dealerStackValue < 17) {
					var removeForDealer3 = cards.pop();
					dealerStack.push(removeForDealer3);
					dealerCards.appendChild(dealerFifthCard);
					dealerFifthCard.innerHTML = dealerStack[dealerStack.length - 1]['name'] + dealerStack[dealerStack.length - 1]['suit']
					dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'] + dealerStack[2]['value'] + dealerStack[3]['value'] + dealerStack[4]['value'];

					if (dealerStackValue < 17) {
						var removeForDealer3 = cards.pop();
						dealerStack.push(removeForDealer3);
						dealerCards.appendChild(dealerSixthCard);
						dealerSixthCard.innerHTML = dealerStack[dealerStack.length - 1]['name'] + dealerStack[dealerStack.length - 1]['suit']
						
						dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'] + dealerStack[2]['value'] + dealerStack[3]['value'] + dealerStack[4]['value'] + dealerStack[5]['value'];
					}
				}
			}

			checkForAceDealer();

			if (dealerStackValue > 21) {
				playerWinsDouble();
			}

			if (dealerStackValue >= 17 && dealerStackValue <= 21) {
				checkForWinDoubleDown();
			}
		}

		else if (dealerStackValue >= 17) {
			dealerCards.removeChild(dealerFaceDownCard);
			dealerFirstCard.setAttribute('class', 'card');
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];
			if (dealerStackValue === 21 && playerStackValue !== 21) {
				dealerWinsDouble();
			}

			else {
				checkForWinDoubleDown();
			}
		}

		else {
			checkForWinDoubleDown();
		}

	}

	hitButton.onclick = function() {
		pot.removeChild(doubleDown);
		dealerCards.removeChild(insuranceButton);
		var removeforPlayer3 = cards.pop();
		playerStack.push(removeforPlayer3);

		if (playerStack.length === 3) {
			playerStackValue = playerStack[0]['value'] + playerStack[1]['value'] + playerStack[2]['value'];
			playerCards.appendChild(playerThirdCard);
			playerThirdCard.innerHTML = playerStack[2]['name'] + playerStack[2]['suit'];
		}

		else if (playerStack.length === 4) {
			playerStackValue = playerStack[0]['value'] + playerStack[1]['value'] + playerStack[2]['value'] + playerStack[3]['value'];
			playerCards.appendChild(playerFourthCard);
			playerFourthCard.innerHTML = playerStack[3]['name'] + playerStack[3]['suit'];
		}

		else if (playerStack.length === 5) {
			playerStackValue = playerStack[0]['value'] + playerStack[1]['value'] + playerStack[2]['value'] + playerStack[3]['value'] + playerStack[4]['value'];
			playerCards.appendChild(playerFifthCard);
			playerFifthCard.innerHTML = playerStack[4]['name'] + playerStack[4]['suit'];
		}

		else if (playerStack.length === 6) {
			playerStackValue = playerStack[0]['value'] + playerStack[1]['value'] + playerStack[2]['value'] + playerStack[3]['value'] + playerStack[4]['value'] + playerStack[5]['value'];
			playerCards.appendChild(playerSixthCard);
			playerSixthCard.innerHTML = playerStack[5]['name'] + playerStack[5]['suit'];
		}

		else if (playerStack.length === 7) {
			playerStackValue = playerStack[0]['value'] + playerStack[1]['value'] + playerStack[2]['value'] + playerStack[3]['value'] + playerStack[4]['value'] + playerStack[5]['value'] + playerStack[6]['value'];
			playerCards.appendChild(playerSeventhCard);
			playerSeventhCard.innerHTML = playerStack[6]['name'] + playerStack[6]['suit'];
		}

		checkForAce();

		if (playerStackValue > 21) {
			dealerWins();
		}

		if ((playerStackValue === 21 && dealerStackValue !== 21) && dealerStackValue >= 17) {
			dealerCards.removeChild(dealerFaceDownCard);
			dealerFirstCard.setAttribute('class', 'card');
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];
			playerWins();
		}

		if (playerStackValue === 21 && dealerStackValue === 21) {
				dealerCards.removeChild(dealerFaceDownCard);
				dealerCards.appendChild(dealerSecondCard);
				dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];
				drawOutcome();
		}
	}

	standButton.onclick = function() {
		
		if (dealerStackValue < 17) {

			var removeForDealer3 = cards.pop();
			dealerStack.push(removeForDealer3);
			dealerCards.removeChild(dealerFaceDownCard);
			dealerFirstCard.setAttribute('class', 'card');
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];
			dealerCards.appendChild(dealerThirdCard);
			dealerThirdCard.innerHTML = dealerStack[dealerStack.length - 1]['name'] + dealerStack[dealerStack.length - 1]['suit'];
			
			dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'] + dealerStack[2]['value'];
			checkForAceDealer();

			if (dealerStackValue < 17) {
				var removeForDealer3 = cards.pop();
				dealerStack.push(removeForDealer3);
				dealerCards.appendChild(dealerFourthCard);
				dealerFourthCard.innerHTML = dealerStack[dealerStack.length - 1]['name'] + dealerStack[dealerStack.length - 1]['suit'];
				dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'] + dealerStack[2]['value'] + dealerStack[3]['value'];
				checkForAceDealer();

				if (dealerStackValue < 17) {
					var removeForDealer3 = cards.pop();
					dealerStack.push(removeForDealer3);
					dealerCards.appendChild(dealerFifthCard);
					dealerFifthCard.innerHTML = dealerStack[dealerStack.length - 1]['name'] + dealerStack[dealerStack.length - 1]['suit'];
					
					dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'] + dealerStack[2]['value'] + dealerStack[3]['value'] + dealerStack[4]['value'];
					checkForAceDealer();

					if (dealerStackValue < 17) {
						var removeForDealer3 = cards.pop();
						dealerStack.push(removeForDealer3);
						dealerCards.appendChild(dealerSixthCard);
						dealerSixthCard.innerHTML = dealerStack[dealerStack.length - 1]['name'] + dealerStack[dealerStack.length - 1]['suit'];
						
						dealerStackValue = dealerStack[0]['value'] + dealerStack[1]['value'] + dealerStack[2]['value'] + dealerStack[3]['value'] + dealerStack[4]['value'] + dealerStack[5]['value'];
						checkForAceDealer();
					}

				}
			}


			if (dealerStackValue > 21) {
				playerWins();
			}

			if (dealerStackValue >= 17 && dealerStackValue <= 21) {
				checkForWin();
			}
		}

		else if (dealerStackValue >= 17) {
			dealerCards.removeChild(dealerFaceDownCard);
			dealerFirstCard.setAttribute('class', 'card');
			dealerCards.appendChild(dealerSecondCard);
			dealerSecondCard.innerHTML = dealerStack[1]['name'] + dealerStack[1]['suit'];
			if (dealerStackValue === 21 && playerStackValue !== 21) {
				dealerWins();
			}

			else {
				checkForWin();
			}
		}
		else {
			checkForWin();
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

	else if (dealerStackValue === 21) {
		dealerWins();
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

	else if (dealerStackValue === 21) {
		dealerWinsDouble();
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
	moneyLeft.innerHTML = "Money Left: " + playerOutcome;
	playerMessage.innerHTML = "Player Wins!";
	setTimeout(function(){
		restart();
	},2500);
}

var playerWinsDouble = function() {
	playerOutcome = startingPot[0] + parseInt(2 * amount.value);
	moneyLeft.innerHTML = "Money Left: " + playerOutcome;
	playerMessage.innerHTML = "Player Wins Big!";
	setTimeout(function(){
		restart();
	},2500);
}

var dealerWinsDouble = function() {
	playerOutcome = startingPot[0] - parseInt(2 * amount.value);
	moneyLeft.innerHTML = "Money Left: " + playerOutcome;
	playerMessage.innerHTML = "Player Loses Big Time!";
	setTimeout(function(){
		restart();
	},2500);
}

var dealerWins = function() {
	playerOutcome = startingPot[0] - parseInt(amount.value);
	moneyLeft.innerHTML = "Money Left: " + playerOutcome;
	playerMessage.innerHTML = "Player Loses!";
	setTimeout(function(){
		restart();
	},2500);
}

var drawOutcome = function() {
	playerOutcome = startingPot[0];
	moneyLeft.innerHTML = "Money Left: " + playerOutcome;
	playerMessage.innerHTML = "Draw!";
	setTimeout(function(){
		restart();
	},2500);
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
			playerMessage.innerHTML = "";
			pot.innerHTML = "Enter your bet!";
			startingPot.pop();
			startingPot.push(playerOutcome);
			amount.value = "";
			playerCards.innerHTML = "";
			dealerCards.innerHTML = "";
		},1500);
		deckRunsOut();

	}
	else if (playerOutcome <= 0) {
		playerMessage.innerHTML = "You're out of cash!";
		deckRunsOut();
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

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::Check if Ace floats::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var checkForAce = function() {
	for (i = 0; i < playerStack.length; i++) {
		if (playerStack[i]['name'] === "A" && playerStackValue > 21) {
			playerStackValue = playerStackValue - 10;
		}

	}
}

var checkForAceDealer = function() {
	for (i = 0; i < dealerStack.length; i++) {
		if (dealerStack[i]['name'] === "A" && dealerStackValue > 21) {
			dealerStackValue = dealerStackValue - 10;
		}

	}
}