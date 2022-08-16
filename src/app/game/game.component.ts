import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import playingCards from '../../assets/playingCards.json';
import { DialogComponent } from '../dialog/dialog.component';

interface card{
  suit: any,
  card:any,
  value:any,
  img:any
}

export interface DialogData {
  message: any;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  encapsulation: ViewEncapsulation.None 
})

export class GameComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  player:any = {
    name:'Player',
    totalHandValue:0,
    cardSet:[]
  };
  dealer:any = {
    name:'Dealer',
    totalHandValue:0,
    cardSet:[]
  };
  bet:any;
  dealerUpcard:any;
  _openDealerUpcard:boolean = false;
  _betValue:boolean = false;
  totalHandValue=0;
  maxHandValue=21;
  minDealerHandValue=17;
  startGame: boolean = false;
  cards:card[] = playingCards;
  _openCards:boolean = false;
  _pickCard:boolean = false;
  _dealerPickCard:boolean = false;
  moreThanMaxHandValue="";

  start() {
    this.startGame = true;
    this.player.totalHandValue = 0;
    this.dealer.totalHandValue = 0;
    this.player.cardSet = [];
    this.dealer.cardSet = [];
  }

  reset() {
    this.bet="";
    this.startGame = false;
    this._openCards=false;
    this._pickCard=false;
    this._dealerPickCard=false;
    this._openDealerUpcard=false;
    this._betValue=false;
    this.player.totalHandValue = 0;
    this.dealer.totalHandValue = 0;
    this.player.cardSet = [];
    this.dealer.cardSet = [];
  }

  betValue(val:any) {
    this.bet = val==="" ? 0 : val;
    this._betValue=true;
  }

  openCards() {

    this.bet = isNaN(this.bet) ? 0 : this.bet;
    this._openCards = true;
    this._betValue=true;

    // Dealer card 1
    let card = this.cards[this.randomCardIndex()];
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.dealer) : card.value;
    this.dealer.cardSet.push(card);

    // Dealer card 2
    card = this.cards[this.randomCardIndex()];
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.dealer) : card.value;
    this.dealer.cardSet.push(card);

    // Dealer set total hand value
    this.dealer.totalHandValue = this.dealer.cardSet?.reduce((acc:any, item:any) =>  { 
      return acc.value + item.value
    });
    this.dealerUpcard = this.dealer.cardSet[1];

    // Player card 1
    card = this.cards[this.randomCardIndex()];
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.player) : card.value;
    this.player.cardSet.push(card);

    // Player card 2
    card = this.cards[this.randomCardIndex()];
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.player) : card.value;
    this.player.cardSet.push(card);

    this.player.totalHandValue = this.player.cardSet?.reduce((acc:any, item:any) =>  { 
      return acc.value + item.value
    });
  }

  randomCardIndex() {
    let min = Math.ceil(0);
    let max = Math.floor(52);
    return Math.floor(Math.random() * (max - min) + min);
  }

  checkValueOfAce(card:any, user:any) {
    if(user?.cardSet.length == 0) { return 11;}
    // return ((user?.cardSet?.reduce((acc:any, item:any) =>  { return acc.value + item.value} ) + card.value) > 21) ? 1 : 11;
    let val = user?.cardSet?.reduce((acc:any, item:any) =>  { 
      if(!acc){
        acc= {value:0};
      }if(!isNaN(acc)){
        acc= {value:acc};
      } 
      return acc.value + item.value;
    }, 0);
    return ((val+card.value) >= 21 ? 1 : 11);
  }

  hit(){
    // pick a card
    this._pickCard=true;
    let card = this.cards[this.randomCardIndex()];

    //check if ace exists in current cards -> set it to 1
    if(card.card==='A' && this.player.cardSet?.find((c:any)=> c.card==='A')) {

      this.player.cardSet = this.player.cardSet?.map((c:any)=> c.card==='A' ? {...c, value:1} : c);
    }
    
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.player) : card.value;

      let value = this.player.cardSet?.reduce((acc:any, item:any) =>  {
        if(!acc){
          acc= {value:0};
        }if(!isNaN(acc)){
          acc= {value:acc};
        } 
        return  acc.value + item.value;
      },0);
  
      if(value + card.value <= this.maxHandValue) {
        this.player.cardSet.push(card);
        this.player.totalHandValue = value + card.value;
      } else {
        this.player.cardSet.push(card);
        this.player.totalHandValue = value + card.value;
        this.openDialog({msg:"Hand value more than 21. Player has lost the game!", betVal: 0});
      }
  }

  stand(){
    // do not pick a card, open dealer up card
    this._openDealerUpcard = true;
    while(this.dealer.totalHandValue < 17){
      this.dealerPickUpCard();
    }
    if(this.dealer.totalHandValue > 21) {
      this.openDialog({msg:"Dealer's hand value more than 21. Player has won the game!", betVal: this.bet*2});
    } else if(this.dealer.totalHandValue < this.player.totalHandValue) {
      this.openDialog({msg:"Player's hand value is more than that of the Dealer's. Player has won the game!", betVal: this.bet*2});
    } else if(this.dealer.totalHandValue == this.player.totalHandValue) {
      this.openDialog({msg:"Player's hand value is equal to the Dealer's. Its a tie!", betVal: this.bet});
    } else {
      this.openDialog({msg:"Player's hand value is less than that of the Dealer's. Player has lost the game!", betVal: 0});
    }
  }

  dealerPickUpCard() {
    let card = this.cards[this.randomCardIndex()];

    //check if ace exists in current cards -> set it to 1
    if(card.card==='A' && this.dealer.cardSet?.find((c:any)=> c.card==='A')) {

      this.dealer.cardSet = this.dealer.cardSet?.map((c:any)=> c.card==='A' ? {...c, value:1} : c);
    }
    
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.dealer) : card.value;

      let value = this.dealer.cardSet?.reduce((acc:any, item:any) =>  {
        if(!acc){
          acc= {value:0};
        }if(!isNaN(acc)){
          acc= {value:acc};
        } 
        return  acc.value + item.value;
      },0);

      this.dealer.cardSet.push(card);
      this.dealer.totalHandValue = value + card.value;
  }

  double(){
    // double bet value, pick a card
    this.bet = this.bet * 2;
    this.hit();
  }

  split(){
    // only if 2 cards have same value, double bet value, add another set to player.cardSets
  }

  ngOnInit(): void {

  }

  openDialog(message:any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: message},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reset();
      console.log('The dialog was closed', result);
    });
  }

}
