import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Question } from '../Models/question';
import { OpenTriviaProvider } from '../Provider/OpenTriviaService.provider';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.page.html',
  styleUrls: ['./jeu.page.scss'],
})
export class JeuPage implements OnInit {

  public pseudo : string;
  public difficulty : string;

  public nextQuestion : boolean=  false;
  public questions = [];
  public questionDisplay : Question;
  public indexQuestion : number = 0;
  //public answers = [];
  public points : number = 0; 
  public endGame : boolean = false;
  public beginGame : boolean = false;

  constructor(private router : Router, private route : ActivatedRoute, private trivialService : OpenTriviaProvider,
              private alertCtrl: AlertController) {
    this.route.params.subscribe((params)=>{
      this.pseudo = params['pseudo'];
      this.difficulty = params['difficulty'];
      console.log("Pseudo : " + this.pseudo+ ", Difficulté : "+ this.difficulty );
      this.initGame();
    })

  }
  
  
  
  ngOnInit() {  
  }

  public async initGame(){

    await this.getTableQuestion();
    //console.log(this.questions);
    await this.getQuestionDisplay();
    //console.log(this.questionDisplay);
    this.beginGame = true;
  }

  public async getTableQuestion(){
    try {
      this.questions = await this.trivialService.getQuestions(2, this.difficulty);
      
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header : 'Erreur appele Service',
        message : "Impossible de récupérer les questions.",
        buttons : ["OK"]
      });
      alert.present();
    }
  }

  public getQuestionDisplay(){
    this.questionDisplay = this.questions[this.indexQuestion];
    //JS permet de rajouter des attributs dynamiques à un objet courant. avec les []
    //au lieu de mettre des attributs optionnels ds la class Question
    this.questionDisplay["reponses"] = [];
    for (let reponse of this.questionDisplay["incorrect_answers"]) {
      //TS permet d'ajouter un objet js avec {} objet sans nom
       this.questionDisplay["reponses"].push({
        answer : reponse,
        correct : false
      });
      
    }
    this.questionDisplay["reponses"].push({
      answer : this.questionDisplay["correct_answer"],
      correct : true
    });
    this.questionDisplay["reponses"] = this.shuffleArray(this.questionDisplay["reponses"]);
  }

  public shuffleArray(array){
    for (var i = array.length - 1; i > 0; i--)
     { var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i]; array[i] = array[j];
      array[j] = temp;}
      return array;
      }
  
  public answer(reponse : string){
    this.nextQuestion = true;
    if (reponse["correct"]) {
      this.points++;     
    }

    if (this.indexQuestion >= this.questions.length -1) {
      this.endGame =true;
    }
  }

  public questionNext(){
    if (this.indexQuestion < this.questions.length -1) {
      this.indexQuestion++;
      this.nextQuestion = false;
      this.getQuestionDisplay();
    }
  }

  public back(){
    this.router.navigate(['/score', this.points]);
    //this.beginGame = false;
  }

  




}
