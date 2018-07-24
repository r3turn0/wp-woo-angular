import { Component, OnInit, Input } from '@angular/core';
import { WpPage } from '../../wp-page';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css'],
})
export class HomeContentComponent implements OnInit {

  @Input() page: WpPage;
  
  slug = 'home';

  constructor() { }

  ngOnInit() {
    
  }

}
