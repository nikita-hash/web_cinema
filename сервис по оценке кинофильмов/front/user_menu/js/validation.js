form = document.getElementById('settins_form');

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
        axios.put('http://localhost:8080/user_menu/update_settins',account)
        .then((response) => {
            appendAlert(response.data,"success")
        })
    }
})

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

  const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" style="position:absolute;top:10%; left: 2%; display:flex" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
      setTimeout(() => {
          alertPlaceholder.innerHTML=''
        }, "5000");
    }

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

function setError(inp){
    const block=inp.closest('.inp_block');
    block.classList="inp_block error";
}
function setSuccess(inp){
    const block=inp.closest('.inp_block');
    block.classList="inp_block success";
}
