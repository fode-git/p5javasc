let objLinea = localStorage.getItem("obj");  
//productarrayLocalStorage = [];
let productarrayLocalStorage  = JSON.parse(objLinea);

/*la fonction permet d'afficher les produits dans le panier */
async function panier(){
    if(productarrayLocalStorage === null ){
    
        const titleCart = document.querySelector("h1").innerHTML = "Votre panier est vide !";

      
    } else{  
            let partiArticle = document.getElementById("cart__items");

        for(let p of productarrayLocalStorage){
            
          await  fetch ("http://localhost:3000/api/products/"+p.idKanap)

            .then(res => {
                if(res.ok){
                    return res.json();
            }   
            } )
             .then ( dataProduct =>{
        
            let zoneArticle = document.createElement("article");
            partiArticle.appendChild(zoneArticle);
            zoneArticle.className = "cart__item";
            zoneArticle.setAttribute("data-id",p.idKanap );
            zoneArticle.setAttribute("data-color",p.colorKanap);
 
            let productDivImg = document.createElement("div");
            zoneArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src =  dataProduct.imageUrl;
            productImg.alt = dataProduct.altTxt;
            
            let productDivContent = document.createElement("div");
            zoneArticle.appendChild(productDivContent);
            productDivContent.className = "cart__item__content";
        
            let productDivdescription = document.createElement("div");
            productDivdescription.className = "cart__item__content__description";
            productDivContent.appendChild(productDivdescription);

            let productName = document.createElement("h2");
            productDivdescription.appendChild(productName);
            productName.innerHTML = dataProduct.name;
    
            let productColor = document.createElement("p");
            productDivdescription.appendChild(productColor);
            productColor.innerHTML = p.colorKanap;

            let productPrice = document.createElement("p");
            productDivdescription.appendChild(productPrice);
            productPrice.innerHTML = dataProduct.price +" €";

            let productDivContentSettings = document.createElement("div");
            productDivContent.appendChild(productDivContentSettings);
            productDivContentSettings.className = "cart__item__content__settings";

            let productDivContentSettingsQuantity = document.createElement("div");
            productDivContentSettings.appendChild(productDivContentSettingsQuantity);
            productDivContentSettingsQuantity.className = "cart__item__content__settings__quantity";

            let productQty = document.createElement("p");
            productDivContentSettingsQuantity.appendChild(productQty);
            productQty.innerHTML = "Qté :";
            let productQuantityInput = document.createElement("input");
            productDivContentSettingsQuantity.appendChild(productQuantityInput);
            productQuantityInput.value =  p.quantityKanap;
            productQuantityInput.className = "itemQuantity";
            productQuantityInput.setAttribute("type", "number");
            productQuantityInput.setAttribute("min", "1");
            productQuantityInput.setAttribute("max", "100");
            productQuantityInput.setAttribute("name", "itemQuantity");

            let productDivContentSettingsDelete = document.createElement("div");
            productDivContentSettings.appendChild(productDivContentSettingsDelete);
            productDivContentSettingsDelete.className = "cart__item__content__settings__delete"

            let productDivdeleteItem = document.createElement("p");
            productDivContentSettingsDelete.appendChild(productDivdeleteItem);
            productDivdeleteItem.className = "deleteItem";
            productDivdeleteItem.innerHTML = "Supprimer";
          
            })
            .catch(function(err){
                console.log("testerre",err)
            })
        }
}}

/* la fonction permet d'afficher le quantité total des produits dans le panier */
function totalQt() {
       let ttQuantite =0;
         for(let p of productarrayLocalStorage){
            ttQuantite += parseInt(p.quantityKanap);
         }
        let totalQuantity = document.getElementById("totalQuantity");
        totalQuantity.innerHTML  = ttQuantite  ;
}
totalQt();

/* la fonction permet d'afficher le prix total des produits dans le panier */
function totalPrix(){  
let ttPrix = 0;
    for(let p of productarrayLocalStorage){  
        fetch ("http://localhost:3000/api/products/"+p.idKanap)
        .then(res => {
            if(res.ok){
                return res.json();
        }   
        })
         .then ( dataProduct =>{
            ttPrix += (parseInt(p.quantityKanap) * dataProduct.price);
            let totalPrix = document.querySelector("#totalPrice");
            totalPrix.innerHTML = ttPrix;
        }) 
    }   
}
totalPrix();

