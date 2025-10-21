class Movie{
    constructor(image, release_date, Title, original_language,overview, rating, link){
    this.image = image;
    this.release_date = release_date;
    this.Title = Title;
    this.original_language = original_language;
    this.overview = overview;
    this.rating = rating;
    this.link = link;
}
}

!async function (){
    
//private apiKey = '57a4ac9f152331a4dc1321b92927f9cd';
//private url = 'https://api.themoviedb.org/3';

const options = {
   method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2E0YWM5ZjE1MjMzMWE0ZGMxMzIxYjkyOTI3ZjljZCIsIm5iZiI6MTc1ODI3OTgyNy44MjUsInN1YiI6IjY4Y2QzODkzMDI1YWYxZDVhODM4MmQ5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VjBEwBMEmFCcsUVsBNlFQoLenZHthZDG2KoeT8rrf9g'
  }
};

let data = await fetch('https://api.themoviedb.org/3/account/22322360/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));

  console.log (data);


    let = movieList=[]

    for (i = 0; i < data.movies.length; i++){ 

        let image = data.Movie[i].video;
        let Title = data.Movie[i].title;
        let release_date= data.Movie[i].release_date;
        let original_language = data.Movie[i].original_language;
        let overview = data.Movie[i].overview;
        let rating = data.Movie[i].vote_average;
        }
}()