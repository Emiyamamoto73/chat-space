json.array! @users do |user|
  json.id users.group_users.user_id
  json.name users.name
  json.email users.email
  # binding.pry
end
