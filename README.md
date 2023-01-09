## $http Service
## --- 1 ---
Calling HTTP service is very simple.
```
$http({
    method: "GET",
    url: "http://someurl",
    params: {param1: "value1"},
    ....
}).then(...);
```
The HTTP service is itself a function, so you can actually call it directly. It takes just one argument, a configuration object which Angular expects to have some pretty fine properties such as method, URL, and so on. It returns a promise so that's why you can invoke the familiar `.then` method.

The only required property of the configuration object is the __URL__. If the method property is not specified the HTTP method GET is assumed.

Another property worth taking a look at is the params property. That property can take an object whose property names become parameter names and their corresponding values become the values for those parameters.

` params: {param1: "value1"}` - resultant URL: `http://someurl?param1=value1`

The parameter values are automatically URL encoded. What that means: a URL is not allowed to have spaces and other special characters. If the parameter value your trying to pass to the server contains those special characters, the process of URL encoding replaces those special characters by replacing them with a percent sign followed by two hexidecimal digits. Spaces turn into plus signs.

The three properties - method, URL, and params - are certainly not the only properties that the configuration object can have. There's a lot more properties for more specific cases, and you can look them up in the Angular documentation that talks about the HTTP service.

## --- 2 ---
```
$http({
    url: "http://someurl"
}).then(
    function success(response){
        // do something with response.data
    },
    function error(response){
        // do something with error response
);
```
The arguments that you would pass into the then function are the usual arguments that you would pass into the then function when you deal with a promise. The first argument is a function value of a successful response, meaning a resolution of a promise. And the second value is an error response, meaning a rejection of a promise. Here these functions were named success and error but in practice you could keep them anonymous when you use them in line like this. Probably most used property of the response object will be the response data property. That's the property that holds the response body. Now if Angular detects that the response body contains JSON, it will automatically transform the response body into a JavaScript object using the JSON parser. The the same response object gets returned if an error occurs. However, its data property will probably contain some server-generated HTML page explaining the error message, so it's usually not as useful for our programmatic needs.

## --- 3 ---
### Avoid This Mistake
```
var message = "";

$http({
    url: "http://someurl"
}).then(function(response){
    message = response.data;
});

$scope.message = message;
```
If you look in the code, it starts with declaring a local variable called message as an empty string. Then we call the HTTP method providing some URL and then we resolve it, successfully resolve it, and set our local message variable to the response.data. Then we take the scope object and create a message property on it, initializing it to the value that the message holds. So what would you say is the value of the $scope.message?

If you guess an empty string you are correct, why is that? Well remember they were dealing within _asynchronous call_. The local variable message will not get set with the response that data until after the last line in slide executes. That last line will set the `$scope.message` to whatever the value of the local message variable is right now, which is an empty string.

### The Fix
So what's the fix? Well, it's actually quite simple. The proper implementation would be to set the `$scope.message` to the `response.data` directly in the function representing a successful resolution of the promise. The setting of the message on the scope service will then occur only when the data is returned, and the promise is resolved.

```
$http({
    url: "http://someurl"
}).then(function(response){
    $scope.message = response.data;
});
```
