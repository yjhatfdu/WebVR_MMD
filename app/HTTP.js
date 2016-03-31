/**
 * Created by yjh on 16/1/29.
 */
///<reference path='../lib/Promise.d.ts'/>
System.register([], function(exports_1) {
    var Request;
    function HTTP(url, method, config, postObject, type, onprogress) {
        if (method === void 0) { method = 'GET'; }
        if (config === void 0) { config = { headers: {}, params: {} }; }
        if (postObject === void 0) { postObject = null; }
        return new Promise(function (resolve, reject) {
            config = config || { headers: {}, params: {} };
            var request = new Request();
            request.open(url, method, config.params, config.headers, postObject, type, function (content) {
                resolve(content);
            }, function (err) {
                reject(err);
            }, onprogress);
        });
    }
    exports_1("HTTP", HTTP);
    function GET(url, config, type, onprogress) {
        if (config === void 0) { config = { headers: {}, params: {} }; }
        return HTTP(url, 'GET', config, null, type, onprogress);
    }
    exports_1("GET", GET);
    function POST(url, config, postObject, onprogress) {
        if (config === void 0) { config = { headers: {}, params: {} }; }
        if (postObject === void 0) { postObject = null; }
        return HTTP(url, 'POST', config, postObject, onprogress);
    }
    exports_1("POST", POST);
    return {
        setters:[],
        execute: function() {
            Request = (function () {
                function Request() {
                }
                Request.prototype.open = function (url, method, params, headers, postObject, type, onload, onerror, onprogress) {
                    if (method === void 0) { method = 'GET'; }
                    if (params === void 0) { params = {}; }
                    if (headers === void 0) { headers = {}; }
                    if (postObject === void 0) { postObject = null; }
                    if (onload === void 0) { onload = function (content) { }; }
                    if (onerror === void 0) { onerror = function (err) { }; }
                    if (onprogress === void 0) { onprogress = function (progress) { }; }
                    var x = new XMLHttpRequest();
                    var query = [];
                    for (var i in params) {
                        if (params.hasOwnProperty(i)) {
                            query.push(i + "=" + params[i]);
                        }
                    }
                    var queryStr = '';
                    if (query.length > 0) {
                        queryStr = '?' + query.join('&');
                    }
                    x.open(method, url + queryStr);
                    for (var i in headers) {
                        if (headers.hasOwnProperty(i)) {
                            x.setRequestHeader(i, headers[i]);
                        }
                    }
                    if (type) {
                        x.responseType = type;
                    }
                    x.onload = function () {
                        if (x.status >= 400) {
                            onerror(x.statusText);
                        }
                        else {
                            if (x.getResponseHeader('Content-Type') == 'application/json') {
                                onload(JSON.parse(x.responseText));
                            }
                            else {
                                onload(x.response);
                            }
                        }
                    };
                    x.onerror = function (e) {
                        onerror(x.statusText);
                    };
                    x.onprogress = function (e) {
                        onprogress(e.loaded / e.total);
                    };
                    x.send(postObject);
                };
                return Request;
            })();
            exports_1("Request", Request);
        }
    }
});
//before typescript support partial module, we should patch the module like this
//Network['HTTP']=HTTP;
//Network['GET']=GET;
//Network['POST']=POST;
//Network.GET('/index.html')
//    .then(function (res) {
//        console.log(res);
//        return Network.GET('/test.json')
//    }).then(function(res){
//    console.log(res)
//})
//    .catch(function (err) {
//        console.log(err)
//    });
//
//async function load(){
//    try{
//        var res = await Network.GET('index.html');
//        console.log(res);
//        var res2 = await Network.GET('test.json');
//        console.log(res2)
//    }catch (e){
//        console.log(e)
//    }
//} 
//# sourceMappingURL=HTTP.js.map