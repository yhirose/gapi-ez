gapi-ez
=======

JavaScript library for easy accessing to the [Google APIs Client Library for JavaScript](https://developers.google.com/api-client-library/javascript/)

Usage
-----

```HTML
<script src="gapi-ez.js"></script>
```

`gapiEz` global object has the following methods:

 * [gapiEz.authorize(apiKey, cliendId, scope, immediate) -> token](#authorize)
 * [gapiEz.load(name, version) -> api](#load)
 * [gapiEz.logout()](#logout)

These methods return a `Promise` object instead of taking a callback function.

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
        var params = {
            apiKey: '[YOUR API KEY]',
            client_id: '[YOUR CLIENT ID]',
            scope: ['https://www.googleapis.com/auth/calendar']
        };

        params.immediate = true;
        gapiEz.authorize(params).then(function (token) {
            $('input').val('logout').click(function () {
                gapiEz.logout().then(function () {
                    $('#message').text('logout');
                });
            });
        }, function () {
            $('input').val('login').click(function () {
                params.immediate = false;
                gapiEz.authorize(params).then(function (token) {
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
<html>
```

References
----------

<a name="authorize"/>
### gapiEz.authorize(apiKey, cliendId, scope, immediate) -> token

#### Arguments:

|  Name  |  Type  |                  Description                   |
| ------ | ------ | ---------------------------------------------- |
| params | object | A key/value map of parameters for the request. |

##### `params` object:

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
### gapiEz.load(name, version) -> api

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
### gapiEz.logout()

#### Arguments:

None.

#### Result in Promise:

None.
