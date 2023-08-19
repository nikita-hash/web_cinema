function changePhoto(inp){
    let file = inp.files[0]
    let avatar = inp.closest('DIV').querySelector('img')
    if (file != null) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        avatar.src = reader.result
      }
    } else {
      avatar.src = './images/Icon.jpg'
    }
  }

  function up(icon){
    text=icon.closest('.modal-body').querySelector(".modal-body_header").querySelector("h1").childNodes[0];

    if(text.textContent!=10){
      text.textContent++;
    }
  }

  function openRatingBlokc(id){
    document.getElementById('id_cinema_rating').value=id;
    console.log(id);
}

function sendRating(){
  axios.get('http://localhost:8080/user_menu/add_rating',{
    params:{
      id:localStorage.getItem('id'),
      id_film:document.getElementById('id_cinema_rating').value,
      rating:document.getElementById('rating_index').childNodes[0].textContent
    }
  })
  .then((response)=>{
    console.log(response.data);
    appendAlert(response.data,"success")
  })
}

  function donw(icon){
    text=icon.closest('.modal-body').querySelector(".modal-body_header").querySelector("h1").childNodes[0];

    if(text.textContent!=1){
      text.textContent--;
    }
  }

  function sortFilm(text){
    console.log(text);
    axios.get("http://localhost:8080/user_menu/getFilm",{
      params:{
        type:text.value
      }
    })
    .then((response)=>{
      list_film=document.getElementById('list_card');
      mas=response.data;
      html='';
      for(i=0;i<mas.length;i++){
        html+=`<div class="cellphone-container">    
        <div class="movie">       
          <div class="menu">`
          if(mas[i].list.length==0){
            html+=`<i class="fa-regular fa-heart" onclick="takeLike(this,${mas[i].id})"></i>`
          }
          else{
            html+=`<i class="fa-solid fa-heart" onclick="takeLike(this,${mas[i].id})"></i>`
          }
          html+=`<div class="menu_rating">10</div></div>
          <img class="movie-img" src="${mas[i].preview}">
          <div class="text-movie-cont">
            <div class="mr-grid">
              <div class="col1">
                <h1>${mas[i].name}</h1>
                <ul class="movie-gen">
                  <li>${mas[i].years}  /</li>
                  <li>${mas[i].time}  /</li>
                  <li>${mas[i].author}  /</li>
                  <li>${mas[i].genre}</li>
                </ul>
              </div>
            </div>
            <div class="mr-grid summary-row">
              <div class="col2">
                <h5>SUMMARY</h5>
              </div>
              <div class="col2 rating">
                 <ul class="movie-likes">
                  <li class="rating"><i class="fa-solid fa-heart"></i>${mas[i].list.length}</li>
                </ul>
              </div>
            </div>
            <div class="mr-grid">
              <div class="col1">
                <p class="movie-description">${mas[i].description}</p>
              </div>
            </div>
            <div class="mr-grid action-row">
            <button class="watch-btn"><h3><i class="fa-solid fa-star"></i>Оценить</h3>
              </button>
            </div>
          </div>
        </div>
    </div>`
    }
      list_film.innerHTML=html;
    })
  }

  function takeLike(icon,id_film){
    rating=icon.closest('.movie').querySelector('.summary-row .rating .movie-likes .rating');
      if(icon.classList=='fa-solid fa-heart'){
        axios.delete('http://localhost:8080/user_menu/remove_like',{
          params:{
            id_films:id_film,
            id:localStorage.getItem('id')
          }
        })
        .then((response)=>{
          icon.classList="fa-regular fa-heart"
          rating.childNodes[1].textContent--;
        })
        .then((error)=>{
  
        })
      }
      else{
        axios.get('http://localhost:8080/user_menu/add_like',{
          params:{
            id_films:id_film,
            id:localStorage.getItem('id')
          }
        })
        .then((response)=>{
          icon.classList='fa-solid fa-heart';
          rating.childNodes[1].textContent++;
        })
        .then((error)=>{
  
        })
      }
  }