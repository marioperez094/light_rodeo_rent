export function errorObject(error) {
  const parseError = JSON.parse(error.message)
  if (typeof parseError === 'string') {
    return JSON.parse(error.message);
  };


  const errorArray = Object.keys(parseError).map((errorName) => {
    const formattedName = errorName.split('_').join(' ')
    return `The ${formattedName} ${parseError[errorName].join(', ')}`
  })

  return errorArray.join('. ');
};