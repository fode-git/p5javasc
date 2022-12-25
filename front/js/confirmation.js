const id = new URL(window.location.href).searchParams.get("id");


console.log("id",id);
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;
localStorage.clear();