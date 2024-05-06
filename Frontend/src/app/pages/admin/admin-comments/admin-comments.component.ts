import { Component, OnInit } from '@angular/core';
import { Destination, Comment } from 'src/app/models/destinations.model';
import { DestinationService } from 'src/app/services/destinations.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {
  destinations: Destination[] = [];

  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.loadDestinationsWithComments();
  }

  loadDestinationsWithComments() {
    this.destinationService.getAllWithComments().subscribe((destinations: Destination[]) => {
      this.destinations = destinations;
    });
  }

  deleteComment(comment: Comment) {
    console.log('Brisanje komentara:', comment);
    this.destinationService.deleteComment(comment).subscribe(() => {
      console.log('Komentar uspješno obrisan:', comment);
      // Iterate through all destinations to find the comment and remove it
      this.destinations.forEach(destination => {
        const commentIndex = destination.comments.findIndex(c => c._id === comment._id);
        if (commentIndex !== -1) {
          destination.comments.splice(commentIndex, 1);
        }
      });
    });
  }
  
}  