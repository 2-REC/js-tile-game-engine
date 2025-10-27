/* assetmanager.js */

export class AssetManager {

    tile_set_image;

    //constructor?

    requestJSON(url, callback) {
        const request = new XMLHttpRequest();
        request.addEventListener("load", function(event) {
            callback(JSON.parse(this.responseText));
        }, { once:true });

        request.open("GET", url);
        request.send();
    }

    requestImage(url, callback) {
        const image = new Image();
        image.addEventListener("load", function(event) {
            callback(image);
        }, { once:true });
        image.src = url;
    }

}
