/* function pour ecouter les reponse de mon API*/
    fetch ("http://localhost:3000/api/products")
    .then(res => {
        if(res.ok){
            return res.json();
        }   
    } )
    .then ( data =>{
        console.log(data);
        afficherProduits(data);
    })
    .catch(function(err){
        document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    })

/*fonction pour afficher tous les produit de l' API*/
function afficherProduits (product){
   
        for( i = 0; i < product.length; i++){
        //let lesProduct of product
               let productLink = document.createElement("a");
               document.querySelector(".items").appendChild(productLink);
               productLink.href = `product.html?id=${product[i]._id}`;
   
               let zoneArticle = document.createElement("article");
                productLink.appendChild(zoneArticle);
   
               let productImg = document.createElement("img");
               zoneArticle.appendChild(productImg);
               productImg.src = product[i].imageUrl;
               productImg.alt = product[i].altTxt;
   
               let productName = document.createElement("h3");
               zoneArticle.appendChild(productName);
               productName.innerHTML = product[i].name;
               productName.className = "productName";
   
               let productDescription = document.createElement("p");
               zoneArticle.appendChild(productDescription);
               productDescription.innerHTML = product[i].description;
               productDescription.className ="productDescription";
           }
       
        }
        
    
      /*  partieArticle.innerHTML += `<a href="./product.html?_id=${produits._id}">
    <article>
      <img src="${produits.imageUrl}" alt="${produits.altTxt}">
      <h3 class="productName">${produits.name}</h3>
      <p class="productDescription">${produits.description}</p>
    </article>
  </a>`;
    }*/