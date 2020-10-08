import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../Models/question';

@Injectable({
    providedIn:'root' //permet de le déclarer ici au lieu de ds app.module.ts
})
export class OpenTriviaProvider{

    constructor(private httpClient : HttpClient){}

    public getQuestions(nbQuestions : number, difficulty : string):Promise<Array<Question>>{
        return new Promise((resolve, reject) => {
            let params = new HttpParams();
            params = params.append('amount', String(nbQuestions));
            params = params.append('difficulty', difficulty);
            this.httpClient.get('https://opentdb.com/api.php', {params:params})
            .toPromise()
            .then((response)=>{
                if ( response['response_code']== 0) {
                    resolve(response['results']);
                }else{
                    reject("Le serveur n'a pas retourné de valeur!!");
                } 
            })
            .catch((error)=>{
                reject(error);
            });


        })
    }


                // resolve([
            //     { category: "Entertainment: Japanese Anime & Manga",
            //     type: "multiple",
            //     difficulty: "easy",
            //     question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?",
            //     correct_answer: "The Salamander",
            //     incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"]
            //     },
            //     { category: "Entertainment: Video Games",
            //     type: "boolean",
            //     difficulty: "medium",
            //     question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.",
            //     correct_answer: "False",
            //     incorrect_answers: ["True"]
            //     },
            //     { category: "Entertainment: Japanese Anime & Manga",
            //     type: "multiple",
            //     difficulty: "easy",
            //     question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?",
            //     correct_answer: "The Salamander",
            //     incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"]
            //     },
            //     { category: "Entertainment: Video Games",
            //     type: "boolean",
            //     difficulty: "medium",
            //     question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.",
            //     correct_answer: "False",
            //     incorrect_answers: ["True"]
            //     }
            // ]);
}