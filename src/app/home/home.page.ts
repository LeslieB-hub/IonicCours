import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public pseudo : string ='';
  public difficulty : string = 'easy';
  // public memorisation = [];
  public error : string = "";
  public checkbox : boolean = false;
  public hidden : boolean = true;
  public hiddenBtn : boolean = false;
  

  constructor(private alertCtrl: AlertController, public toastCtrl: ToastController)  {}

  public async start(){
    this.error = "";
    
    if (this.pseudo.length < 3) {
      // this.error = "Veuillez rentrer un pseudo d'au moins 3 caractères.";
      const alert = await this.alertCtrl.create({
        header : 'Informations manquantes',
        message : "Veuillez rentrer un pseudo d'au moins 3 caractères.",
        buttons : ["OK"]
      });
      alert.present();
      return;
    }
    if (this.difficulty === "") {
      // this.error = "Veuillez rentrer une difficulté.";
      const toast = await this.toastCtrl.create({
        message : "Veuillez rentrer une difficulté.",
        color: "light",
        duration : 3000
      });
      toast.present();
      return;
    }

    this.hidden = false;
        

    if (this.checkbox) {
      this.error = "Sauvegarde";
      // this.memorisation = [
      //   {
      //     PseudoM : this.pseudo,
      //     difficulty : this.difficulty
      //   }
      // ];
    }

  }

  public answer(reponse : string){
    this.hiddenBtn = !this.hiddenBtn;
  }

}
