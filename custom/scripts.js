// Cleave js input formatting 
$(document).ready(function () {

    // phone 1
    var cleave = new Cleave('.input-phone-1', {
        blocks: [3, 3, 3, 4],
        delimiters: [' (', ') ', '-'],
    });
    // phone 2
    var cleave = new Cleave('.input-phone-2', {
        blocks: [3, 3, 3, 4],
        delimiters: [' (', ') ', '-'],
    });
});


// cropper js 
function each(arr, callback) {
    var length = arr.length;
    var i;

    for (i = 0; i < length; i++) {
        callback.call(arr, arr[i], i, arr);
    }

    return arr;
}

window.addEventListener('DOMContentLoaded', function () {
    var image = document.querySelector('#image');
    var previews = document.querySelectorAll('.preview');
    var cropper = new Cropper(image, {
        aspectRatio: 3 / 4,
        ready: function () {
            var clone = this.cloneNode();

            clone.className = ''
            clone.style.cssText = (
                'display: block;' +
                'width: 100%;' +
                'min-width: 0;' +
                'min-height: 0;' +
                'max-width: none;' +
                'max-height: none;'
            );

            each(previews, function (elem) {
                elem.appendChild(clone.cloneNode());
            });
        },

        crop: function (e) {
            var data = e.detail;
            var cropper = this.cropper;
            var imageData = cropper.getImageData();
            var previewAspectRatio = data.width / data.height;

            each(previews, function (elem) {
                var previewImage = elem.getElementsByTagName('img').item(0);
                var previewWidth = elem.offsetWidth;
                var previewHeight = previewWidth / previewAspectRatio;
                var imageScaledRatio = data.width / previewWidth;

                elem.style.height = previewHeight + 'px';
                previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px';
                previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px';
                previewImage.style.marginLeft = -data.x / imageScaledRatio + 'px';
                previewImage.style.marginTop = -data.y / imageScaledRatio + 'px';
            });
        }
    });
});
