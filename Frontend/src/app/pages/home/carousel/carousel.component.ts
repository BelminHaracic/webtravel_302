import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/components/chip/chip.component';
import { Destination } from 'src/app/models/destinations.model';
import { User } from 'src/app/models/users.model';
import { DestinationService } from 'src/app/services/destinations.service';
import { environment } from 'src/environments/environment';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { BookingService } from 'src/app/services/bookings.service';
import { U } from '@angular/cdk/keycodes';
import { SortDirection } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {
  BookingService: any;
  selectedDestination: any; 
  private apiUrl = 'http://localhost:3000';
  destinations : Destination[] = [];
  searchTerm: string = '';
  filteredDestinations: Destination[] = [];
  sortDirection: SortDirection = 'asc';
  selectedSortOrder: 'asc' | 'desc' = 'asc'; 
  selectedFile: File | null = null;
  selectedContinent: string | null = null;
  newComment: string = '';
  showCommentForm = false;

  constructor(private destinationService: DestinationService, 
    private router: Router, 
    private bookingService: BookingService,
    private http: HttpClient) {}
  destinationForm = new FormGroup({
    image: new FormControl('')  // Ovdje možete dodati dodatna polja za ažuriranje
  });
  
  sortDestinations() {
    if (this.selectedContinent) {
      // Filtriraj destinacije samo za odabrani kontinent
      const filteredByContinent = this.filteredDestinations.filter(dest => dest.continent === this.selectedContinent);
      // Sortiraj destinacije po ocjeni unutar odabranog kontinenta
      filteredByContinent.sort((a, b) => {
        if (this.selectedSortOrder === 'asc') {
          return a.review - b.review;
        } else {
          return b.review - a.review;
        }
      });
      // Zamijeni filtrirane destinacije s sortiranim destinacijama unutar odabranog kontinenta
      this.filteredDestinations = filteredByContinent;
    } else {
      // Ako kontinent nije odabran, sortiraj sve destinacije po ocjeni
      this.filteredDestinations.sort((a, b) => {
        if (this.selectedSortOrder === 'asc') {
          return a.review - b.review;
        } else {
          return b.review - a.review;
        }
      });
    }
  }
  
  filterDestinations() {
    this.filteredDestinations = this.destinations.filter(dest => {
      const matchesSearchTerm = 
        dest.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesContinent = !this.selectedContinent || dest.continent === this.selectedContinent;
  
      return matchesSearchTerm && matchesContinent;
    });
  
    // Nakon filtriranja, sortirajte ponovno filtrirane destinacije
    this.sortDestinations();
  }
  toggleSortDirection() {
    // Ako smjer sortiranja nije postavljen, postavite ga na "asc"
    if (this.sortDirection === null) {
      this.sortDirection = 'asc';
    } else {
      // Inače, promijenite smjer sortiranja
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    this.sortDestinationsByReview();
  }
  sortDestinationsByReview() {
    this.filteredDestinations.sort((a, b) => {
      // Ako je smjer sortiranja uzlazni ('asc')
      if (this.sortDirection === 'asc') {
        return a.review - b.review;
      } else { // Inače, smjer sortiranja je silazni ('desc')
        return b.review - a.review;
      }
    });
  }
  // Filtering Function
  filter(categories: Category[]) {
    this.filteredDestinations = this.destinations.filter(d => {
      return categories.every(c => {
        return d.categories.includes(c.name.toLowerCase())
      })
    });
  
    // Sortiranje filtriranih destinacija po ocjeni (zvjezdici)
    this.sortDestinationsByReview();
  }

  // Redirect Function
  reDirect(){

    this.router.navigateByUrl("to-s")

  }

  u?: User = undefined  
  ngOnInit(): void {
    this.destinationService.getAll().subscribe(destinations => {
      this.destinations = destinations;
  
      for (let dest of destinations) {
        // Odaberite odgovarajući query za Unsplash na temelju kategorije destinacije
        let category = dest.categories && dest.categories.length > 0 ? dest.categories[0].toLowerCase() : 'random';
        dest.imageURL = this.generateRandomUnsplashImageURL(category);
      }
  
      this.filter([]);
    });
  
    let localUser = localStorage.getItem("user");
    if (localUser != undefined) {
      this.u = JSON.parse(localUser);
    }
  }
   getCommentCount(destination: Destination): string {
    if (destination && destination.comments) {
      const commentCount = destination.comments.length;
      return commentCount > 0 ? `(${commentCount})` : ''; // Vraća broj komentara u zagradama ili prazan string ako nema komentara
    } else {
      return ''; // Ako destinacija ili njeni komentari nisu definirani, vraćamo prazan string
    }
  }
  openBookingDialog(dest: Destination) {
    this.selectedDestination = dest;
    this.isBooking = true;
    this.showCommentForm = false;
  }
  closeCommentForm() {
    this.showCommentForm = false;
  }
  openCommentForm(dest: Destination) {
    this.selectedDestination = dest;
    this.showCommentForm = true;
  }
  generateRandomUnsplashImageURL(category: string): string {
    const width = 800;
    const height = 600;
    const randomSeed = Math.floor(Math.random() * 1000); // Generišemo nasumičan broj od 0 do 999
  
    let query = '';
  
    // Provjerite postojanje kategorije
    if (category.toLowerCase() === 'priroda') {
      query = 'nature';
    } else {
      console.warn(`Kategorija '${category}' nije podržana za generiranje slike. Koristi se nasumična slika.`);
      query = 'random'; // Ako kategorija nije "priroda", generirajte nasumičnu sliku
    }
  
    return `https://source.unsplash.com/${query}/${width}x${height}?sig=${randomSeed}`;
  }
  
  openDetails(destination: Destination): void {
    console.log('Kliknuto na destinaciju:', destination);
    this.selectedDestination = destination;
  }
  
BookingForm = new FormGroup({
    userID: new FormControl('', [Validators.required]),
    destID: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
});



  

  bookUser = "default"
  startDate =""
  endDate =""
  isBooking = false;

  checkBooking(id:string){

    if(this.u != undefined){
      this.bookNow(id)
    }else{
      alert("Morate biti prijavljeni da biste pristupili ovoj funkciji.")
    }
  }
  bookNow(id: string) {
    if (this.u) {
        this.isBooking = true;
        this.BookingForm.patchValue({
            userID: this.u._id,  // Postavi userID na ID prijavljenog korisnika
            destID: id,
            startDate: '',
            endDate: ''
        });
    } else {
        alert('Morate biti prijavljeni da biste obavili rezervaciju.');
    }
}
  
  getDestinationImage(destination: Destination): string {
    if (destination.imageURL) {
      // Ako postoji URL slike za destinaciju, prikaži tu sliku
      return `url(${destination.imageURL})`;
    } else {
      // Ako slika nije dodana, generiraj nasumičnu Unsplash sliku
      return `url(${this.generateRandomUnsplashImageURL(destination.categories[0].toLowerCase())})`;
    }
  }
  uploadImage() {
    if (!this.selectedFile) {
      console.error('Nije odabrana slika.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', this.selectedFile);
  
    this.http.post<any>('http://localhost:3000/uploads', formData).subscribe(
      (response: any) => {
        console.log('Slika uspješno otpremljena.', response.imageUrl);
        // Postavite URL slike u formu za destinaciju
        this.destinationForm.patchValue({ image: response.imageUrl });
      },
      (error: any) => {
        console.error('Greška prilikom otpremanja slike.', error);
        // Dodajte odgovarajući tretman greške ili poruku za korisnika
      }
    );
  }
  
  bookNowBTN = false;

  createBooking() {
    if (this.u) {
        let destID = this.BookingForm.value.destID;
        let start = this.BookingForm.value.startDate;
        let end = this.BookingForm.value.endDate;

        if (start != "" && end != "") {
            this.bookingService.create(this.u._id, destID, start, end).subscribe(c => {
                alert("USPJEŠNO!")
                window.location.reload();
            });
        } else {
            console.error('Nevažeći datumi za rezervaciju.');
        }
    } else {
        alert('Morate biti prijavljeni da biste obavili rezervaciju.');
    }
}
  

addComment() {
  if (!this.newComment.trim()) {
    return;
  }
  const destinationId = this.selectedDestination._id;
  const userId = this.u?._id || ''; // Pretpostavka: korisnik je prijavljen
  this.http.post<any>('http://localhost:3000/destination/comment', { destinationId, userId, message: this.newComment })
    .subscribe((response: any) => {
      // Ažurirajte listu komentara odabrane destinacije
      this.selectedDestination.comments.push({
        user: {
          username: this.u?.username || '' // Dodajte korisničko ime
        },
        message: this.newComment,
        date: new Date() // Dodajte trenutni datum
      });
      this.newComment = ''; // Očisti polje za unos nakon dodavanja komentara
    }, (error: any) => {
      console.error('Greška prilikom dodavanja komentara.', error);
      // Dodajte odgovarajući tretman greške ili poruku za korisnika
    });
}

showCommentSection() {
  this.showCommentForm = true;
}

}
