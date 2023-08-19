function searchTable(inp, table){
    var phrase = inp;
    var table = table;
    var regPhrase = new RegExp(phrase.value, 'i');
    var flag = false;
    for (var i = 1; i < table.rows.length; i++) {
        flag = false;
        for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }

    }
}

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

  function registrationCinemaPage(){
    document.getElementById('cinema_all_registration').classList="cinema_all_registration open_header_page";
    document.getElementById('cinema_all').classList='cinema_all close_page';
  }

  function registrationAllPage(){
    document.getElementById('cinema_all_registration').classList="cinema_all_registration close_page";
    document.getElementById('cinema_all').classList='cinema_all open_header_page';
  }

  function changeChar(text){
    block=text.closest('.inp_block');
    icon=block.querySelector('i');
    if(500-text.value.length!=0){
      char_index=document.getElementById('char_index');
      char_index.textContent=500-text.value.length;
    }
    if(text.value.length!=0){
      block.classList="inp_block success";
      icon.classList="fa-solid fa-circle-check";
    }
    else{
      block.classList="inp_block error";
      icon.classList="fa-solid fa-circle-info";
    }
  }

  function block_account(id){
    axios.get('http://localhost:8080/admin_menu/block_account',{
        params:{
            id:id,
        }
    })
        .then((response) => {
            initUsers();
        })
        .catch((error) => {
        console.log(error);
        });
}

function take_admin(id){
  axios.get('http://localhost:8080/admin_menu/take_admin',{
      params:{
          id:id,
      }
  })
      .then((response) => {
          initUsers();
      })
      .catch((error) => {
      console.log(error);
      });
}

function take_user(id){
  axios.get('http://localhost:8080/admin_menu/take_user',{
      params:{
          id:id,
      }
  })
      .then((response) => {
          initUsers();
      })
      .catch((error) => {
      console.log(error);
      });
}

function unblock_account(id){
    axios.get('http://localhost:8080/admin_menu/unblock_account',{
        params:{
            id:id,
        }
    })
        .then((response) => {
            initUsers();
        })
        .catch((error) => {
        console.log(error);
        });
}

function remove_account(id){
  axios.delete('http://localhost:8080/admin_menu/remove_account',{
      params:{
          id:id,
      }
  })
      .then((response) => {
        initUsers();
      })
      .catch((error) => {
      console.log(error);
      });
}

function changeText(inp){
  block=inp.closest('.inp_block');
  icon=block.querySelector('i');
  if(inp.value===''){
    block.classList="inp_block error";
    icon.classList="fa-solid fa-circle-info";
  }
  else{
    block.classList="inp_block success";
    icon.classList="fa-solid fa-circle-check";
  }
}

function sortFilm(text){
  console.log(text);
  axios.get("http://localhost:8080/admin_menu/getFilm",{
    params:{
      type:text.value
    }
  })
  .then((response)=>{
    list_film=document.getElementById('list_cinema');
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
}