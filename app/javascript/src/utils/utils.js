export function setServiceFormData(fileInputElement, service)  {
  let formData = new FormData();

  if (fileInputElement.files.length > 0) {
    for (let index = 0; index < fileInputElement.files.length; index++) {
      formData.append('service[images][]', fileInputElement.files[index]);
    };
  };

  formData.set('service[english_name]', service.english_name);
  formData.set('service[spanish_name]', service.spanish_name);
  formData.set('service[english_description]', service.english_description);
  formData.set('service[spanish_description]', service.spanish_description);
  formData.set('service[dimensions]', service.dimensions);

  return formData;
};

export function sortByServices(services) {
  let serviceList = services.slice(0);
  serviceList = serviceList.sort((a, b) => { return a.spanish_name < b.spanish_name ? -1 : 1 });
  return serviceList
};

export function sortByTags(services) {
  let serviceList = services.slice(0)
  serviceList = serviceList.sort((a, b) => {
    if (a.tags[0] === undefined) {
      return -1
    } 
    else if (b.tags[0] === undefined) {
      return 1
    }
    return a.tags[0].spanish_name < b.tags[0].spanish_name ? -1 : 1
  })
  return serviceList
};

export function retrieveImages(services, callback) {
  const imageArray = [];
  services.forEach(service => service.images.forEach(image => imageArray.push(image)));
  callback(imageArray);
}