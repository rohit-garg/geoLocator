var geoLocator = {
    position: {lat: null, long: null}, //  storing position on retrival for later use
    config: {
        localStorageKey: 'posObj'
    },
    init: function (onSuccess, onError, force) {

        // if position is already stored in local storage and new geo look up is not forced
        if (!force && localStorage && localStorage.getItem(geoLocator.config.localStorageKey) != null) {
            geoLocator.position = JSON.parse(localStorage.getItem(geoLocator.config.localStorageKey));
            onSuccess.apply(this, [geoLocator.position]);
        }

        // get position when it is not stored in localstorage
        else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.defaultOnSuccess, this.defaultOnError);
                this.onSuccess = onSuccess;
                this.onError = onError;
            } else {
                console.log("Browser do not support geolocation.");
            }
        }

    },
    defaultOnSuccess: function (position) {
        // storing position 
        geoLocator.position = {lat: position.coords.latitude, long: position.coords.longitude};

        // store got position in localstorage
        if (localStorage) {
            localStorage.setItem(geoLocator.config.localStorageKey, JSON.stringify(geoLocator.position));
        }

        if (typeof (geoLocator.onSuccess) == "function") {
            geoLocator.onSuccess.apply(this, [geoLocator.position]);
        }
    },
    defaultOnError: function (PositionError) {

        console.log(PositionError.message);

        if (typeof (geoLocator.onError) == "function") {
            geoLocator.onError.apply(this, [PositionError]);
        }
    }
};



geoLocator.init(function (posObj) {
    console.log(posObj);
}
//, null ,true
);
