import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import playingCards from '../../assets/playingCards.json';

interface card{
  suit: any,
  card:any,
  value:any,
  img:any
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class GameComponent implements OnInit {

  constructor() { }

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
  bet=0;
  dealerUpcard:any;
  totalHandValue=0;
  maxHandValue=21;
  minDealerHandValue=17;
  startGame: boolean = false;
  cards:card[] = playingCards;
  _openCards:boolean = false;
  _pickCard:boolean = false;
  moreThanMaxHandValue="";

  start() {
    this.startGame = true;
    this.player.totalHandValue = 0;
    this.dealer.totalHandValue = 0;
    this.player.cardSet = [];
    this.dealer.cardSet = [];
  }

  reset() {
    this.startGame = false;
    this._openCards=false;
    this._pickCard=false;
    this.player.totalHandValue = 0;
    this.dealer.totalHandValue = 0;
    this.player.cardSet = [];
    this.dealer.cardSet = [];
  }

  openCards() {

    this._openCards = true;

    let card = this.cards[this.randomCardIndex()];
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.dealer) : card.value;
    this.dealer.cardSet.push(card);

    card = this.cards[this.randomCardIndex()];
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.dealer) : card.value;
    this.dealer.cardSet.push(card);

    this.dealer.totalHandValue = this.dealer.cardSet?.reduce((acc:any, item:any) =>  { 
      return acc.value + item.value
    });
    this.dealerUpcard = this.dealer.cardSet[1];


    card = this.cards[this.randomCardIndex()];
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.player) : card.value;
    this.player.cardSet.push(card);

    card = this.cards[this.randomCardIndex()];
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.player) : card.value;
    this.player.cardSet.push(card);
    this.player.totalHandValue = this.player.cardSet?.reduce((acc:any, item:any) =>  { 
      return acc.value + item.value
    });

    console.log('dealer',this.dealer);
    console.log('player',this.player);
  }

  randomCardIndex() {
    let min = Math.ceil(0);
    let max = Math.floor(52);
    return Math.floor(Math.random() * (max - min) + min);
  }

  checkValueOfAce(card:any, user:any) {
    if(user?.cardSet.length == 0) { return 11;}
    return (user?.cardSet?.reduce((acc:any, item:any) =>  { return acc.value + item.value}) + card.value > 21) ? 1 : 11;
  }

  hit(){
    // pick a card
    this._pickCard=true;
    let card = this.cards[this.randomCardIndex()];
    card.value = card.card==="A" ? this.checkValueOfAce(card, this.player) : card.value;

    let value = this.player.cardSet?.map(function(obj) { return obj.value; })
    .reduce((acc:any, item:any) =>  {
      if(!acc){
        acc= {value:0};
      } 
      return acc?.value + item?.value
    },0);

    if(value + card.value < this.maxHandValue) {
      this.player.cardSet.push(card);
      this.player.totalHandValue = value + card.value;
    }

    console.log('player, val',this.player, value);
  }
  stand(){
    // do not pick a card
  }
  double(){
    // double bet value, pick a card
  }
  split(){
    // only if 2 cards have same value, double bet value, add another set to player.cardSets
  }

  ngOnInit(): void {

  }

}
