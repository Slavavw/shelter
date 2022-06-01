let credit_card,mail, phone;       
class CreditCard extends HTMLElement{
 constructor(){
  super(); 
   this.defaultCard = "8380 2880 8028 8791 7435";
   this.attachShadow({mode:'open'});
   this.shadowRoot.append(CreditCard.template.content.cloneNode(true));
   this.wrapper = this.shadowRoot.querySelector('div');
   this.centralSlot = this.shadowRoot.querySelector('slot[name="center"]');        
   this.leftSlot = this.shadowRoot.querySelector('slot[name="left"]');                
   this.rightSlot = this.shadowRoot.querySelector('slot[name="right"]');
   this.centralSlot.onclick= (event) =>{
   event.target.style.border ="1px dotted #F1CDB3";
 };
  this.centralSlot.addEventListener('change',(event)=>{
  event.stopPropagation(); event.preventDefault();
  if (this.disabled) return;                    
  let custom_event = new CustomEvent('enterCard',{bubbles:false, detail:event.target});
  this.dispatchEvent(custom_event);                    
  });
  this.centralSlot.onkeydown =(event)=>{
  let target = event.target; let shadow = '#ffffff';
  if  ( target.type && /text/i.test(target.type))  {
  if ( !(/[0-9]/.test(event.key)) ) {
  target.placeholder = 'input only number';
  event.preventDefault(); 
  return;
  }
  shadow ='#5B483A';                        
  }
  target.style.height = '50px'; target.style.fontSize = '25px'; 
  target.style.textShadow = `-3px -3px 5px ${shadow}`;
target.style.color = 'red'; target.style.fontWeight = '700';

}
}            
attributeChangedCallback(name,oldValue,newValue){
if(name == 'disabled') {this.centralSlot.disabled = newValue !==null;}
else if (name =='hidden'){ this.centralSlot.style.hidden = newValue;
this.leftSlot.hidden = newValue; this.rightSlot.hidden = newValue;
}
else if( (name == 'width') || name == 'height'  ){
if ( /^auto$/i.test(newValue)) {
let r1 = this.centralSlot.getBoundingClientRect(), 
r2 = this.leftSlot.getBoundingClientRect(), 
r3 = this.rightSlot.getBoundingClientRect();
newValue = [r1.width,r2.width,r3.width].reduce((x,y)=>x+y,10);
}
this.wrapper.style[name] = newValue;
}
else {
this.centralSlot.firstChild[name] = newValue;
}
}
get placeholder(){return this.getAttribute('placeholder')};            
 get value(){return this.getAttribute('value')};
get disabled(){return this.hasAttribute('disabled')};
get hidden(){return this.hasAttribute('hidden')};
get width(){return this.getAttribute('width')};
get height(){return this.getAttribute('height')};            

set placeholder(value){this.setAttribute('placeholder',value)};            
set value(text){ this.setAttribute('value',text)};
set disabled(value){ 
if (value) this.setAttribute('disabled',"");
else this.removeAttribute('disabled')
}    
set hidden(value){
if (value) this.setAttribute('hidden',"");
else this.removeAttribute('hidden')
}
set width(value){ this.setAttribute('width'.newValue);}
set height(value){ this.setAttribute('height'.newValue);}            

static setHTML(type){
CreditCard.template.innerHTML = `
<style>
div { display: flex; 
flex-flow: row nowrap; 
justify-content: left; align-items: left;
}
slot {user-select:none; cusor:default;}
slot[name='center'] * {
font-family: 'merriweather', Georgia, sans-serif;
background: #F1CDB3; 
font-size: 18px; letter-spacing: 2px;                      
width: 100%; height:100%;
border: none;// 1px dotted #F1CDB3;
border-radius: 10px;
}                    
</style>
<div>        
<slot name = "left"></slot>
<slot name="center"></slot>
<slot name ='right'></slot>
 </div>`
 }
}
        //  color: #b2b2b2;
