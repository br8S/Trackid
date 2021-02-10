var main_artist_column = document.querySelector('.main-artist-column')
var main_artist_row = document.querySelector('.main-artist-row')
var btn_left = document.querySelector('.btn-left')
var btn_right = document.querySelector('.btn-right')

btn_left.addEventListener('click', moveLeft)
btn_right.addEventListener('click', moveRight)

function moveLeft(){
    main_artist_row.scrollLeft -= 250;
}

function moveRight(){
    main_artist_row.scrollLeft += 250;
}