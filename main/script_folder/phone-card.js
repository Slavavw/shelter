////////////------phone--------////////
import {CreditCard} from './template-credit-card';
import phone_pic from '../icons/phone.png';
export const phone = document.querySelector('credit-card.phone');        
phone.defaultCard = '8(029)111 111 111';
const img = document.createElement('img');         
img.setAttribute('src',phone_pic);
phone.leftSlot.append(img);
const input = document.createElement('input'); input.type = 'tel'; input.classList.add('phone');
input.name = 'usrtel'; phone.centralSlot.append(input);
phone.setAttribute('placeholder',phone.defaultCard);        
phone.setAttribute('width','100%');        

 phone.leftSlot.firstChild.style['background'] = 'transparent';
 phone.leftSlot.firstChild.style['transform'] = 'scale(.6)';
 phone.centralSlot.firstChild.style['background'] = 'transparent';
 phone.centralSlot.firstChild.style['color'] = '#F1CDB3';
 phone.wrapper.style['background'] = 'transparent';            
 phone.setAttribute('width','300px');
 phone.centralSlot.firstChild.value = phone.defaultCard;

