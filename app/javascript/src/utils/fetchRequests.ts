//Functions
import { safeCredentials, safeCredentialsFormData, handleErrors } from "@utils/fetchHelper";

export function getRequest(
  link: string,
  callback: Function
) {
  fetch(link)
    .then(handleErrors)
    .then(data => callback(data))
    .catch(error => alert(error));
};

export function postRequest(
  link: string,
  body: {},
  callback: Function,
) {
  fetch(link, safeCredentials({
    method: "POST",
    body: JSON.stringify(body)
  }))
    .then(data => callback(data));
};

export function postFormRequest(
  link: string,
  body: FormData,
  callback: Function,
) {
  fetch(link, safeCredentialsFormData({
    method: "POST",
    body: body,
  }))
    .then(data => callback(data));
};

export function putRequest(
  link: string,
  body: {},
  callback: Function,
) {
  fetch(link, safeCredentials({
    method: "PUT",
    body: JSON.stringify(body)
  }))
    .then(data => callback(data));
};

export function putFormRequest(
  link: string,
  body: FormData,
  callback: Function,
) {
  fetch(link, safeCredentialsFormData({
    method: "PUT",
    body: body
  }))
    .then(data => callback(data));
};

export function deleteRequest(
  link: string,
  callback: Function,
) {
  fetch(link, safeCredentials({
    method: "DELETE"
  }))
    .then(handleErrors)
    .then(data => callback(data))
    .catch(error => alert(error));
};