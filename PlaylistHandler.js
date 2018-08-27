(() => {
    const loadClient = (cb, apiKey) => {
        if (script.getAttribute('gapi_processed')) {
            console.log('client ready');
            window.gapi.load('client', () => {
                window.gapi.client.setApiKey(apiKey);
                window.gapi.client.load('youtube', 'v3', () => { cb() });
            });
        }
        else {
            console.log('Retrying in 100ms');
            setTimeout(() => loadClient(cb, apiKey), 100);
        }
    }

    const getPlaylist = (url, cb) => {
        const playlistId = url.split('=')[1];
        const request = buildApiRequest('GET',
            '/youtube/v3/playlistItems',
            {
                'maxResults': '50',
                'part': 'snippet,contentDetails',
                'playlistId': playlistId,
            });
        executeRequest(request, cb);
    }

    const executeRequest = (request, cb) => {
        request.execute(cb);
    }

    module.exports = { loadClient, getPlaylist }

    //Ignore from here...Changes never required

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
        console.log('script loaded');
    };
    document.body.appendChild(script);

    const buildApiRequest = (requestMethod, path, params, properties) => {
        params = removeEmptyParams(params);
        let request;
        if (properties) {
            const resource = createResource(properties);
            request = window.gapi.client.request({
                'body': resource,
                'method': requestMethod,
                'path': path,
                'params': params
            });
        } else {
            request = window.gapi.client.request({
                'method': requestMethod,
                'path': path,
                'params': params
            });
        }
        return request;
    }

    const removeEmptyParams = (params) => {
        for (var p in params) {
            if (!params[p] || params[p] === 'undefined' || params[p] === null) {
                delete params[p];
            }
        }
        return params;
    }

    const createResource = (properties) => {
        var normalizedProps = properties;
        for (var p in properties) {
            var value = properties[p];
            if (p && p.substr(-2, 2) === '[]') {
                var adjustedName = p.replace('[]', '');
                if (value) {
                    normalizedProps[adjustedName] = value.split(',');
                }
                delete normalizedProps[p];
            }
        }
    }
})();