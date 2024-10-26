let prices = [];
let allPrices = 0.00;
let priceSubtotal = "";
let priceTotal = 0.00;
let selectedFoodCategory = "";
let foodsInBasket = [];
let allFoods = [];
let priceForDelivery = 5.00;
let foodCategoryImgSrc = "";

function inet() {
    foodCategoryImgSrc = "assets/img/ai-generated-8841965_1280.jpg";
    allFoods = soup;
    renderFoodsForOnLoadBody();
    document.getElementById("button-food-category-soup").classList.add("button-food-category-high-lighting");
    changeOpacityOrderButton();
}

function myFunction() {
    let container = document.getElementById("container");
    container.classList.toggle("change");
}

function fillAllFoodsArray(event) {
    allFoods = event.target.value == "soup" ? soup
        : event.target.value == "padthai" ? padthai
            : event.target.value == "wokdish" ? wokdish
                : [];
}

function fillFoodCategoryImgSrc(event) {
    foodCategoryImgSrc = event.target.value == "soup" ? "assets/img/ai-generated-8841965_1280.jpg"
        : foodCategoryImgSrc = event.target.value == "padthai" ? "assets/img/pad-thai-921884_1280.jpg"
            : foodCategoryImgSrc = event.target.value == "wokdish" ? "assets/img/wok-963754_1280.jpg"
                : "";
}

function renderFoods(thisButton) {
    let foodBoxId = document.getElementById("food-box");
    let price = 0.00;
    foodBoxId.innerHTML = "";
    foodBoxId.innerHTML = template2(foodCategoryImgSrc, thisButton.innerHTML);
    selectedFoodCategory = thisButton.value;
    for (let index = 0; index < allFoods.length; index++) {
        price = changePriceForView(price, index);
        foodBoxId.innerHTML += templateForViewAllFoods(allFoods[index].food, allFoods[index].discription, price, index);
    }
}

function changePriceForView(priceForView, index, amount) {
    priceForView = allFoods[index].price;
    priceForView = amount != undefined ? priceForView * amount : priceForView;
    priceForView = priceForView.toFixed(2);
    priceForView = priceForView.replace(".", ",");
    return priceForView;
}

function calculatePrice() {
    allPrices = 0;
    for (let index = 0; index < prices.length; index++) {
        allPrices = allPrices + prices[index];
    }
}

function renderPrice() {
    let sum;
    let priceTotalId;
    for (let index = 1; index <= 2; index++) {
        sum = document.getElementById("sum" + index);
        sum.setAttribute("value", allPrices);
        priceTotalId = document.getElementById("price-total" + index);
        priceTotal = allPrices != 0.00 ? allPrices + priceForDelivery : allPrices;
        priceTotal = priceTotal.toFixed(2);
        priceTotal = priceTotal.replace(".", ",");
        priceTotalId.innerHTML = priceTotal + " €";
        priceSubtotal = allPrices.toFixed(2);
        priceSubtotal = priceSubtotal.replace(".", ",");
        sum.innerHTML = priceSubtotal + " €";
    }
}

function plusAmount(event) {
    let id = event.target.value;
    let buttonValue = event.target.innerHTML;
    let foodInBasket = foodsInBasket.find(elem => elem.id == id);
    renderBasketfoodsPlusMinusButton(foodInBasket, buttonValue);
    calculateQuantityShoppingCart();
}

function minusAmount(event) {
    let id = event.target.value;
    let buttonValue = event.target.innerHTML;
    let foodInBasket = foodsInBasket.find(elem => elem.id == id);
    foodInBasket.amount == 1 ? foodInBasketDelete(event)
        : renderBasketfoodsPlusMinusButton(foodInBasket, buttonValue);
    calculateQuantityShoppingCart();
}

function renderBasketfoods(event) {
    let foodBoxBasket = document.getElementById("food-box-basket");
    foodBoxBasket.innerHTML = "";
    let foodBoxBasketMobile = document.getElementById("food-box-basket-mobile");
    foodBoxBasketMobile.innerHTML = "";
    let price = allFoods[event.target.value].price;
    price = price * allFoods[event.target.value].amount;
    let priceForView;
    priceForView = changePriceForView(priceForView, event.target.value, allFoods[event.target.value].amount);
    findFoodNamePushInArrayOrPlusAmount(allFoods[event.target.value].id, event.target.name, price, price, allFoods[event.target.value].amount, priceForView);
    for (let i = 0; i < foodsInBasket.length; i++) {
        foodBoxBasket.innerHTML += templateForViewAllFoodsInBasket(foodsInBasket[i].id, foodsInBasket[i].food, foodsInBasket[i].amount, foodsInBasket[i].priceWithAmount, foodsInBasket[i].priceForView);
        foodBoxBasketMobile.innerHTML += templateForViewAllFoodsInBasket(foodsInBasket[i].id, foodsInBasket[i].food, foodsInBasket[i].amount, foodsInBasket[i].priceWithAmount, foodsInBasket[i].priceForView);
    }
    fillAllPricesAndRenderPrice();
}

