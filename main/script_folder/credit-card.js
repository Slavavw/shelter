////////////------credit_card--------////////
import {CreditCard} from './template-credit-card';
import credit_pic from '../icons/credit-card.svg';

export const credit_card = document.querySelector('.credit-card');
let img = document.createElement('img'); img.src = credit_pic;
credit_card.leftSlot.append(img);
let input = document.createElement('input'); input.type = 'text'; input.classList.add('inpt_card');
input.maxLength = 20; credit_card.centralSlot.append(input);
credit_card.setAttribute('placeholder',credit_card.defaultCard);
credit_card.setAttribute('size','28');        
credit_card.setAttribute('width','340px');        
credit_card.leftSlot.firstChild.style['background'] = 'transparent';
credit_card.leftSlot.firstChild.style['transform'] = 'scale(.6)';
credit_card.centralSlot.firstChild.style['background'] = 'transparent';
credit_card.centralSlot.firstChild.style['color'] = '#F1CDB3';
credit_card.wrapper.style['background'] = 'transparent';            
credit_card.setAttribute('width','300px');
credit_card.centralSlot.firstChild.value = credit_card.defaultCard;

 
