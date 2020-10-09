import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  public points : number = 0; 
  constructor(private route : ActivatedRoute) {
    this.route.params.subscribe((params)=>{
      this.points = params['points'];
    })
   }

  ngOnInit() {
  }

}
