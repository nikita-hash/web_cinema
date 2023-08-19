form = document.getElementById('settins_form');

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
    list_film=document.getElementById('list_cinema');
    axios.get('http://localhost:8080/admin_menu/initialized_films',{})
    .then((response)=>{
        mas=response.data;
        html='';
        for(i=0;i<mas.length;i++){
            html+=`<div class="example-2 card">
            <div class="wrapper">
              <img src="${mas[i].preview}"> 
              <div class="header">
                <div class="date">
                  <span class="day">12</span>
                  <span class="month">Aug</span>
                  <span class="year">2016</span>
                </div>
                <ul class="menu-content">
                  <li>
                    <a href="#" class="fa fa-bookmark-o"></a>
                  </li>
                  <li><i class="fa-regular fa-heart"><span>${mas[i].list.length}</span></i></li>
                  <li><i class="fa-regular fa-comment"><span>18</span></i></li>
                </ul>
              </div>
              <div class="data">
                <div class="content">
                  <span class="author">${mas[i].author}</span>
                  <h1 class="title"><a href="#">${mas[i].name}</a></h1>
                  <p class="text">${mas[i].description}</p>
                  <a href="#" class="button">Read more</a>
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

function iniStatistic(){
    
    axios.get('http://localhost:8080/admin_menu/initialized_statistic',{})
    .then((response)=>{
        console.log(document.getElementById('film_stat'));
        document.getElementById('film_stat').textContent=response.data.number_film
        document.getElementById('user_stat').textContent=response.data.number_user
        document.getElementById('block_user_stat').textContent=response.data.number_block
        char(response.data.list_like)
        list_stat=document.getElementById('list_top_cinema');
        html_stat='';
        mas=response.data.likesActions;
        for(i=0;i<mas.length;i++){
            html_stat+=`
            <div class="top_cinema_block">
                        <h2 class="rating_top">${i+1}</h2>
                        <img src="${mas[i].preview}">
                        <div>
                            <ul>
                                <li><h3>${mas[i].name}</h3></li>
                                <li><i class="fa-sharp fa-solid fa-heart"></i>like<span>${mas[i].list.length}</span></li>
                            </ul>
                        </div>
                    </div>`
        }
        list_stat.innerHTML=html_stat
    })
}

function initUsers(){
    tbody=document.getElementById('tbody_account');
    html_user='';
    axios.get('http://localhost:8080/admin_menu/initialized_users',{})
        .then((response) => {
           mas=response.data;
           status_class='';
           for(i=0;i<mas.length;i++){
            if(mas[i].status==='Заблокирован'){
                status_class='table-danger';
            }
            html_user+=`<tr class="${status_class}">
            <td scope="col">${i}</td>
            <td scope="col"><img src="${mas[i].avatar}"></td>
            <td scope="col">${mas[i].men.name+' '+mas[i].men.last_name+" "+mas[i].men.patronymic}</td>
            <td scope="col">${mas[i].login}</td>
            <td scope="col">${mas[i].status}</td>
            <td scope="col">${mas[i].role}</td>
            <td scope="col">
            `
            
            if(mas[i].id!=localStorage.getItem('id')){
                if(mas[i].status==='Заблокирован'){
                    html_user+=`<button type="button" title="Разблокировать" onclick="unblock_account(${mas[i].id})" class="btn btn-success"><i class="fa-solid fa-unlock"></i></button>
                            `
                }
                else{
                    html_user+=`<button type="button" title="Заблокировать"  onclick="block_account(${mas[i].id})" class="btn btn-danger"><i class="fa-solid fa-lock"></i></button>
                    `
                }
                if(mas[i].role==='Администратор'){
                    html_user+=`<button type="button" title="Забрать права администратора"  onclick="take_user(${mas[i].id})" class="btn btn-danger"><i class="fa-solid fa-lock"></i></button>
                    `
                }
                else{
                    html_user+=`<button type="button" title="Выдать права администратора"  onclick="take_admin(${mas[i].id})" class="btn btn-success"><i class="fa-solid fa-user-tie"></i></button>
                    `
                }

                html_user+=` <button type="button" title="Удалить" class="btn btn-danger" onclick="remove_account(${mas[i].id})"><i class="fa-solid fa-trash"></i></button></td>
                </tr>`
            }
           }
           tbody.innerHTML=html_user;
        })
        .catch((error) => {
        console.log(error);
        });

}

iniStatistic();
openAccount();
initUsers();
initSettins();
iniFilms();