
var gapiEz = (function (global) {

    var _uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

    var _getGAPI = function (apiKey, callback) {
        if (global.gapi) {
            callback(global.gapi);
        } else {
            global[_uuid] = function () {
                gapi.client.setApiKey(apiKey);

                script.parentNode.removeChild(script);
                script = null;
                callback(global.gapi);
            };

            var script = document.createElement('script');
            script.src = "https://apis.google.com/js/client.js?onload=" + _uuid;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

    var _authorize = function (apiKey, clientId, scope, immediate) {
        return new Promise(function (resolve, reject) {
            _getGAPI(apiKey, function (gapi) {
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: scope,
                    immediate: immediate
                }, function (authResult) {
                    if (authResult.error) {
                        reject(authResult.error);
                    } else {
                        resolve();
                    }
                });
            });
        });
    };

    var _load = function (name, version) {
        return new Promise(function (resolve, reject) {
            if (global.gapi) {
                global.gapi.client.load(name, version).then(function () {
                    var api = global.gapi.client[name];
                    resolve(api);
                },
                reject);
            } else {
                reject('not authorized yet'); 
            }
        });
    };

    var _logout = function () {
        return new Promise(function (resolve, reject) {
            var el = document.createElement('iframe');
            el.src = "https://accounts.google.com/logout";
            el.onload = function () {
                el.parentNode.removeChild(el);
                el.onload = null;
                //el.onerror = null;
                el = null;
                resolve();
            };
            // TODO: is the following code is correct?
            /*
            el.onerror = function () {
                reject('logout failed');
            });
            */
            document.getElementsByTagName('head')[0].appendChild(el);
        });
    };

    return {
        authorize: _authorize,
        load: _load,
        logout: _logout
    };

}(window));
