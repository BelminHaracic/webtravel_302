export interface Destination {
  _id: string;
  city: string;
  country: string;
  description: string;
  imageURL: string;
  review: number;
  categories: string[];
  continent: string;
  comments: Comment[];
}

export interface Comment {
  _id: string; 
user: {
  username: string;
};
message: string;
date: Date;
}
