/////************cards****//////

export class Card{
 constructor(img,name,caption = 'Learn more'){ 
     this.card = document.createElement('div'); this.card.classList.add('card');
     this.img = document.createElement('img'); 
     this.img.src = img; this.img.setAttribute('alt',name);
     this.p = document.createElement('p'); 
     this.p.classList.add('pet-name'); this.p.textContent =name;
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

