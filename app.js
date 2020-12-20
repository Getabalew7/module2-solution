(function () {
    "use strict";
    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService)

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {

        var toBuy = this;
        toBuy.tobuyItems = ShoppingListCheckOffService.getToBuyItems();
        toBuy.boughtItems = function (itemIndex) {
            ShoppingListCheckOffService.toBuy(itemIndex);
        }
        toBuy.isToBuyItemEmpty = function () {
            return ShoppingListCheckOffService.isListToBuyEmpty();
        }

    }
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtItems = this;
        boughtItems.boughtItem = ShoppingListCheckOffService.getBoughtItems();
        boughtItems.isBoughtEmpty = function () {
            return ShoppingListCheckOffService.isBoughtItemsEmpty();
        }
    }
    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyItems = [{ name: "cookies", quantity: 10 }, // list of items to buy
        { name: "Apples", quantity: 5 },
        { name: "Mangoes", quantity: 8 },
        { name: "Bananas", quantity: 3 },
        { name: "Beer", quantity: 6 },
        { name: "Weyn", quantity: 3 }
        ];
        var boughtitems = [];// list of items we already bought

        service.toBuy = function (itemIndex) {
            var bought = toBuyItems[itemIndex]; // get already bought item
            toBuyItems.splice(itemIndex, 1); // remove the item we bought from the item list and
            boughtitems.push(bought); // push into already bought item list
        }

        service.getToBuyItems = function () {
            return toBuyItems; // return list of items to buy
        }
        service.getBoughtItems = function () {
            return boughtitems; // return list of items we already bought items
        }
        service.isListToBuyEmpty = function () {
            return toBuyItems[0] === undefined; // check if list of items to buy is empty
        }
        service.isBoughtItemsEmpty = function () {
            return boughtitems.length < 1; // check if bought items are empty
        }
    }


})();