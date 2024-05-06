import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAccordion } from '@angular/material/expansion';
import { Category } from 'src/app/components/chip/chip.component';
import { Destination } from 'src/app/models/destinations.model';
import { DestinationService } from 'src/app/services/destinations.service';
import { environment } from 'src/environments/environment';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dest',
  templateUrl: './admin-dest.component.html',
  styleUrls: ['./admin-dest.component.css']
})
export class AdminDestComponent implements OnInit {
  continents = ['Evropa', 'Azija', 'Afrika', 'Sjeverna Amerika', 'Južna Amerika', 'Australija', 'Antarktik'];
  DestinationService: any;
  UserService: any;
  imageUrl: string = '';
  selectedFile: File | undefined;
  sortedBy: string = 'original'; // Inicijalno sortiranje
  sortDirection: number = 1; // 1 za rastući redoslijed, -1 za opadajući
  image: string = "/images/Destinations/Default.jpg";
  constructor(
    private destService: DestinationService,
    private http: HttpClient
  ) { }
 onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.selectedFile = file;

  // Prikaži pretpregled odabrane slike
  const reader = new FileReader();
  reader.onload = (e: any) => {
    this.imageUrl = e.target.result;
  };
  reader.readAsDataURL(file);
}

  uploadImage() {
    if (!this.selectedFile) {
      console.error('Nije odabrana slika.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', this.selectedFile);
  
    this.http.post<any>('http://localhost:3000/upload', formData).subscribe(
      (response: any) => {
        console.log('Slika uspješno otpremljena.', response.imageUrl);
        // Ovdje možete dalje obraditi odgovor (npr. sačuvati URL slike u bazi podataka ili postaviti URL u formi)
        this.destinationForm.patchValue({ image: response.imageUrl }); // Postavite URL slike u formu
      },
      (error: any) => {
        console.error('Greška prilikom otpremanja slike.', error);
        // Dodajte odgovarajući tretman greške ili poruku za korisnika
      }
    );
  }


  sortDestinationsBy(sortType: string) {
    if (sortType === 'alphabetical') {
      this.sortDirection = 1;
      this.destinations.sort((a, b) => (a.city > b.city ? 1 : -1) * this.sortDirection);
      this.sortedBy = 'alphabetical';
    } else if (sortType === 'reverseAlphabetical') {
      this.sortDirection = -1;
      this.destinations.sort((a, b) => (a.city > b.city ? 1 : -1) * this.sortDirection);
      this.sortedBy = 'reverseAlphabetical';
    } else {
      this.sortDirection = 1;
      this.loadData();
      this.sortedBy = 'original';
    }
  }
  
  resetSorting() {
    this.sortDestinationsBy('original');
  }
  
  ngOnInit(): void {
    this.loadData();

  }

  panelOpenState = false;

  @ViewChild('myaccordion')
  myPanels!: MatAccordion;

  openAll() {
    this.myPanels.openAll();
  }

  closeAll() {
    this.myPanels.closeAll();
  }

  loadData() {
    this.destService.getAll().subscribe(data => {
      if ("statusCode" in data) {
        this.destinations = [];
      } else {
        for (let dest of data) {
          dest.imageURL = environment.API_URL + "/" + dest.imageURL;
        }
        this.destinations = data;
      }
    })

  }

  destinations: Destination[] = [];

  activeTab: String = "users"

  panels: string[] = ["destinations", "users", "bookings"]

  checkDest(panel: string) {
    if (this.activeTab == panel) {
      return true
    }

    return false;

  }

  openPanel(panel: string) {
    this.activeTab = panel;
  }

  splitCategories(cat: string[]) {

    let categories: string = "";

    for (let i = 0; i < cat.length; i++) {

      categories += "[" + cat[i] + "] "

    }

    return categories;
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  // AdminDestComponent
deleteDest(id: string) {
  this.destService.remove(id).subscribe(
    () => {
      // Obrisanje uspešno završeno, osveži podatke
      this.loadData();
    },
    (error) => {
      console.error('Greška prilikom brisanja destinacije:', error);
      // Dodajte odgovarajući tretman greške ili poruku za korisnika
    }
  );
}



  hideInput: string = "display: none;"
  showInput: string = "display: block"
  hide: string = "display: none;"
  show: string = "display: block"


  editEvent(option:boolean) {

    if(option){
      this.hideInput = this.show;
      this.showInput = this.hide;
    }else{
      this.hideInput = this.hide;
      this.showInput = this.show;
    }

  }

  reloadPage(){
    window.location.reload();
  }

  passVariable(val:string){
    return val
  }


  editForm = new FormGroup({
    cityEdit: new FormControl('', [Validators.required]),
    countryEdit: new FormControl('', [Validators.required]),
    descriptionEdit: new FormControl('', [Validators.maxLength(50)]),
    reviewEdit: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
    continentEdit: new FormControl('', [Validators.required]) // Dodajte FormControl za kontinent
  });

  editDest(id: string) {
    const { cityEdit, countryEdit, descriptionEdit, reviewEdit, continentEdit } = this.editForm.value;

    this.destService.update(id, cityEdit, countryEdit, descriptionEdit, reviewEdit, continentEdit)
        .subscribe(() => {
            window.location.reload(); // Osvježi nakon uspješnog ažuriranja
        });

    this.hideInput = this.hide;
    this.showInput = this.show;
}


  destinationForm = new FormGroup({
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    review: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
    continent: new FormControl('', [Validators.required]),
    categories: new FormControl("")
  });

  searchForm = new FormGroup({
    id: new FormControl("", [Validators.required])
  })


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  Categories: Category[] = [];
  @Output()
  onSubmit = new EventEmitter<Category[]>();


  submit() {
    this.onSubmit.emit(this.Categories);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.Categories.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(categories: Category): void {

    const index = this.Categories.indexOf(categories);

    if (index >= 0) {
      this.Categories.splice(index, 1);
    }
  }

  createDest() {
    const { city, country, description, review, continent } = this.destinationForm.value;
    const image = this.image;
  
    // Extract category names from the array of Category objects
    const categories = this.Categories.map(category => category.name);
  
    // Call service method with the array of category names
    this.destService.create(city, country, description, review, image, continent, categories)
      .subscribe(() => {
        window.location.reload(); // Reload after successful creation
      });
  }

}
