
import './styles_folder/reset_style.css';
import './styles_folder/style.css';
import './styles_folder/about.css';
import './styles_folder/pets.css';
import './styles_folder/help.css';
import './styles_folder/donation.css';
import './styles_folder/footer.css';

import { Card } from './script_folder/animal-card';
import { credit_card } from './script_folder/credit-card';
import { mail } from './script_folder/mail-card';
import  { phone } from './script_folder/phone-card';

import katrine from './images/pets-katrine.png';
import jenifer from './images/pets-jennifer.png';
import woody from './images/pets-woody.png';

const slider = document.querySelector('.slider');        
let ar_card = Array.from({
  0:(new Card(katrine,'Katrin')).createCard(),
  1:(new Card(jenifer,'Jennifer')).createCard(),
  2:(new Card(woody,'Woody')).createCard(),            
  length:3
});   
slider.querySelector('.right').before( ...ar_card );

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

function handleCreditCard(event){
  let img = document.createElement('img'); img.src = './pets-jennifer.png';
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
  else { target.setAttribute('placeholder',target.value);}
  target.value ='';
  target.style.height = '30px'; target.style.fontSize = '18px'; 
  target.style.textShadow = 'none'; target.style.border ='none';
  target.style.color = '#b2b2b2';                    
} 