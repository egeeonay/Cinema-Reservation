const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const movie = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getDataFromLocal();
calculate();

function calculate(){
    const selectedSeats = container.querySelectorAll('.seat.selected');
    let seatCount = selectedSeats.length;
    count.innerText = seatCount;
    amount.innerText = (movie.value) * seatCount;

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })

    saveToLocalStorage(selectedSeatIndexs);
}

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', movie.selectedIndex);
}

container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');

        calculate();
    }
});
 
function getDataFromLocal(){

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex =localStorage.getItem('selectedMovieIndex');

    if(selectedSeats != null && selectedSeats.length > 0){
         seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
         })
    }

    if(selectedMovieIndex != null){    
        movie.selectedIndex = selectedMovieIndex ;
    }

}

movie.addEventListener('change', function(e){
    calculate();
});