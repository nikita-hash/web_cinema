form = document.getElementById('settins_form');

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

  form = document.getElementById('settins_form');

function setError(inp){
    const block=inp.closest('.inp_block');
    block.classList="inp_block error";
}
function setSuccess(inp){
    const block=inp.closest('.inp_block');
    block.classList="inp_block success";
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" style="position:absolute;top:6%; left: 4%;" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
    setTimeout(() => {
        alertPlaceholder.innerHTML=''
      }, "5000");
  }


form.addEventListener('submit',(e)=>{
    login=document.getElementById('sett_login');
    password=document.getElementById('sett_password');
    avatar=document.getElementById('profil_photo').closest('DIV').querySelector('img');
    nameReg=document.getElementById('sett_name');
    last_name=document.getElementById('sett_last_name');
    patronymic=document.getElementById('sett_patronymic');
    e.preventDefault();
    if(validationSettins(form)){
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
        registration(account);
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

function registration(obj){
    axios.post('http://localhost:8080/registration/user',obj)
        .then((response) => {
            const alert=document.getElementById('alert_sec_reg');
            appendAlert('Регистрация прошла успешно', 'success');
        console.log(response);
        })
        .catch((error) => {
        console.log(error);
        });
}

function autorizationRequest(log,pas){
    axios.get('http://localhost:8080/autorization',{
        params:{
            login:log.value,
            password:pas.value
        }
    })
        .then((response) => {

        if(response.data.role=='Администратор'){
            localStorage.setItem("id",response.data.id);
            window.location.href='../admin_menu/admin_menu.html';
        }
        else{
            localStorage.setItem("id",response.data.id);
            window.location.href='../user_menu/user_menu.html';
        }
        })
        .catch((error) => {
            visiableErrorAut(log,error.response.data)
        });
}

function visiableErrorAut(but,text){
    console.log(document.getElementsByClassName('autorization_block')[0].querySelector('span'));
    span=document.getElementsByClassName('autorization_block')[0].querySelector('span');
    span.style.display='flex'
    span.textContent=text;
    setTimeout(() => {
        span.style.display='none'
      }, "8000");
}