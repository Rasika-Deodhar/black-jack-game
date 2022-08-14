import { Component, OnInit } from '@angular/core';
import playingCards from '../../assets/playingCards.json';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  player:any = {
    name:'Player',
    totalHandValue:0,
    cardSets:[
      {
        set:Number,
        cardSet:[]
      }
    ]
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

  hit(){
    // pick a card
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