function fillAllPricesAndRenderPrice() {
    allPrices = 0;
    for (let index = 0; index < foodsInBasket.length; index++) {
        allPrices = allPrices + foodsInBasket[index].priceWithAmount;
    }
    renderPrice();
}

function findFoodNamePushInArrayOrPlusAmount(id, foodName, priceWithAmount, pricePerUnit, amount, priceForView) {
    let findFoodName = foodsInBasket.find(elem => elem.food == foodName);
    switch (findFoodName == undefined) {
        case true:
            foodsInBasket.push({ "id": id, "food": foodName, "priceWithAmount": priceWithAmount, "pricePerUnit": pricePerUnit, "amount": amount, "priceForView": priceForView });
            break;
        default:
            findFoodName.amount < 20 ? findFoodName.amount++ : findFoodName.amount;
            let calculateNewPrice = findFoodName.pricePerUnit * findFoodName.amount;
            findFoodName.priceWithAmount = calculateNewPrice;
            let newPriceString = calculateNewPrice.toFixed(2);
            newPriceString = newPriceString.replace(".", ",");
            findFoodName.priceForView = newPriceString;
    }
}

function foodInBasketDelete(event) {
    let id = event.target.value;
    let findFoodId = foodsInBasket.findIndex(elem => elem.id == id);
    switch (findFoodId != -1) {
        case true:
            foodsInBasket.splice(findFoodId, 1);
            renderBasketfoodsDeleteButton();
            calculateQuantityShoppingCart();
            break;
    }
}

function toggleDNone() {
    document.getElementById("overlay-mobile-basket").classList.toggle("d-none");
}

function calculateQuantityShoppingCart() {
    let spanButtonMobileBasketId = document.getElementById("span-button-mobile-basket");
    let quantityShoppingCart = 0;
    switch (foodsInBasket != null) {
        case true:
            for (let index = 0; index < foodsInBasket.length; index++) {
                quantityShoppingCart = quantityShoppingCart + foodsInBasket[index].amount;
            }
            spanButtonMobileBasketId.innerHTML = quantityShoppingCart;
            break;
        default:
            spanButtonMobileBasketId.innerHTML = 0;
    }
}

function renderBasketfoodsPlusMinusButton(foodInBasket, buttonValue) {
    let foodBoxBasket = document.getElementById("food-box-basket");
    foodBoxBasket.innerHTML = "";
    let foodBoxBasketMobile = document.getElementById("food-box-basket-mobile");
    foodBoxBasketMobile.innerHTML = "";
    switch (buttonValue) {
        case "-":
            foodInBasket.amount > 1 ? foodInBasket.amount-- : foodInBasket.amount;
            break;
        case "+":
            foodInBasket.amount < 20 ? foodInBasket.amount++ : foodInBasket.amount;
            break;
    }
    calculateNewPrice(foodInBasket);
    for (let i = 0; i < foodsInBasket.length; i++) {
        foodBoxBasket.innerHTML += templateForViewAllFoodsInBasket(foodsInBasket[i].id, foodsInBasket[i].food, foodsInBasket[i].amount, foodsInBasket[i].priceWithAmount, foodsInBasket[i].priceForView);
        foodBoxBasketMobile.innerHTML += templateForViewAllFoodsInBasket(foodsInBasket[i].id, foodsInBasket[i].food, foodsInBasket[i].amount, foodsInBasket[i].priceWithAmount, foodsInBasket[i].priceForView);
    }
    fillAllPricesAndRenderPrice();
}

function calculateNewPrice(foodInBasket) {
    let calculateNewPrice = foodInBasket.pricePerUnit * foodInBasket.amount;
    foodInBasket.priceWithAmount = calculateNewPrice;
    let newPriceString = calculateNewPrice.toFixed(2);
    newPriceString = newPriceString.replace(".", ",");
    foodInBasket.priceForView = newPriceString;
}

