json.authenticated true

json.user do
  json.id @user.id
  json.first_name @user.first_name
  json.last_name @user.last_name
end