# youtube-playlist-gapi
A simple script for parsing youtube playlist using GAPI with Javascript

>***Note***:- Get **API-KEY** from your google Project. If you don't have one, follow instructions from [here](https://developers.google.com/api-client-library/javascript/start/start-js#create-a-google-project).

```
import { loadClient, getPlaylist } from './PlaylistHandler';
const API_KEY = 'Your API key here'

loadClient(clientLoaded, API_KEY); //Waits until client is loaded and callback will be fired

const clientLoaded = () => {
    const url='Playlist Url here';
    getPlaylist(url,handleResponse); // handleResponse will be called with response data
}
const handleResponse = res => console.log(res);
```
