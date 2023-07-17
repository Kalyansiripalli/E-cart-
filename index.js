let productslist=[];

async function fun(){
    try{
        const requested_obj= await fetch("https://fakestoreapi.com/products");
        const requested_obj_json= await requested_obj.json();
        return requested_obj_json;
    }
    catch(err){
        console.log(err);
    }
}

fun().then((data) =>{
    localStorage.setItem("ProductsList",JSON.stringify(data));
    productslist=JSON.parse(localStorage.getItem("ProductsList"));
    display(productslist);
})

function display(DisplayList){
    console.log(DisplayList);
    document.getElementById("parent").innerHTML=" ";

    localStorage.setItem("DisplayList",JSON.stringify(DisplayList));

    DisplayList.forEach((object, ind1)=>{
        // create a seperate card for seperate products and give it id,classname using ind1 and category 
        let card=document.createElement("div");
        card.className=object.category;
        const card_id="card"+ind1;
        card.id=card_id;
        document.getElementById("parent").appendChild(card);
        card.style.backgroundColor="#20B2AA";
        
        

        // enter the title of the product
        const para = document.createElement("p");
        const para_id="para"+object.id
        para.id=para_id;
        para.innerHTML=object.title;
        document.getElementById(card_id).appendChild(para);
        para.style.marginLeft="20%";
        para.style.marginRight="20%"
        // document.getElementById(para_id).style.paddingLeft="10px";

        // insert the image inside each card
        var img = document.createElement("IMG");
        img.setAttribute("src", object.image); 
        img.setAttribute("width", 100);
        img.setAttribute("height", 100); 
        document.getElementById(card_id).appendChild(img);
        img.style.marginLeft="20%";
        
        document.getElementById(card_id).appendChild(document.createElement("br"));

        // better display price also

        const heading = document.createElement("h3");
        heading.innerHTML="₹:"+object.price;
        document.getElementById(card_id).appendChild(heading);
        heading.style.marginLeft="20%";
        
        
        
        // create know more button
        const button= document.createElement("BUTTON");
        button.innerHTML="KNOW MORE";
        document.getElementById(card_id).appendChild(button);
        button.style.marginLeft="20%";

        button.addEventListener("click", knowmore)
        
        function knowmore()
        {
            // before you redirect to any page update the current id (ind1+1) of the card into local storage so that you can use it redirected page
            localStorage.setItem("ind",JSON.stringify(object.id));
            document.location.href="http://127.0.0.1:5500/productpage.html";
        }   
        
    })
}

function LowToHigh(productslist){

    let compare = (a, b) => {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        return 0;
    }

    productslist.sort(compare);
    localStorage.setItem("ProductsList",JSON.stringify(productslist));
    productslist=JSON.parse(localStorage.getItem("ProductsList"));
    display(productslist);
}


function HighToLow(productslist){

    let compare = (a, b) => {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        return 0;
    }

    productslist.sort(compare);
    productslist.reverse();
    localStorage.setItem("ProductsList",JSON.stringify(productslist));
    productslist=JSON.parse(localStorage.getItem("ProductsList"));
    display(productslist);
}

function filter(val1,val2,productslist)
{
    document.getElementById("parent").innerHTML=" ";
    const filteredArray = productslist.filter(obj => obj.price >= val1 && obj.price <= val2);
    display(filteredArray);

    document.getElementById("PRICE1").addEventListener("click",()=>LowToHigh(filteredArray));
    document.getElementById("PRICE2").addEventListener("click",()=>HighToLow(filteredArray));

    let p1=document.getElementById("MinPrice");
    let p2=document.getElementById("MaxPrice");

    document.getElementById("filter").addEventListener("click",()=>filter(p1.value,p2.value,productslist));
    document.getElementById("cart").addEventListener("click",gotocart);

}



document.getElementById("PRICE1").addEventListener("click",()=>LowToHigh(productslist));
document.getElementById("PRICE2").addEventListener("click",()=>HighToLow(productslist));

let p1=document.getElementById("MinPrice");
let p2=document.getElementById("MaxPrice");

document.getElementById("filter").addEventListener("click",()=>filter(p1.value,p2.value,productslist));

document.getElementById("cart").addEventListener("click",gotocart);

function gotocart()
{
    document.location.href="http://127.0.0.1:5500/CART.HTML";
}