function renderBasketfoodsDeleteButton() {
    let foodBoxBasket = document.getElementById("food-box-basket");
    foodBoxBasket.innerHTML = "";
    let foodBoxBasketMobile = document.getElementById("food-box-basket-mobile");
    foodBoxBasketMobile.innerHTML = "";
    for (let i = 0; i < foodsInBasket.length; i++) {
        foodBoxBasket.innerHTML += templateForViewAllFoodsInBasket(foodsInBasket[i].id, foodsInBasket[i].food, foodsInBasket[i].amount, foodsInBasket[i].priceWithAmount, foodsInBasket[i].priceForView);
        foodBoxBasketMobile.innerHTML += templateForViewAllFoodsInBasket(foodsInBasket[i].id, foodsInBasket[i].food, foodsInBasket[i].amount, foodsInBasket[i].priceWithAmount, foodsInBasket[i].priceForView);
    }
    fillAllPricesAndRenderPrice();
}

function scrollToTop() {
    document.getElementById("overlay-mobile-basket").scrollIntoView({ top: 0, left: 0, behavior: "smooth" });

}

function scrollToFoods() {
    window.scrollTo({ top: 450, left: 0, behavior: "smooth" });
}

function renderFoodsForOnLoadBody() {
    let foodBoxId = document.getElementById("food-box");
    let price = 0.00;
    foodBoxId.innerHTML = "";
    foodBoxId.innerHTML = template2(foodCategoryImgSrc, "Suppen");
    selectedFoodCategory = "soup";
    for (let index = 0; index < allFoods.length; index++) {
        price = changePriceForView(price, index);
        foodBoxId.innerHTML += templateForViewAllFoods(allFoods[index].food, allFoods[index].discription, price, index);
    }
}

function highLightingButton(event) {
    switch (event.target.value) {
        case "soup":
            document.getElementById("button-food-category-soup").classList.add("button-food-category-high-lighting");
            document.getElementById("button-food-category-padthai").classList.remove("button-food-category-high-lighting");
            document.getElementById("button-food-category-wokdish").classList.remove("button-food-category-high-lighting");
            break;
        case "padthai":
            document.getElementById("button-food-category-padthai").classList.add("button-food-category-high-lighting");
            document.getElementById("button-food-category-soup").classList.remove("button-food-category-high-lighting");
            document.getElementById("button-food-category-wokdish").classList.remove("button-food-category-high-lighting");
            break;
        case "wokdish":
            document.getElementById("button-food-category-wokdish").classList.add("button-food-category-high-lighting");
            document.getElementById("button-food-category-soup").classList.remove("button-food-category-high-lighting");
            document.getElementById("button-food-category-padthai").classList.remove("button-food-category-high-lighting");
            break;
    }
}

function changeOpacityOrderButton() {
    switch (foodsInBasket.length == 0) {
        case true:
            document.getElementById("button-order-basket").classList.add("button-order-basket-change");
            document.getElementById("button-order-basket").setAttribute("disabled", "true");
            document.getElementById("button-order-mobile-basket").classList.add("button-order-basket-change");
            document.getElementById("button-order-mobile-basket").setAttribute("disabled", "true");
            break;
        case false:
            document.getElementById("button-order-basket").classList.remove("button-order-basket-change");
            document.getElementById("button-order-basket").removeAttribute("disabled");
            document.getElementById("button-order-mobile-basket").classList.remove("button-order-basket-change");
            document.getElementById("button-order-mobile-basket").removeAttribute("disabled");
            break;
    }
}

function dNoneFoodBox() {
    document.getElementById("food-box").classList.toggle("d-none");
}

function togglePositionRelative() {
    document.getElementById("title-categorie-food-box").classList.toggle("pos-relative");
}

function deleteAllInBasket() {
    foodsInBasket = [];
    let foodBoxBasket = document.getElementById("food-box-basket");
    foodBoxBasket.innerHTML = "";
    let foodBoxBasketMobile = document.getElementById("food-box-basket-mobile");
    foodBoxBasketMobile.innerHTML = "";
    fillAllPricesAndRenderPrice();
    calculateQuantityShoppingCart();
    changeOpacityOrderButton();
}

function toggleTransformToView() {
    document.getElementById("overlay-order-complete").classList.toggle("translate-to-view");
    window.scroll({ top: 0, behavior: "smooth" });
}

function timerStart() {
    timer = setTimeout(toggleTransformToView, 5000);
}




