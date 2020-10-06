import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public pseudo : string ='';
  public difficulty : string = '';
  // public memorisation = [];
  public error : string = "";
  public checkbox : boolean = false;
  public hidden : boolean = true;
  public hiddenBtn : boolean = false;
  

  constructor() {}

  public start(){
    this.error = "";
    
    if (this.pseudo.length < 3) {
      this.error = "Veuillez rentrer un pseudo d'au moins 3 caractères.";
      return;
    }
    if (this.difficulty === undefined) {
      this.error = "Veuillez rentrer une difficulté.";
      return;
    }

    this.hidden = false;
        

    // if (this.checkbox) {
    //   this.memorisation = [
    //     {
    //       PseudoM : this.pseudo,
    //       difficulty : this.difficulty
    //     }
    //   ];
    // }

  }

  public answer(){
    this.hiddenBtn = !this.hiddenBtn;
  }

}
