const form=document.querySelector("#form");
let sumar=1;
const g=document.querySelector(".container1");
addEventCleat();

if(form){
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        const f=Object.fromEntries(new FormData(e.target))
        const datos=Object.keys(f).map((key)=>f[key]);
        g.innerHTML="";
        for(let i=0,inputs=0;i<datos.length;i+=3,inputs++){
          for(let j=0;j<4;j++){
            //console.log(datos[i],datos[i+1],datos[i+2])
            const rep=genertionHTML(datos[i],j,Boolean(datos[i+2]),Number(datos[i+1]),inputs+1);
            g.append(rep.rep);
          }
        }
      })
}
const plusInput=document.querySelector('.plusInputButton');
const resetInput=document.querySelector('.resetInputButton');
function addEventCleat(){
  const list=document.querySelectorAll(".clearInputButton");
  for(let i=0;i<list.length;i++){
    if(!list[i].classList.hasOwnProperty('activeEvent')){
      list[i].classList.add('activeEvent');
      list[i].addEventListener('click',(e)=>{
        e.preventDefault();
        const list=document.querySelectorAll(`.cInput${e.target.id.split('button')[1]}`);
        if(list){
          for(let i=0;i<list.length;i++){
            list[i].remove();
          }
        }
        //console.log(list)
      })
    }
  }
}
plusInput.addEventListener("click",(e)=>{
  e.preventDefault();
  const addinput=document.querySelector(".inputsCharacter");
  const div=document.createElement("div");
  div.innerHTML=`
    <hr/>
    <label for="inpMan">input character:</label>
    <input class="character" type="text" name="characters${(sumar+1)}" id="characters${(sumar+1)}"> <br>
    <label for="inpMan">input radio:</label>
    <input class="radio" type="number" name="radio${(sumar+1)}" min="1"><br>
    <label for="inpMan">input:</label>
    <input type="radio" name="input-order${(sumar+1)}" value="true" checked>
    <label for="contactChoice1">top</label>
    <input type="radio" name="input-order${(sumar+1)}" value="fase">
    <label for="contactChoice2">botton</label>
    <button class="clearInputButton" item='item${(sumar+1)}' id='button${(sumar+1)}'>
     clear input
    </button>`;
  div.classList.add(`inputCharacter-${(sumar+1)}`,'item-i');
  addinput.appendChild(div);
  sumar++;
  addEventCleat();
  if(!resetInput.classList.hasOwnProperty('active')){
    resetInput.classList.add('active')
  }
})
function cambio(){
  resetInput.classList.toggle('active')
}
resetInput.addEventListener('click',(e)=>{
  e.preventDefault();
  const resetInput=document.querySelector(`.inputCharacter-${(sumar)}`);
  resetInput.remove();
  sumar--;
  const total=(document.querySelectorAll('.item-i').length)
  if(total==0) cambio();
})

function genertionHTML(character,pos,ban,radio,inputs){
  const auxArry=[[1,1],[-1,-1],[-1,1],[1,-1]];
  const angulosA=[180,360,180,0];
  const ar=[-1,-1,1,1];
  const angulosB=[180,360,0,180];
  let x=1*auxArry[pos][0];
  let y=1*auxArry[pos][1];
  let cuadrante=(ban)?angulosA[pos]:angulosB[pos];
  let arg=ar[pos];

    let circle={
      gra:90/character.length,
      int:radio/character.length
    }
    let framen=document.createDocumentFragment();
    let valoresX=[],valoresY=[];
    for(let i=0,grados=circle.gra;i<character.length;i++,grados+=circle.gra){
      const valueY=Math.abs(Math.cos(grados)*radio);
      const valueX=Math.abs(Math.sin(grados)*radio);
      valoresX.push(valueX);
      valoresY.push(valueY);
    }
    valoresY=valoresY.sort((a,b)=>a - b)
    valoresX=(valoresX.sort((a,b)=>a - b)).reverse();
    for(let i=0,interval=circle.int,grados=cuadrante;
            i<character.length;
            i++,interval+=circle.int,grados+=circle.gra){
            
      const valueY=valoresY[i];
      const valueX=valoresX[i];
      const p=document.createElement('p');
      p.textContent=character[i];
      p.style.transform='translate3d('+(valueX*(x))+'px, '+(valueY*(y))+'px ,'+0+'px) rotate('+(90*arg-grados*arg)+'deg)';
      p.classList.add('colorItem'); 
      p.classList.add(`cInput${inputs}`);
      framen.appendChild(p);
    }  
    return {type:true,rep:framen,tag:''}
}



//para el titulo
const A=document.querySelector(".containerTitleA");
for(let i=0;i<4;i++){
  const rep=genertionHTML('?¿ ?¿',i,true,15);
  A.append(rep.rep);
}
const B=document.querySelector(".containerTitleB");
for(let i=0;i<4;i++){
  const rep=genertionHTML('¿? ¿?',i,true,15);
  B.append(rep.rep);
}
/*
for(let i=0;i<4;i++){
  const rep=genertionHTML('  ¿? ¿? ¿? ¿?  ',i,true,180);
  b.append(rep.rep);
}

for(let i=0;i<4;i++){
  const rep=genertionHTML('{{ {{ << {{ }} >> }} }}',i,false,120);
  b.append(rep.rep);
}

for(let i=0;i<4;i++){
  const rep=genertionHTML('../../../ ../../../',i,true,90);
  b.append(rep.rep);
}


for(let i=0;i<4;i++){
  const rep=genertionHTML(' X X X X X ',i,true,60);
  b.append(rep.rep);
}

for(let i=0;i<4;i++){
  const rep=genertionHTML('> < >  < > <',i,false,30);
  b.append(rep.rep);
}
*/


