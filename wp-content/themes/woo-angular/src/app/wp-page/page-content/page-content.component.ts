import { Component, OnInit, Input } from '@angular/core';
import { WpPage } from '../../types';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css'],
})
export class PageContentComponent implements OnInit {

  @Input() page: WpPage;

  constructor() { }

  ngOnInit() {
    
  }

}
