let dataProduct ;
/*function pour ecouter les reponse de mon API*/
const idProduct = new URL(window.location.href).searchParams.get("id");
fetch ("http://localhost:3000/api/products/" +idProduct)

.then(res => {
    if(res.ok){
        return res.json();
    }   
} )
.then ( data =>{
    console.log(data);
    dataProduct = data;
    afficherProduit(dataProduct);
2})
.catch(function(err){
    document.querySelector(".titles").innerHTML = "<section>erreur 404</section>";
})

/*la fonction qui a pour but d'afficher tous les produits de notre API*/
function afficherProduit (product){
  
    
                let img = document.createElement("img");
                let productImg = document.querySelector(".item__img");
                productImg.appendChild(img);
                img.src = product.imageUrl;
                img.alt = product.altTxt;

                let titleProduct = document.getElementById("title");
                titleProduct.innerHTML = product.name;

                let priceProduct = document.getElementById("price");
                priceProduct.innerHTML = product.price;
                
                let descriptionProduct = document.getElementById("description");
                descriptionProduct.innerHTML = product.description;

                let ColorsListe = document.getElementById("colors");

        for(i = 0; i < product.colors.length; i++){
                let option = document.createElement("option");
                option.value = product.colors[i];
                ColorsListe.appendChild(option);
                option.innerHTML = product.colors[i];
         }
}



let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", ajoutePanier);

/* la fonction a pour but de verrifier la color et id du produit avant de l'envoyé dans le panier  */
function ajoutePanier (product) {
    
    const colorsChoix = document.querySelector("#colors");
    const quantityChoix = document.querySelector("#quantity");
    //test 
   //console.log ("test", quantityChoix,  colorsChoix);

    if (colorsChoix.value != "" && quantityChoix.value > 0 && quantityChoix.value <=100 && quantityChoix.value != 0 ) 
    { 
       let objetJson = {
            idKanap : idProduct,
            colorKanap : colorsChoix.value,
            quantityKanap : quantityChoix.value
        };
    
        let objLinea = localStorage.getItem("obj");     
        let productarray  = [];
        productarray = JSON.parse(objLinea);
        //console.log ("test product",productarray)
        
        if (productarray != null ){

            const resultaFind = productarray.find(
                (element) => element.idKanap ===  idProduct && element.colorKanap === colorsChoix.value);
             //  console.log("test find", resultaFind);
                

                if (resultaFind ) {
                    console.log("resultafind product = " + resultaFind.quantityKanap );
                    console.log(" quantiteProduct= " + quantityChoix.value);
                    let totalQuantite = parseInt(quantityChoix.value) + parseInt(resultaFind.quantityKanap);
                    console.log("nouveauQuantite est egal a : " + totalQuantite);
                    resultaFind.quantityKanap  = totalQuantite;
                    objLinea = JSON.stringify( productarray );
                    localStorage.setItem("obj",objLinea);
                    console.log("productarray egal :");
                    console.log(productarray );
                    console.log("fin productarray");
                
                } else {
       
                    productarray.push(objetJson);
                  
                    objLinea = JSON.stringify (productarray );
                    localStorage.setItem("obj",objLinea);
                    console.log(productarray );

                    alert("Ajouté au panier ");
                }
               
        }
        else { 
                         
            productarray  = [];
            productarray.push(objetJson);

            objLinea = JSON.stringify(productarray );
            localStorage.setItem("obj",objLinea);
            console.log(productarray );
            alert("Ajouté au panier ");
        }
       
    }
   
}


         
