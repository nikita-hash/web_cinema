function openAccount(){
    if(localStorage.getItem("id")==null){
        window.location.href='../autorization/autorization.html';
    }
}

function initSettins(){
    login=document.getElementById('sett_login');
    password=document.getElementById('sett_password');
    avatar=document.getElementById('profil_photo').closest('DIV').querySelector('img');
    nameReg=document.getElementById('sett_name');
    last_name=document.getElementById('sett_last_name');
    patronymic=document.getElementById('sett_patronymic');
    axios.get('http://localhost:8080/admin_menu/initialized_settins',{
        params:{
            id:localStorage.getItem("id")
        }
    })
        .then((response) => {
           login.value=response.data.login;
           password.value=response.data.password;
           nameReg.value=response.data.men.name;
           last_name.value=response.data.men.last_name;
           patronymic.value=response.data.men.patronymic;
           avatar.src=response.data.avatar
        })
        .catch((error) => {
          window.location.href='../autorization/autorization.html';
        console.log(error);
        });
}

function iniFilms(){
    list_film=document.getElementById('list_card');
    axios.get('http://localhost:8080/user_menu/initialized_films',{})
    .then((response)=>{
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
                    <h5>Краткое описание</h5>
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
                <button data-bs-toggle="modal" onclick="openRatingBlokc(${mas[i].id})" data-bs-target="#staticBackdrop" class="watch-btn"><h3><i class="fa-solid fa-star"></i>Оценить</h3>
                  </button>
                </div>
              </div>
            </div>
        </div>`
        }
        list_film.innerHTML=html;
    })
    .then((error)=>{

    })
}

iniFilms();
initSettins();