document.addEventListener('DOMContentLoaded', function () {


    var deck = document.getElementById('deck');

    var cards = [].slice.call(document.querySelectorAll('.card'))

    //reverse the card order
    for (var i = cards.length - 1; i >= 0; i--) {

        deck.appendChild(cards[i]);
    }


    var stack, config;
    var mobileDetector = new MobileDetect(window.navigator.userAgent);


    config = {
    };



    if (mobileDetector.mobile()) {
        config.minThrowOutDistance = 300;
        config.maxThrowOutDistance = 350;

        config.throwOutConfidence = function (offset, element) {
            return Math.min(Math.abs(offset) / element.offsetWidth * 2, 1);
        };

    } else {
        config.minThrowOutDistance = 500;
        config.maxThrowOutDistance = 550;

        config.throwOutConfidence = function (offset, element) {
            return Math.min(Math.abs(offset) / element.offsetWidth, 1);
        };
    }

    config.maxRotation = 10;
    stack = gajus.Swing.Stack(config);



    var cards = [];
    var cardIndex = 0;



    [].forEach.call(document.querySelectorAll('.card'), function (card) {

        stack.createCard(card);

        card.classList.add('in-deck');

        for (var i = 0; i < card.childNodes.length; i++) {

            if (card.childNodes[i].className == "card-contents") {

                (function () {

                    var cardContents = card.childNodes[i];

                    cards.unshift({
                        card: card,
                        cardContents: cardContents
                    });

                    card.addEventListener("mousedown", function () {
                        cardContents.classList.add('card-contents-visible');


                    });


                    card.addEventListener("touchstart", function () {
                        cardContents.classList.add('card-contents-visible');

                    });

                }());

            }
        }

    });

    stack.on('throwout', function (e) {

        e.target.classList.remove('in-deck');

        cards[cardIndex].cardContents.classList.add('card-contents-visible');

        if (cardIndex <= cards.length) {
            cardIndex++;
        }


    });

    stack.on('throwin', function (e) {
        e.target.classList.add('in-deck');

    });






});