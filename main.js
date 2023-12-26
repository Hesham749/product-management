let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let mood = 'create';
let temp ;
// get total
function getTotal() {
    if (price.value != "") {
        // we put + before the value to change it from sting to number
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a20d00";
    }
}
// creat product
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}
submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    if(newProduct.title !='' && newProduct.price != '' && newProduct.category != '' && newProduct.count < 100){


        if(mood ==='create'){
            if (newProduct.count > 1) {
                for (i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
    
        }else{
            submit.innerHTML= 'Create';
            dataProduct[temp]= newProduct;
            mood = 'create'
            count.style.display='block'
    
        }
        clearData();
    }

    localStorage.setItem("product", JSON.stringify(dataProduct));
    
    showData();
};
// clear data
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    total.style.backgroundColor = "#a20d00";
}
// read data

function showData() {
    let table = "";
    for (i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button id="update" onclick = 'update(${i})'>update</button></td>
        <td><button id="delete" onclick = 'del(${i})'>delete</button></td>
    </tr>
        `;
    }
    tbody.innerHTML = table;
    let deleteAll = document.getElementById("deleteAll");
    if (dataProduct.length > 0) {
        deleteAll.innerHTML = `
    <td><button onclick = 'clearAll()'>Delete All (${dataProduct.length})</button></td>
    `;
    } else {
        deleteAll.innerHTML = "";
    }
}
showData();
// delete product
function del(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}
// delete all
function clearAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}
// count


// update
function update(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal()
    count.style.display = 'none'
    category.value = dataProduct[i].category;
    submit.innerHTML = 'update'
    temp = i ; 
    mood = 'update'
}

// search
let searchMood = 'title'
function GetSearchMood(id){
    if(id == 'searchByTitle'){
        searchMood = 'title'
    }else{
        searchMood = 'category'
        

    }
    search.placeholder = 'search By ' + searchMood;
    search.focus()
    search.value = '';
    showData()
}

function searchItem(value){
    let table ;
    for(let i = 0 ; i< dataProduct.length ; i++){
        if(searchMood == 'title'){
            if(dataProduct[i].title.includes(value)){
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button id="update" onclick = 'update(${i})'>update</button></td>
                <td><button id="delete" onclick = 'del(${i})'>delete</button></td>
                </tr>`;
            }
        }
        else{if(dataProduct[i].category.includes(value)){
            table += `
            <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" onclick = 'update(${i})'>update</button></td>
            <td><button id="delete" onclick = 'del(${i})'>delete</button></td>
            </tr>`;
        }

        }
        tbody.innerHTML = table;
    }
}

// clean data