/* la fonction permet de modifier la quantité des produits dans le panier */
function modiffie() {
    let modifierQuantity = document.getElementsByClassName("itemQuantity");
            for (let input of modifierQuantity){
                input.addEventListener("change",(e) => { 
                    e.preventDefault;
                let noeudarticlesupp = e.target.closest('.cart__item');
                let dataId = noeudarticlesupp.dataset.id;
                let dataColor = noeudarticlesupp.dataset.color;
                let modifiqtt = e.target.value;
            
                let  resultaFind = productarrayLocalStorage.find(
                    (element) => element.idKanap ===  dataId  && element.colorKanap === dataColor);
                 resultaFind.quantityKanap = parseInt(modifiqtt);
                 location.reload();
                 let objLinea = JSON.stringify(productarrayLocalStorage);
                 localStorage.setItem("obj",objLinea);
                 ttPrix();
                 totalQt();
                 
               
                })
              
            }
}
modiffie();

/* la fonction permet de supprimer un produit du panier */
function Supprimer () {
    let btnDelete = document.getElementsByClassName('deleteItem');
    console.log("suppop",btnDelete);
    for(let button of btnDelete){ 
        button.addEventListener("click",(e) => { 
            e.preventDefault;
            let noeudarticlesupp = e.target.closest('.cart__item');
            let dataId = noeudarticlesupp.dataset.id;
            let dataColor = noeudarticlesupp.dataset.color;
            //productarrayLocalStorage = productarrayLocalStorage.filter((element) => element.id !== dataId && element.color !== dataColor);

            let  resultaFind = productarrayLocalStorage.findIndex(
            (element) =>  dataId === element.idKanap  && dataColor === element.colorKanap);
            productarrayLocalStorage.splice(resultaFind,1);
            noeudarticlesupp.remove();

            let objLinea = JSON.stringify(productarrayLocalStorage);
            localStorage.setItem("obj",objLinea);
            alert("votre article à été supprimer");
            location.reload();
            totalQt();
            ttPrix();
            
        })
    }
    if(productarrayLocalStorage.length === null || productarrayLocalStorage.length == 0 ){
        localStorage.clear();
    }
} 

window.onload = function () {Supprimer(); modiffie();}
panier ();

/* la fonction permet de verrifier le formulaire sur ça validité  */
function formulaire()
{   
      
    const firstName = document.getElementById('firstName');
    firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    const lastName = document.getElementById('lastName');
    lastName.addEventListener('change', function() {
        validLastName(this);
    });

    const address = document.getElementById('address');
    address.addEventListener('change', function() {
        validAddress(this);
    });

    const city = document.getElementById('city');
    city.addEventListener('change', function() {
        validCity(this);
    });

    const email = document.getElementById('email');
    email.addEventListener('change', function() {
        validEmail(this);
    });



    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    const verifLettre = /[a-zA-Z]$/;
    // /^[a-zA-Z]+$/;
    function validFirstName () {
        if (verifLettre.test(firstName.value))                                    
        { 
            firstNameErrorMsg.innerHTML = '';
            return true;
           // isValid = true; 
            }   
            else {
                firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
                }
        }  

    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    function validLastName () {
        if (verifLettre.test(lastName.value))                                    
        { 
            lastNameErrorMsg.innerHTML = '';
           return true; 
            }   
            else {
                lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
                }
        } 

    const addressErrorMsg = document.getElementById('addressErrorMsg');
    const verifAdress = /[0-9|a-zA-Z]$/;        
    function validAddress () {
        if (verifAdress.test(address.value))                                    
        { 
            addressErrorMsg.innerHTML = '';
            return true; 
          
            }   
            else {
                addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
                }
        } 

    const cityErrorMsg = document.getElementById('cityErrorMsg');
    function validCity () {
        if (verifLettre.test(city.value))                                    
        { 
            cityErrorMsg.innerHTML = '';
            return true; 
            }   
            else {
                cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
                }
        } 

  
    const emailErrorMsg = document.getElementById('emailErrorMsg');
    const verifEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    function  validEmail () {  
        if (verifEmail.test(email.value))         
        { 
        emailErrorMsg.innerHTML = '';
        return true; 
        }   
        else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            }
    
        }    
// return true; 
}
formulaire();


/* la fonction qui envoie les produits et le formulaire dans l' API */
function postForm() {
    if(formulaire = true){  
        let contact = {
            firstName : document.getElementById('firstName').value,
            lastName : document.getElementById('lastName').value,
            address : document.getElementById('address').value,
            city : document.getElementById('city').value,
            email : document.getElementById('email').value
        }

        let product = [];
        for (let i = 0; i<productarrayLocalStorage.length; i++) {
            product.push(productarrayLocalStorage[i].idKanap);
        }

        let formData = {
            contact : contact,
            products : product,
        }
        
        let options = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 
              'Content-Type': 'application/json',
            }
        }   

        fetch ("http://localhost:3000/api/products/order",options)
            .then(res => res.json()) 
            .then(data => {

            document.location.href = "confirmation.html?id="+ data.orderId;
        });
    }
    else{
        alert("veillez remplir le formulaire");
    }
}
    




const order = document.getElementById("order");
order.addEventListener("click",(e) => { 
    e.preventDefault();
    postForm();
    })
