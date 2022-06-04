 ///////////-------mail---------//////////
 import {CreditCard} from './template-credit-card';
import mail_pic from '../icons/mail.png';
 export const mail = document.querySelector('credit-card.email');        
 mail.defaultCard = 'shelter-help@gmail.com';
 const  img = document.createElement('img');
 img.src = mail_pic; mail.leftSlot.append(img);  
 const input = document.createElement('input'); input.type = 'email'; input.classList.add('email');
 input.name = 'email'; mail.centralSlot.append(input);        
 mail.setAttribute('placeholder',mail.defaultCard);        
 mail.setAttribute('width','100%');
 mail.leftSlot.firstChild.style['background'] = 'transparent';
 mail.leftSlot.firstChild.style['transform'] = 'scale(.6)';
 mail.centralSlot.firstChild.style['background'] = 'transparent';
 mail.centralSlot.firstChild.style['color'] = '#F1CDB3';
 mail.wrapper.style['background'] = 'transparent';            
 mail.setAttribute('width','300px');
 mail.centralSlot.firstChild.value = mail.defaultCard;
