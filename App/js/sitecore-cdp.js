/*************CDP JS ******************/
// Define the Boxever queue
var _boxeverq = _boxeverq || [];
var clientKey = "pqsrxehja3f17kpxeuvoare26qfmbcu0"; //partner sandbox :psfu6uh05hsr9c34rptlr06dn864cqrx ; alphagaming: pqsrxehja3f17kpxeuvoare26qfmbcu0
var apiTargetEndpoint = "https://api.boxever.com/v1.2";
var cookieDomain = "reliable-fifth-temper.glitch.me";
var clientVersion = "1.4.8";
var productItemId = "";
var referenceId = "";
var productName = "";
var confirmedOrderReferenceId = "";
$(".alert").hide();

// Define the Boxever settings
var _boxever_settings = {
    client_key: clientKey, // Replace with your client key
    target: apiTargetEndpoint, // Replace with your API target endpoint specific to your data center region
    cookie_domain: cookieDomain, // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
    javascriptLibraryVersion: clientVersion,
    pointOfSale: "vacation-demo",
    web_flow_target: "https://d35vb5cccm4xzp.cloudfront.net"
};
// Import the Boxever library asynchronously
(function () {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src =
        "https://d1mj578wat5n4o.cloudfront.net/boxever-" +
        clientVersion +
        ".min.js";
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
})();

function viewEvent() {
    //console.log("Successfully Called View Event");
    //Sending View Event by an anonymous function in the Boxever queue

    _boxeverq.push(function () {
        var viewEvent = {
            browser_id: Boxever.getID(),
            channel: getChannel(),
            type: "VIEW",
            language: "EN",
            currency: "USD",
            page: window.location.pathname,
            pos: _boxever_settings.pointOfSale,
            utm_source: "google",
            utm_medium: "cpc",
            utm_campaign: "spring_sale",
            visit: 1
        };
        //Add UTM params
        viewEvent = Boxever.addUTMParams(viewEvent);
        // Invoke event create
        // (<event msg>, <callback function>, <format>)
        Boxever.eventCreate(
            viewEvent,
            function (data) {
                $(".alert")
                    .html("View Event Successful -- >")
                    .append("<br/>" + JSON.stringify(data))
                    .show();
            },
            "json"
        );
    });
}

var identityData = [];

function signUpAndSendIdentity() {
    sendIdentity();
    $('#loginModal').modal('hide');

}

function sendIdentity() {
    //console.log("Successfully Called SendIdentity Event");

    var firstName = $('#visitorFirst').val().trim().toString();
    var lastName = $('#visitorLast').val().trim().toString();

    _boxeverq.push(function () {
        var identityEvent = {
            browser_id: Boxever.getID(),
            channel: getChannel(),
            type: "IDENTITY",
            language: "EN",
            currency: "USD",
            page: window.location.href,
            pos: _boxever_settings.pointOfSale,
            email: $('#visitorEmail').val().trim().toString(),//generateEmail(),
            title: getRandom(titles),
            firstname: firstName,
            middlename: "middle",
            lastname: lastName,
            gender: "male",
            dob: "1985-08-23T00:00",
            street: [getRandom(streetNumber), getRandom(streetName)],
            city: getRandom(cityName),
            country: getRandom(countryName),
            nationality: "Global Citizen",
            postal_code: "90006",
            identifiers: [
                {
                    provider: "email",
                    id: $('#visitorEmail').val().trim().toString()
                }
            ]
        };


        identityData = identityEvent;
        // Invoke event create
        // (<event msg>, <callback function>, <format>)
        Boxever.eventCreate(
            identityEvent,
            function (data) {
                $(".alert")
                    .html("Logged in Successfully -- >")
                    .append("<br/>" + JSON.stringify(data))
                    .show();
            },
            "json"
        );
    });
}

function forceClose() {
    console.log("Successfully Called forceClose Event");
    _boxeverq.push(function () {
        var closeSession = {
            type: "FORCE_CLOSE",
            channel: getChannel(),
            browser_id: Boxever.getID(),
            pos: _boxever_settings.pointOfSale,
            _bx_extended_message: "1",
            page: "/CDP-Demo-Home"
        };
        Boxever.eventCreate(
            closeSession,
            function (data) {
                $(".alert")
                    .html("Closed Session Successfully -- >")
                    .append("<br/>" + JSON.stringify(data))
                    .show();
            },
            "json"
        );
    });
}
function clearCart() {

    _boxeverq.push(function () {
        var closeSession = {
            type: "CLEAR_CART",
            channel: getChannel(),
            browser_id: Boxever.getID(),
            pos: _boxever_settings.pointOfSale,
            "currency": "USD",
            page: "/CDP-Demo-Home"
        };
        Boxever.eventCreate(
            closeSession,
            function (data) {
                $(".alert")
                    .html("Cleared cart Successfully -- >")
                    .append("<br/>" + JSON.stringify(data))
                    .show();
            },
            "json"
        );
    });
}

