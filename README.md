# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

# chat-space
### Userテーブル
#User_groupテーブルとのアソシエーション
has_many :groups ,through: :users_group
has_many :users_group
#Comment テーブルのアソシエーション
has_many :comments

|column|type   |index|null  |unique|

|name  |string |true |false  |false|

### User_groupテーブル(中間テーブル)
belongs_to :user
belongs_to :group

|column     |type   |index|null  |unique|foreign_key|
|-----------|-------|-----|------|------|-----------|
|group_id   |references|true |false |false |true       |
|user_id    |references|false|false |false |true       |

### Groupテーブル
#User_groupテーブルとのアソシエーション
has_many :users,through: :users_group
has_many :users_group
#Comment テーブルのアソシエーション
has_many :comments

|column|type   |index|null  |unique|
|------|-------|-----|------|------|
|name  |string |false|false |false  |

### Commentテーブル
belongs_to :user
belongs_to :group

|column     |type   |index|null  |unique|foreign_key|
|-----------|-------|-----|------|------|-----------|
|user_id    |references|true |false |false |true       |
|group_id   |references|true |false |false |true       |
|comment    |text   |false|true  |false |false      |
|image      |string |false|true  |false |false      |

