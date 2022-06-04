//let credit_card,mail, phone;   
export class CreditCard extends HTMLElement{
 constructor(){
  super(); 
   this.defaultCard = "8380 2880 8028 8791 7435";
   this.attachShadow({mode:'open'});
   this.shadowRoot.append(CreditCard.template.content.cloneNode(true));
   this.wrapper = this.shadowRoot.querySelector('div');
   this.centralSlot = this.shadowRoot.querySelector('slot[name="center"]');        
   this.leftSlot = this.shadowRoot.querySelector('slot[name="left"]');                
   this.rightSlot = this.shadowRoot.querySelector('slot[name="right"]');
   this.centralSlot.onclick= (event) =>{event.target.style.border ="1px dotted #F1CDB3";};
   this.centralSlot.addEventListener('change',(event)=>{event.stopPropagation(); event.preventDefault();
    if (this.disabled) return;                    
    let custom_event = new CustomEvent('enterCard',{bubbles:false, detail:event.target});
    this.dispatchEvent(custom_event);                    
   });
   this.centralSlot.onkeydown =(event)=>{ let target = event.target; let shadow = '#ffffff';
    if  ( target.type && /text/i.test(target.type)) {
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
font-size: 15px; letter-spacing: 2px;                      
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
CreditCard.observedAttributes = ['disabled','placeholder','value','width','height','hidden'];        
CreditCard.template =document.createElement('template'); CreditCard.setHTML('text');
customElements.define('credit-card',CreditCard);

