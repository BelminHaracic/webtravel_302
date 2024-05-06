import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field'; 


export interface Category {
  name: string;
}


@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})


export class ChipComponent implements OnInit {

  
  
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  categories: Category[] = [];
  @Output()
  onSubmit = new EventEmitter<Category[]>();


  submit(){
    this.onSubmit.emit(this.categories);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.categories.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(categories: Category): void {
    
    const index = this.categories.indexOf(categories);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  

  constructor() { }

  ngOnInit(): void {
    
  }

}
