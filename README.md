# BlackjackApp

This is a sample game application of <b>Black Jack</b>, also called as <b>21.</b>

## [Rules of the game:](https://youtu.be/JYvcOEtEC0E)
Note: Have implemented subset of the rules from the above mentioned ones.

* There are 2 players in the game - Dealer and Player.
* Value of cards:
    * Numbered Cards from 2-10 : Having their face value.
    * Faced Cards (King, Queen, Jack) : Having value as 10.
    * Ace Cards : Value is either 1 or 11. If total hand value exceeds 21, then value of ace is adjusted accordingly.
* Player needs to make a bet before playing the game, by default bet value will be 0.
* Dealer draws 2 cards for the player (face up), and 2 for self (1 face up, another face down).
* The player has 3 choices - Hit, Stand or Double.
    * Hit: Player can pick a card from the deck.
    * Stand: Player can choose not to pick a card, and its dealer's turn to reveal his cards.
    * Double: Player can double their bet value and then pick a card.
* If the Player exceeds the total value of cards than 21, the player looses.
* If the Player chooses to Stand before exceeding 21, the dealer has to reveal the face down card and keep picking up cards till the total value of cards is atleast 17.
* Once the Dealer has shown the cards:
    * If Dealer's Total Card Value > Player's Total Card Value => Player Looses or Bust
    * If Dealer's Total Card Value < Player's Total Card Value => Player Wins or Dealer Bust
    * If Dealer's Total Card Value = Player's Total Card Value => Tie




