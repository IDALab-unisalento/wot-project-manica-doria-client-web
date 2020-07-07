import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() pics: any[];

  constructor() { }

  ngOnInit(): void {
  }

  iframeDidLoad(path: string) {
    console.log(path);
    //(document.getElementById('myIframe') as HTMLInputElement).setAttribute('src', path);
  }
}
