import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-s',
  templateUrl: './to-s.component.html',
  styleUrls: ['./to-s.component.css']
})
export class ToSComponent implements OnInit {

  constructor() { }

  policyName = "Terms of Service";
  ngOnInit(): void {
  }

}
