function template2(imgSrc, foods) {
    return `<img class="img-food-category" src="${imgSrc}" alt="">
            <h3>${foods}</h3>`
}

function templateForViewAllFoods(foodname, foodtext, foodprice, index) {
    return `<div class="all-foods">
                <div class="text">
                    <h3>${foodname}</h3>
                    <span>${foodtext}</span>
                    <span>${foodprice} €</span>
                </div>
                <button class="button-in-foodmenu" name="${foodname}" value="${index}" onclick="renderBasketfoods(event); calculateQuantityShoppingCart(); changeOpacityOrderButton()">+</button>
            </div>`;
}

function templateForViewAllFoodsInBasket(id, foodname, amount, price, priceForView) {
    return `<span class="foodname-in-basket" id="${id}span">${foodname}</span>
            <div id="${id}div">
                <button class="button-basket" onclick="minusAmount(event); changeOpacityOrderButton()" value="${id}">-</button>
                <span id="amount${id}" value="${amount}">${amount}x</span>
                <button class="button-basket" onclick="plusAmount(event)" value="${id}">+</button>
                <span class="price-in-basket" id="price${id}" value="${price}">${priceForView} €</span>
                <button class="delete-button-basket" onclick="foodInBasketDelete(event); changeOpacityOrderButton()" value="${id}"></button>
            </div>
    `
}