import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Question } from '../Models/question';
import { OpenTriviaProvider } from '../Provider/OpenTriviaService.provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public pseudo : string ='Test';
  public difficulty : string = 'easy';
  // public memorisation = [];
  public error : string = "";
  public checkbox : boolean = false;
  public beginGame : boolean = false;
  public nextQuestion : boolean=  false;
  public questions = [];
  public questionDisplay : Question;
  public indexQuestion : number = 0;
  public answers = [];
  public points : number = 0;
  public colorBtn : string = "primary"; 
  

  constructor(private alertCtrl: AlertController, public toastCtrl: ToastController,
              private trivialService : OpenTriviaProvider)  {}

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

    this.beginGame = true;
        

    if (this.checkbox) {
      this.error = "Sauvegarde";
      // this.memorisation = [
      //   {
      //     PseudoM : this.pseudo,
      //     difficulty : this.difficulty
      //   }
      // ];
    }

    //appel pr récup tableau de questions
    await this.getTableQuestion();
    
    this.getQuestionDisplay();
    
    
  }



  public getTableQuestion(){
    this.trivialService.getQuestions(2, this.difficulty)
    .then((results)=> {
      this.questions = results;
    })
    .catch(async (err)=> {
      const alert = await this.alertCtrl.create({
        header : 'Erreur appele Service',
        message : "Impossible de récupérer les films.",
        buttons : ["OK"]
      });
    });
  }




  public getQuestionDisplay(){
    console.log(this.questions[this.indexQuestion]);
    if (this.indexQuestion<this.questions.length) {
      //Récupérer la question ds l'ordre
      this.questionDisplay = this.questions[this.indexQuestion];
      //incrémenter l'index des question
      this.indexQuestion++;
      //mettre ttes les réponses dans l'array answer et mélanger
      this.answers = this.questionDisplay.incorrect_answers;
      this.answers.push(this.questionDisplay.correct_answer);
      console.log(this.answers);
      this.answers.sort(function () { return 0.5 - Math.random() });
      console.log(this.answers);
            
    }else{
      this.indexQuestion = 0;
    }
    
   
  }

  public answer(reponse : string){
    this.nextQuestion = true;
    if (reponse == this.questionDisplay.correct_answer) {
      console.log(reponse);
      this.points++;
      this.colorBtn = "danger";
      
    }
        
  }

}
