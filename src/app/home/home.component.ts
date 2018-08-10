import { Component, OnInit } from '@angular/core';
import { Title } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title ) { }

  ngOnInit() {
    this.setTitle('Vacation Tracker');
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
