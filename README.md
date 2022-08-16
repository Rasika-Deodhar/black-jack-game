# BlackjackApp

This is a sample game application of <b>Black Jack</b>, also called as <b>21.</b>

## [Rules of the game:](https://youtu.be/JYvcOEtEC0E)
<i>Note: Have implemented subset of the rules from the one mentioned in the attached video in link.</i>

* There are 2 players in the game - <b><u>Dealer</u></b> and <b><u>Player</u></b>.
* Value of cards:
    * <b><u>Numbered Cards from 2-10</b></u> : Having their face value.
    * <b><u>Faced Cards (King, Queen, Jack)</b></u> : Having value as 10.
    * <b><u>Ace Cards</b></u> : Value is either 1 or 11. If total hand value exceeds 21, then value of ace is adjusted accordingly.
* Player needs to make a bet before playing the game, by default bet value will be 0.
* Dealer draws 2 cards for the player (face up), and 2 for self (1 face up, another face down).
* The player has 3 choices - Hit, Stand or Double. (<u>Split</u>, <u>Surrender</u> and <u>Insurance</u> not covered yet.)
    * <b><u>Hit</b></u>: Player can pick a card from the deck.
    * <b><u>Stand</b></u>: Player can choose not to pick a card, and its dealer's turn to reveal his cards.
    * <b><u>Double</b></u>: Player can double their bet value and then pick a card.
* If the Player exceeds the total value of cards than 21, the player looses.
* If the Player chooses to Stand before exceeding 21, the dealer has to reveal the face down card and keep picking up cards till the total value of cards is atleast 17.
* Once the Dealer has shown the cards:
    * <b><u>If Dealer's Total Card Value > Player's Total Card Value</b></u> => Player Looses or Bust
    * <b><u>If Dealer's Total Card Value < Player's Total Card Value</b></u> => Player Wins or Dealer Bust
    * <b><u>If Dealer's Total Card Value = Player's Total Card Value</b></u> => Tie

<hr>

* Following is a clip of the game. Its super simple, but I have tried my best to build this in around a day's time :-)
<br>
 Planning to add more scenarios in future.

<video src="src/assets/blackjack-video.mp4" controls="controls" style="max-width: 730px;">
</video>




