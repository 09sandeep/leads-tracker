let myLeads = [];
const inputEL = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("save-tab");

const leadsFromLocal = JSON.parse(localStorage.getItem("myLeads"));
if(leadsFromLocal){
    myLeads = leadsFromLocal;
    renderLeads(myLeads);
}

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    })
})
function renderLeads(leads){
    let listItems ="";
    for(let i = 0; i < leads.length; i++){
        listItems += `<li>
        <a target = '_blank' href='${leads}'> ${leads[i]}
        </a>
        </li>`;
    }
    ulEl.innerHTML = listItems;
}
delBtn.addEventListener("dblclick", () => {
    alert("you are about to delete all leads");
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
})
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEL.value);
    inputEL.value = '';
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
    console.log(localStorage.getItem("myLeads"));
})



