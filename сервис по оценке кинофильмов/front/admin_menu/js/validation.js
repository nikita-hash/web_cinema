form = document.getElementById('settins_form');
form_film = document.getElementById('fomr_film');

function setError(inp){
    const block=inp.closest('.inp_block');
    block.classList="inp_block error";
}
function setSuccess(inp){
    const block=inp.closest('.inp_block');
    block.classList="inp_block success";
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(validationSettins(form)){
        login=document.getElementById('sett_login');
        password=document.getElementById('sett_password');
        avatar=document.getElementById('profil_photo').closest('DIV').querySelector('img');
        nameReg=document.getElementById('sett_name');
        last_name=document.getElementById('sett_last_name');
        patronymic=document.getElementById('sett_patronymic');
        account={
            login:login.value,
            password:password.value,
            avatar:avatar.src,
            men:{
                name:nameReg.value,
                last_name:last_name.value,
                patronymic:patronymic.value,
            }
        }
        axios.put('http://localhost:8080/admin_menu/update_settins',account)
        .then((response) => {
            appendAlert(response.data,"success")
        })
    }
})

form_film.addEventListener('submit',(e)=>{
    preview=document.getElementById('photo_cinema_img');
    name_film=document.getElementById('name_film');
    years_film=document.getElementById('years_film');
    genre_film=document.getElementById('genre_film');
    description_film=document.getElementById('description_film');
    producer_film=document.getElementById('producer_film');
    long_film=document.getElementById('long_film');
    e.preventDefault();
    if(validationFimlms(form_film)){
        film={
            name:name_film.value,
            author:producer_film.value,
            description:description_film.value,
            genre:genre_film.value,
            years:years_film.value,
            time:long_film.value,
            preview:preview.src,
            list:null
        }
        axios.post('http://localhost:8080/admin_menu/add_film',film)
        .then((response) => {
            appendAlert(response.data, 'success');
            iniFilms();
        console.log(response);
        })
        .catch((error) => {
        console.log(error);
        });
        
    }
})

function validationSettins(form){
    set_name=document.getElementById('sett_name');
    last_name=document.getElementById('sett_last_name');
    console.log(set_name);
    patronymic=document.getElementById('sett_patronymic');
    login=document.getElementById('sett_login');
    password=document.getElementById('sett_password');

    if(set_name.value==='' || !set_name.value.match(/[ЙЦУКЕНГШЩЗХФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэюбьтимсчяёЁ]{2,40}/)){
        setError(set_name);
    }
    else{
        setSuccess(set_name);
    }
    if(last_name.value==='' || !last_name.value.match(/[ЙЦУКЕНГШЩЗХФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэюбьтимсчяёЁ]{2,40}/)){
        setError(last_name);
    }
    else{
        setSuccess(last_name);
    }
    if(patronymic.value==='' || !patronymic.value.match(/[ЙЦУКЕНГШЩЗХФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэюбьтимсчяёЁ]{2,40}/)){
        setError(patronymic);
    }
    else{
        setSuccess(patronymic);
    }
    if(login.value===''){
        setError(login);
    }
    else{
        setSuccess(login);
    }
    if(password.value===''){
        setError(password);
    }
    else{
        setSuccess(password);
    }
    if(form.querySelectorAll('.error').length===0){
        return true;
    }
    else{
        return false;
    }
}

function validationFimlms(form){
    name_film=document.getElementById('name_film');
    years_film=document.getElementById('years_film');
    genre_film=document.getElementById('genre_film');
    description_film=document.getElementById('description_film');
    producer_film=document.getElementById('producer_film');
    long_film=document.getElementById('long_film');
    if(form.querySelectorAll('.error').length===0){
        return true;
    }
    else{
        return false;
    }
}