function addEventToGuest() {
    // console.log("Successfully Called addEventToGuest Event");

    _boxeverq.push(function () {
        var identityEvent = {
            browser_id: Boxever.getID(),
            channel: getChannel(),
            type: "ADD",
            language: "EN",
            currency: "USD",
            page: "product page",
            pos: _boxever_settings.pointOfSale,
            product: {
                type: "HT",
                item_id: "FLIGHT_1",
                name: "DUB-LHR Economy Flight",
                currency: "USD",
                price: 200,
                product_id: "DUB-LHR|Economy|EconomyPlus",
                origin: "DUB",
                destination: "LHR",
                flight_type: "OW",
                pax_type: "ADT",
                quantity: 1,
                flight_segment: [
                    {
                        origin: "DUB",
                        destination: "LHR",
                        departure_date_time: "2015-01-14T06:30",
                        arrival_date_time: "2015-01-14T07:50",
                        flight_number: "1000",
                        carrier: "SA",
                        fare_class: "Economy",
                        fare_family: "Economy Plus"
                    }
                ]
            }
        };
        //Add UTM params
        identityEvent = Boxever.addUTMParams(identityEvent);
        // Invoke event create
        // (<event msg>, <callback function>, <format>)
        Boxever.eventCreate(
            identityEvent,
            function (data) {
                $(".alert")
                    .html("Add event Successful -- >")
                    .append("<br/>" + JSON.stringify(data))
                    .show();
            },
            "json"
        );
    });
}

function oneClickCheckout() {
    addProductToCart();
    confirmOrder();
    checkoutOrder()
}

function addProductToCart() {
    //console.log("Successfully Called addProductToEvent Event");

    productName = $(".fw-bolder").data('product-name');
    var productPrice = $(".fw-bolder").data('product-value');
    var productType = "PROD";
    productItemId = productType + "_" + Math.floor(Math.random() * 1000000);
    var productId = productType + "_" + Math.floor(Math.random() * 1000000);
    referenceId = "Vacation_" + productId;

    _boxeverq.push(function () {
        var addEvent = {
            browser_id: Boxever.getID(),
            channel: getChannel(),
            type: "ADD",
            language: "EN",
            currency: "USD",
            page: "Order",
            pos: _boxever_settings.pointOfSale,
            product: {
                type: productType,
                item_id: productItemId,
                name: productName,
                orderedAt: new Date().toString(),
                quantity: 1,
                price: productPrice,
                productId: productId,
                currencyCode: "USD",
                originalPrice: productPrice,
                originalCurrencyCode: "USD",
                referenceId: referenceId
            }
        };
        //Add UTM params
        addEvent = Boxever.addUTMParams(addEvent);
        // Invoke event create
        // (<event msg>, <callback function>, <format>)
        var cardCount = eval($(".badge").html());

        Boxever.eventCreate(
            addEvent,
            function (data) {
                $(".alert")
                    .html("Added " + productName + " to your Cart Successfully -- >")
                    .append("<br/>" + JSON.stringify(data))
                    .show();
                cardCount += 1;
                $(".badge").html(cardCount);
            },
            "json"
        );
    });
}

function confirmOrder() {
    //console.log("Successfully Called confirmOrder Event");

    _boxeverq.push(function () {
        var confirmEvent = {
            browser_id: Boxever.getID(),
            channel: getChannel(),
            type: "CONFIRM",
            language: "EN",
            currency: "USD",
            page: "product page",
            pos: _boxever_settings.pointOfSale,
            product: [
                {
                    item_id: productItemId
                }
                /*,
                {
                  item_id: "FLIGHT_1"
                }*/
            ]
        };
        //Add UTM params
        confirmEvent = Boxever.addUTMParams(confirmEvent);
        // Invoke event create
        // (<event msg>, <callback function>, <format>)
        Boxever.eventCreate(
            confirmEvent,
            function (data) {
                $(".alert")
                    .html("Confirmed " + productName + " -- >")
                    .append("<br/>" + JSON.stringify(data))
                    .show();
            },
            "json"
        );
    });
}

