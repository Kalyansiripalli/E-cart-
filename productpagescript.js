// we need to acces the ind varaiable from the local storage so that use can use that in the url to fectch a particula product and display it in the product page 
const ind=JSON.parse(localStorage.getItem("ind"));  
// using the ind variable we made the link
const link="https://fakestoreapi.com/products/"+ind;   
      
async function fun(){

    try{
    const requested_obj= await fetch(link);
    const requested_obj_json= await requested_obj.json();
    return requested_obj_json;
    }
    catch(err){
        console.log(err);
    }

}

fun().then((data) =>{

    // create a card
    // document.getElementsByTagName("body").style.backgroundColor = "LightGray";
    let card=document.createElement("div");
    const card_id="card"+data.id;
    card.id=card_id;
    document.getElementById("parent").appendChild(card);
    
    // add the title of the product
    const para = document.createElement("p");
    para.innerHTML=data.title;
    document.getElementById(card_id).appendChild(para);

    // append an image to the created card using card_id 
    var img = document.createElement("IMG");
    img.setAttribute("src", data.image);
    img.setAttribute("width", "400");
    img.setAttribute("height", "400");
    document.getElementById(card_id).appendChild(img);

    // display the price
    const price = document.createElement("h2");
    price.innerHTML="₹"+data.price;
    document.getElementById(card_id).appendChild(price);

    // displat the description
    const para2 = document.createElement("p");
    para2.innerHTML=data.description;
    document.getElementById(card_id).appendChild(para2);
    
    // Add an ADDTOCART button 
    const button= document.createElement("BUTTON");
    button.innerHTML="ADD TO CART";
    button.addEventListener("click", addtocart);
    document.getElementById(card_id).appendChild(button);
   
    function addtocart()
    {

        var arrayString = localStorage.getItem("cartelements");
        var arrayData = JSON.parse(arrayString);
        var arrayData = arrayString ? JSON.parse(arrayString) : [];
        
        if(arrayData.length==0)
        {
            data.cnt=1;
            arrayData.push(data);
            
            localStorage.setItem("cartelements", JSON.stringify(arrayData));
        }
        
        else
        {
            let count=0;
            for(var i=0; i<arrayData.length; i++)
            {
                if(data.id==arrayData[i].id){ // then the element we are trying to add is already present inside the array so we need to update the cnt variable and it should be reflected inside the local storage
                    arrayData[i].cnt=arrayData[i].cnt+1;
                    localStorage.setItem("cartelements", JSON.stringify(arrayData));
                    count++;
                    break;
                }
            }

            if(count===0){
                data.cnt=1;
                arrayData.push(data); 
                localStorage.setItem("cartelements", JSON.stringify(arrayData));
            }
        }
        button.innerHTML="ADDED TO CART";
    }   
});
document.getElementById("cart").addEventListener("click",gotocart);
function gotocart()
{
    document.location.href="http://127.0.0.1:5500/CART.HTML";
}
