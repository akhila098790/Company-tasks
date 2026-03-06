let role = localStorage.getItem("role");

if (!role) {
    window.location.href = "login.html";
}

if(role !== "admin"){
document.getElementById("adminPanel").style.display="none";
}

let products = [

{ id:1,name:"Silk Saree",price:80,category:"sarees",image:"https://tse1.explicit.bing.net/th/id/OIP.Apb80uXmxfee2a7BWyV0EAHaKL?rs=1&pid=ImgDetMain&o=7&rm=3"},
{ id:2,name:"Cotton Saree",price:40,category:"sarees",image:"https://sootisyahi.com/cdn/shop/files/twilight-harmony-hand-block-mul-cotton-saree-718230.jpg?v=1724717076&width=1000"},
{ id:3,name:"Designer Saree",price:95,category:"sarees",image:"https://th.bing.com/th/id/R.561c38b08effd1dd858e280fe96d8a8d?rik=KZz3UdLtSyDXnQ&riu=http%3a%2f%2ftamarindweddings.com%2fblog%2fwp-content%2fuploads%2f2016%2f02%2f5-112.jpg&ehk=VZRryA1DEqH3%2fX8DJdubv2VXcs739gxrMaWsWjoJ6Nw%3d&risl=&pid=ImgRaw&r=0"},
{ id:4,name:"Wedding Saree",price:120,category:"sarees",image:"https://i.pinimg.com/736x/8d/ca/8f/8dca8fac3f8e8abc7724d53521060a05.jpg"},
{ id:5,name:"Banarasi Saree",price:100,category:"sarees",image:"https://tse1.mm.bing.net/th/id/OIP.3F3BxMYG8E2eKYYPi51J-AHaLH?rs=1&pid=ImgDetMain&o=7&rm=3"},

{ id:6,name:"Party Dress",price:70,category:"dresses",image:"https://tse1.mm.bing.net/th/id/OIP.q8k2yVlk602wpnYb-DEciQHaLJ?rs=1&pid=ImgDetMain&o=7&rm=3"},
{ id:7,name:"Summer Dress",price:45,category:"dresses",image:"https://m.media-amazon.com/images/I/81MyEudgSwL._AC_UY1000_.jpg"},
{ id:8,name:"Evening Dress",price:90,category:"dresses",image:"https://tse1.mm.bing.net/th/id/OIP.JrjSefJsAG41dtB7IzhdaQHaKn?rs=1&pid=ImgDetMain&o=7&rm=3"},
{ id:9,name:"Casual Dress",price:35,category:"dresses",image:"https://tse4.mm.bing.net/th/id/OIP.qguEy8djQq7LdFlixFMnpAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"},
{ id:10,name:"Long Gown",price:110,category:"dresses",image:"https://tse1.explicit.bing.net/th/id/OIP.-CYU4u1uytwRlLobGicYmwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3"},

{ id:11,name:"Formal Shirt",price:30,category:"shirts",image:"https://media.landmarkshops.in/cdn-cgi/image/h=739,w=499,q=85,fit=cover/lifestyle/1000014355541-Purple-Mauve-1000014355541_01-2100.jpg"},
{ id:12,name:"Cotton Shirt",price:25,category:"shirts",image:"https://www.fairindigo.com/cdn/shop/products/BG_OF_05286_petal_pink_20a18ffd-e8e6-40ff-b5d3-71eab066cf9b_2400x.jpg?v=1710099655"},
{ id:13,name:"Office Shirt",price:35,category:"shirts",image:"https://tse3.mm.bing.net/th/id/OIP.i3a9boULRhoSx5diwbKNkgHaJo?rs=1&pid=ImgDetMain&o=7&rm=3"},
{ id:14,name:"Casual Shirt",price:28,category:"shirts",image:"https://m.media-amazon.com/images/I/71mxFouU1iL._UL1500_.jpg"},
{ id:15,name:"Linen Shirt",price:40,category:"shirts",image:"https://tse3.mm.bing.net/th/id/OIP.T5diwXMZWIr88FaLKx9bJQHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3"},

{ id:16,name:"HTML Book",price:20,category:"books",image:"https://th.bing.com/th/id/R.83ed14121cc41e528dff8a41be8c19f4?rik=DfBNTf33RpZWpg&riu=http%3a%2f%2fwww.developerdrive.com%2fwp-content%2fuploads%2f2013%2f02%2fShowCover.jpg&ehk=9%2fNOYvurS17KpdMgYq1dUYvnbvdwwFeE8EIjYUAZc8A%3d&risl=&pid=ImgRaw&r=0"},
{ id:17,name:"CSS Book",price:25,category:"books",image:"https://th.bing.com/th/id/R.e3f094bdc4cf3bd326c53977d3ad8c88?rik=7TxQZyzHddUYeA&riu=http%3a%2f%2fwww.peachpit.com%2fShowCover.aspx%3fisbn%3d0321858476&ehk=fCNg%2b%2bJbKLLE0YSbAdoRW2pgGzCmqpCPAhbTFs65Aq8%3d&risl=&pid=ImgRaw&r=0"},
{ id:18,name:"JavaScript Book",price:30,category:"books",image:"https://tse4.mm.bing.net/th/id/OIP.R88Oy7Y3YoHhDEp7fj052wAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"},
{ id:19,name:"Python Book",price:35,category:"books",image:"https://tse4.mm.bing.net/th/id/OIP.tDv9sabD2m1_BRZKE04e4AHaJf?rs=1&pid=ImgDetMain&o=7&rm=3"},
{ id:20,name:"Java Book",price:40,category:"books",image:"https://tse2.mm.bing.net/th/id/OIP.hKVoOV4D5DHmRX3zADbSWgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3"},

{ id:21,name:"Flower Vase",price:20,category:"decor",image:"https://cdn1.igp.com/f_auto,q_auto,t_pnopt12prodlp/products/p-bouquet-of-pink-lilies-in-square-vase-6-stems--121688-m.jpg"},
{ id:22,name:"Wall Clock",price:35,category:"decor",image:"https://www.jaipurcraftonline.com/cdn/shop/products/71IV6fbNWvL._SL1280.jpg?v=1675226343"},
{ id:23,name:"Table Lamp",price:45,category:"decor",image:"https://m.media-amazon.com/images/I/71xaR3qz7TL._AC_SL1500_.jpg"},
{ id:24,name:"Photo Frame",price:15,category:"decor",image:"https://m.media-amazon.com/images/I/61tft9H0SWL._AC_SL1500_.jpg"},
{ id:25,name:"Wall Art",price:50,category:"decor",image:"https://i.etsystatic.com/35163217/r/il/9ff9f6/5208241039/il_794xN.5208241039_7wnb.jpg"}

];

let cart=[];

function displayProducts(list){

let div=document.getElementById("products");
div.innerHTML="";

list.forEach(p=>{

div.innerHTML+=`
<div class="product">

<img src="${p.image}">

<h3>${p.name}</h3>

<p>Price: $${p.price}</p>

<button onclick="addToCart(${p.id})">Add to Cart</button>

</div>
`;

});

}

function filterProducts(cat){

let filtered=products.filter(p=>p.category===cat);

displayProducts(filtered);

}

function showAll(){

displayProducts(products);

}

function addToCart(id){

let product=products.find(p=>p.id===id);

cart.push(product);

displayCart();

}

function displayCart(){

let cartList=document.getElementById("cart");

cartList.innerHTML="";

cart.forEach(item=>{

cartList.innerHTML+=`<li>${item.name} - $${item.price}</li>`;

});

}

function addProduct(){

let name=document.getElementById("pname").value;
let price=document.getElementById("pprice").value;
let category=document.getElementById("pcategory").value;
let image=document.getElementById("pimage").value;

let newProduct={
id:products.length+1,
name:name,
price:price,
category:category,
image:image
};

products.push(newProduct);

displayProducts(products);

alert("Product Added");

}

displayProducts(products);