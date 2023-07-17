function displayCartElements(){
    // get the cartelements from local server convert it into array of objects by using json.parse and then store it in a variable
    let cartelements=JSON.parse(localStorage.getItem("cartelements"));
    // clear the everything which is peresent previously inside the page , everytime you call the diplaycartelements
    document.getElementById("parent").innerHTML="";

    cartelements.forEach((object,ind1)=>{
    // create a seperate card for seperate products and give it id,classname using ind1 and category
    let card=document.createElement("div");
    card.className=object.category;
    const card_id="card"+ind1;
    card.id=card_id;
    document.getElementById("parent").appendChild(card);
    
    card.style.backgroundColor = "#7FFFD4";

    // enter the title of the product
    const para = document.createElement("p");
    para.innerHTML=object.title;
    document.getElementById(card_id).appendChild(para);

    // insert the image inside each card
    var img = document.createElement("IMG");
    img.setAttribute("src", object.image);
    img.setAttribute("width", "200");
    img.setAttribute("height", "200");
    document.getElementById(card_id).appendChild(img);

    document.getElementById(card_id).appendChild(document.createElement("br"));

    //mention quantity
    const Quantity= document.createElement("p");
    Quantity.innerHTML="Quantity :" + object.cnt;
    const Quantityid="quaitity"+ind1;
    Quantity.id=Quantityid;
    document.getElementById(card_id).appendChild(Quantity);

    document.getElementById(card_id).appendChild(document.createElement("br"));

    

    //create a increase and decrease button

    const IncButton= document.createElement("input");
    IncButton.setAttribute("type", "BUTTON");
    IncButton.setAttribute("value", "+");
    const IncButtonId="+"+ind1;
    IncButton.setAttribute("id",IncButtonId);
    document.getElementById(card_id).appendChild(IncButton);

    const DecButton= document.createElement("input");
    DecButton.setAttribute("type", "BUTTON");
    DecButton.setAttribute("value", "-");
    const DecButtonId="-"+ind1;
    DecButton.setAttribute("id", DecButtonId);
    document.getElementById(card_id).appendChild(DecButton);

    document.getElementById(IncButtonId).addEventListener("click",() => IncQuantity(cartelements,ind1));
    document.getElementById(DecButtonId).addEventListener("click",() => DecQuantity(cartelements,ind1));
    
    })

}

function IncQuantity(cartelements,ind){
    let count = cartelements[ind].cnt+1;
    cartelements[ind].cnt=count;
    localStorage.setItem("cartelements",JSON.stringify(cartelements));
    displayCartElements();
}

function DecQuantity(cartelements,ind){
    let count = cartelements[ind].cnt-1;
    if(count >=0)
        cartelements[ind].cnt=count;
    localStorage.setItem("cartelements",JSON.stringify(cartelements));
    displayCartElements();
}


displayCartElements();

























/**
 * Page Load -> Local Storage READ (function) -> Display;
 * Increase -> Local Storage Update -> function call (start inner HTML clear);
 */



