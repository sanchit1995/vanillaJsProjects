const main=document.getElementById('main'),
    addUserBtn=document.getElementById('add-user'),
    doubleBtn=document.getElementById('double'),
    showMillionariesBtn=document.getElementById('show-millionaries'),
    sortBtn=document.getElementById('sort');
    calculateWealthBtn=document.getElementById('calculate-wealth');

let data=[]
//To fetch the random users 
function getRandomUser(){
    fetch('https://randomuser.me/api').then(res=>res.json()).then(data=>{
    const user=data.results[0];
    const newUser={
        Name:`${user.name.first} ${user.name.last}`,
        Money:Math.floor(Math.random()*1000000)
    };
    console.log(newUser);
    addData(newUser);
    });
}
//Double the Money
function double(){
    data=data.map(user=>{
        return {...user,Money:user.Money*2};
    })
    updateDom();
}
//For the sort accoring to Money
function sortByRichest(){
    data=data.sort((a,b)=>{
        return b.Money-a.Money;
    });
    updateDom();
}
//To show the millionaries
function showMillionarie(){
    data=data.filter(user=>{
        return user.Money>1000000;
    });
    updateDom();
}
//To calculate entire Wealth
function entireWealth(){
    const wealth=data.reduce((acc,user)=> (acc+=user.Money),0);
    const wealthEl=document.createElement('div');
    wealthEl.innerHTML=`<h3>The total Wealth is <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}
//To add the person to array
function addData(obj){
    data.push(obj);
    updateDom();
}    
//To render the items on DOM
function updateDom(providedData=data){
    main.innerHTML=`<h2><strong>Person</strong>wealth</h2>`;
    providedData.forEach(items => {
       const element=document.createElement('div');
       element.classList.add('parent');
       element.innerHTML=`<strong>${items.Name}</strong>${formatMoney(items.Money)}`;
       main.appendChild(element); 
    });
//To format the wealth     
}    
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
//Event Listener  
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',double);
sortBtn.addEventListener('click',sortByRichest);
showMillionariesBtn.addEventListener('click',showMillionarie);
calculateWealthBtn.addEventListener('click',entireWealth);
