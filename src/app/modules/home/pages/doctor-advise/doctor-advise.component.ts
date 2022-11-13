import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-advise',
  templateUrl: './doctor-advise.component.html',
  styleUrls: ['./doctor-advise.component.scss']
})
export class DoctorAdviseComponent implements OnInit {

  room: any = [
    {
      name: 'hehe',
      _id: '12',
    },
    {
      name: 'hihi',
      _id: '13',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