function checkoutOrder() {
    // console.log("Successfully Called checkoutOrder Event");

    _boxeverq.push(function () {
        var checkoutEvent = {
            browser_id: Boxever.getID(),
            channel: getChannel(),
            type: "CHECKOUT",
            language: "EN",
            currency: "USD",
            page: "product page",
            pos: _boxever_settings.pointOfSale,
            reference_id: referenceId,
            status: "PURCHASED"
        };
        //Add UTM params
        checkoutEvent = Boxever.addUTMParams(checkoutEvent);
        // Invoke event create
        // (<event msg>, <callback function>, <format>)
        Boxever.eventCreate(
            checkoutEvent,
            function (data) {
                $(".alert")
                    .html(
                        "You have Purchased " + productName + ". Enjoy Your product -- >"
                    )
                    .append("<br/>" + JSON.stringify(data))
                    .show();
            },
            "json"
        );
    });
}
/*-------------------------------DAY 2------------------------------------------------- */

function sendCustomFeedback(feedbackValue) {
    _boxeverq.push(function () {
        var viewEvent = {
            browser_id: Boxever.getID(),
            channel: getChannel(),
            type: "FEEDBACKRATING",
            language: "EN",
            currency: "USD",
            page: "/Day2.html",
            pos: _boxever_settings.pointOfSale,
            rating: feedbackValue
        };
        //Add UTM params
        viewEvent = Boxever.addUTMParams(viewEvent);
        // Invoke event create
        // (<event msg>, <callback function>, <format>)
        Boxever.eventCreate(
            viewEvent,
            function (data) {
                var message =
                    feedbackValue > 3
                        ? "Thank you for submitting rating of " + feedbackValue
                        : "Please let us know how can we make it better than " +
                        feedbackValue +
                        " by writing us at contact@woodpecker.com";
                $(".alert")
                    .html(message)
                    .show();
            },
            "json"
        );
    });
}

/*-------------------------------DAY 3------------------------------------------------- */

function getGuestData() {
    var guestData = {
        guestType: "customer",
        email: identityData.email,
        title: "Mr",
        firstname: identityData.firstname,
        lastname: identityData.lastname,
        gender: "male",
        dateOfBirth: "1996-10-28T00:00:00.000Z",
        passportNumber: "PZ4A9565",
        phoneNumbers: ["+3531234567", "+353123456"],
        street: [getRandom(streetNumber), getRandom(streetName)],
        city: getRandom(cityName),
        country: getRandom(countryName),
        postCode: getRandom(zipCode),
        state: getRandom(stateName),
        nationality: "Global Citizen",
        subscriptions: [
            {
                name: "Epam_Demo_Email_Subscribers",
                channel: "EMAIL",
                pointOfSale: "EPAM_MADHAV_POS",
                status: "SUBSCRIBED",
                effectiveDate: "2021-11-01T16:17:16.000Z"
            }
        ]
    };
    return JSON.stringify(guestData);
}
function getGuestDataExtension() {
    var data = JSON.stringify({
        key: "customerDetails",
        propensity: getRandomDecimal(),
        deviceType: getRandom(deviceType)
    });
    return data;
}

function createGuestWithDataExtension() {
    //Create XHR Call
    sendIdentity(true);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var jsonResponseData = JSON.parse(this.responseText);
            console.log(jsonResponseData["ref"]);
            updateGuestDataExtension(jsonResponseData["ref"]);
        }
    });

    xhr.open("POST", "https://api.boxever.com/v2/guests");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader(
        "authorization",
        "Basic cHNmdTZ1aDA1aHNyOWMzNHJwdGxyMDZkbjg2NGNxcng6dXo5aDgwM2VydHV2eGNiOWpoMmN1MDV0ODdhdDg1bmw="
    );
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "feaa2e3b-ae9e-4d17-4646-30c5d2e6dc88");

    xhr.send(getGuestData());
}

function updateGuestDataExtension(refNumber) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open(
        "POST",
        "https://api.boxever.com/v2/guests/" + refNumber + "/extExt"
    );
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader(
        "authorization",
        "Basic cHNmdTZ1aDA1aHNyOWMzNHJwdGxyMDZkbjg2NGNxcng6dXo5aDgwM2VydHV2eGNiOWpoMmN1MDV0ODdhdDg1bmw="
    );
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "c3bab4bf-24a8-12fb-6d56-94ac32b1eeff");

    xhr.send(getGuestDataExtension());
}

/// Call Events below
viewEvent();
//sendIdentity();
//addEventToGuest();
//forceClose();
//addProductToCart();
//confirmOrder();
//checkoutOrder();
