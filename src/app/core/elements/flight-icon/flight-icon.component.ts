import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-icon',
  templateUrl: './flight-icon.component.html',
  styleUrls: ['./flight-icon.component.scss']
})
export class FlightIconComponent implements OnInit {
  @Input() flightColor;
  constructor() { }

  ngOnInit(): void { }

}
