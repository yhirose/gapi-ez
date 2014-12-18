gapi-ez
=======

JavaScript library for easy accessing to the Google APIs Client Library for JavaScript

Usage
-----

```HTML
<html>
<head>
</head>
<body>
    <script src="gapi-ez.js"></script>
    <script>
        var apiKey = '[YOUR API KEY]';
        var clientId = '[YOUR CLIENT ID]';
        var scope = ['https://www.googleapis.com/auth/calendar'];

        gapiEz.authorize(apiKey, clientId, scope, true).then(function () {
            alert('already authorized.');
            gapiEz.logout().then(function () {
                alert('logout.');
                location.href = '/';
            });
        }, function () {
            alert('not authorized yet.');
            gapiEz.authorize(apiKey, clientId, scope, false).then(function () {
                alert('authorized!!');
                gapiEz.load('calendar', 'v3').then(function (api) {
                    api.calendarList.list().then(function (resp) {
                        resp.result.items.forEach(function (item) {
                            console.log('calendar name: ' + item.summary);
                        });
                    });
                });
            });
        });
    </script>
</body>
</html>
```
