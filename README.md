gapi-ez
=======

JavaScript library for easy accessing to the [Google APIs Client Library for JavaScript](https://developers.google.com/api-client-library/javascript/)

Available methods
-----------------

All these methods return a `Promise` object.

 * [gapiEx.authorize(apiKey, cliendId, scope, immediate) -> token](#authorize)
 * [gapiEx.load(name, version) -> api](#load)
 * [gapiEx.logout()](#logout)

Sample
------

```HTML
<html>
<head>
</head>
<body>
    <input type="button" />
    <div id="message"/>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="gapi-ez.js"></script>
    <script>
        var apiKey = 'AIzaSyCsdJ24S9RTKBkpsaR5zrRGtF1PgoyweFw';
        var clientId = '445140905124-f5ga8cl6t3i2kngl8r7fo17vv062cs4u.apps.googleusercontent.com';
        var scope = ['https://www.googleapis.com/auth/calendar'];

        gapiEz.authorize(apiKey, clientId, scope, true).then(function () {
            $('input').val('logout').click(function () {
                gapiEz.logout().then(function () {
                    $('#message').text('logout');
                });
            });
        }, function () {
            $('input').val('login').click(function () {
                gapiEz.authorize(apiKey, clientId, scope, false).then(function () {
                    gapiEz.load('calendar', 'v3').then(function (api) {
                        api.calendarList.list().then(function (resp) {
                            var s = '<h1>Calendars:</h1>';
                            resp.result.items.forEach(function (item) {
                                s += '<p>' + item.summary + '</p>';
                            });
                            $('#message').html(s);
                        });
                    });
                });
            });
        });
    </script>
</body>
</html>
```

References
----------

<a name="authorize"/>
### gapiEx.authorize(apiKey, cliendId, scope, immediate) -> token

#### Arguments:

|    Name   |     Type     |         Description          |
| --------- | ------------ | ---------------------------- |
| apiKey    | string       | The application's API key    |
| cliendId  | string       | The application's client ID. |
| scope     | string/array | The auth scope or scopes     |
| immediate | boolean      | If true, then login uses "immediate mode", which means that the token is refreshed behind the scenes, and no UI is shown to the user. |

#### Result in Promise:

|  Name |  Type  |      Description       |
| ----- | ------ | ---------------------- |
| token | object | OAuth 2.0 Token Object |

<a name="load"/>
### gapiEx.load(name, version) -> api

#### Arguments:

|   Name  |  Type  |           Description           |
| ------- | ------ | ------------------------------- |
| name    | string | The name of the API to load.    |
| version | string | The version of the API to load. |

#### Result in Promise:

| Name |  Type  |    Description    |
| ---- | ------ | ----------------- |
| api  | object | Google API object |

<a name="logout"/>
### gapiEx.logout()

#### Arguments:

None.

#### Result in Promise:

None.
