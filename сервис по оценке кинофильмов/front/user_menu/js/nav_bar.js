function toolClick(tool,page){
    preTool=document.querySelector('.open_tool');
    if(preTool!=null){
        preTool.classList.remove("open_tool");
    }
    tool.classList.add("open_tool");
    actionPage(page);
}

function actionPage(page){
    var action= document.querySelector(".open_page");
    console.log(action);
    console.log(page)
    if(action!=null){
     action.classList.remove("open_page");
    }
     page.classList.add("open_page");
 }