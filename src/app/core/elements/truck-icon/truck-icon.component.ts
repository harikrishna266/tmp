import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-truck-icon',
  templateUrl: './truck-icon.component.html',
  styleUrls: ['./truck-icon.component.scss']
})
export class TruckIconComponent implements OnInit {
  @Input() fillAmount:Number;

  fillPercentage:Number;

  constructor() { }

  ngOnInit(): void {
	  setTimeout(()=>{
		  this.fillPercentage = this.fillAmount;
	  })
  }

}