CreditCard.observedAttributes = ['disabled','placeholder','value','width','height','hidden'];        
CreditCard.template =document.createElement('template'); CreditCard.setHTML('text');
customElements.define('credit-card',CreditCard);
////////////------credit_card--------////////
credit_card = document.querySelector('.credit-card');        
let img = document.createElement('img'); img.setAttribute('src','../assets/icons/credit-card.svg');
credit_card.leftSlot.append(img);
let input = document.createElement('input'); input.type = 'text'; input.classList.add('inpt_card');
input.maxLength = 20; credit_card.centralSlot.append(input);
credit_card.setAttribute('placeholder',credit_card.defaultCard);
credit_card.setAttribute('size','28');        
credit_card.setAttribute('width','340px');        
function handleCreditCard(event){
let target = event.detail; 
if(  !/email|phone/i.test(target.type) ){
if (! (/[0-9]{20}/.test(target.value))) {
alert('Must be 20th number');
target.setAttribute('placeholder',this.defaultCard);
}
else{                
target.setAttribute('placeholder',target.value.match(/(?<el>[0-9]{4})/gi).join(' '));
}
}
else {
target.setAttribute('placeholder',target.value);
}
target.value ='';
target.style.height = '30px'; target.style.fontSize = '18px'; 
target.style.textShadow = 'none'; target.style.border ='none';
target.style.color = '#b2b2b2';                    
}        
 ///////////-------mail---------//////////       
mail = document.querySelector('credit-card.email');        
mail.defaultCard = 'shelter-help@gmail.com';
img = document.createElement('img');         
img.setAttribute('src','../assets/icons/mail.png');
mail.leftSlot.append(img);  
input = document.createElement('input'); input.type = 'email'; input.classList.add('email');
input.name = 'email'; mail.centralSlot.append(input);        
mail.setAttribute('placeholder',mail.defaultCard);        
mail.setAttribute('width','100%');
////////////------phone--------////////
phone = document.querySelector('credit-card.phone');        
phone.defaultCard = '8(029)111 111 111';
img = document.createElement('img');         
img.setAttribute('src','../assets/icons/phone.png');
phone.leftSlot.append(img);
input = document.createElement('input'); input.type = 'tel'; input.classList.add('phone');
input.name = 'usrtel'; phone.centralSlot.append(input);
phone.setAttribute('placeholder',phone.defaultCard);        
phone.setAttribute('width','100%');        
let ar_el = [credit_card,mail,phone];
ar_el.map( el=>el.addEventListener('enterCard',handleCreditCard ));
ar_el.shift();
ar_el.map((element) =>{
            element.leftSlot.firstChild.style['background'] = 'transparent';
            element.leftSlot.firstChild.style['transform'] = 'scale(.6)';
            element.centralSlot.firstChild.style['background'] = 'transparent';
            element.centralSlot.firstChild.style['color'] = '#F1CDB3';
            element.wrapper.style['background'] = 'transparent';            
            element.setAttribute('width','300px');
            element.centralSlot.firstChild.value = element.defaultCard;
       });

       /////************cards****//////
       class Card{
           constructor(img,name,caption = 'Learn more'){ 
               this.card = document.createElement('div'); this.card.classList.add('card');
               this.img = document.createElement('img'); 
               this.img.setAttribute('src','../assets/images/'.concat(img));
               this.img.setAttribute('alt',name);
               this.p = document.createElement('p'); 
               this.p.classList.add('pet-name'); 
               this.p.textContent =name;
               this.btn = document.createElement('button');
               this.btn.classList.add('btn_card');
               this.btn.textContent = caption;
               this.btn.onclick = (event)=>{
                   let url = new URL(document.location);
                   url.searchParams.set('pet',name);
                   document.location = url.href;
               }
           }
           createCard(){               
               let template = document.createElement('template');
                template.content.append(this.card);
                template.content.firstChild.append (this.img,this.p,this.btn);                
                return template.content;
           }        
        }

        const slider = document.querySelector('.slider');        
        let ar_card = Array.from({
            0:(new Card('pets-katrine.png','Katrin')).createCard(),
            1:(new Card('pets-jennifer.png','Jennifer')).createCard(),
            2:(new Card('pets-woody.png','Woody')).createCard(),            
            length:3
        });        
        slider.querySelector('.right').before( ...ar_card );        

            