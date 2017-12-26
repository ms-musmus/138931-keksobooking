'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooserElement = document.querySelector('#avatar');
  var avatarPreviewElement = document.querySelector('.notice__preview img');
  var photoFileChooserElement = document.querySelector('#images');
  var photoPreviewElement = document.querySelector('.form__photo-container .upload');

  var checkFileType = function (fileName) {
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    return matches;
  };

  var avatarFileChangeHandler = function () {
    var file = avatarFileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var avatarLoadHandler = function () {
      avatarPreviewElement.src = reader.result;
    };

    if (checkFileType(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', avatarLoadHandler);

      reader.readAsDataURL(file);
    }
  };

  var photoFileChangeHandler = function () {

    var file = photoFileChooserElement.files[0];

    var photoLoadHandler = function () {
      var photo = document.createElement('img');
      photo.src = reader.result;
      photo.className = 'form__photo-img';
      photoPreviewElement.appendChild(photo);
    };

    var fileName = file.name.toLowerCase();

    if (checkFileType(fileName)) {
      var reader = new FileReader();
      reader.addEventListener('load', photoLoadHandler);

      reader.readAsDataURL(file);
    }

  };

  avatarFileChooserElement.addEventListener('change', avatarFileChangeHandler);
  photoFileChooserElement.addEventListener('change', photoFileChangeHandler);

})();
