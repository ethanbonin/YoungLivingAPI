Want to contribute?

I would love the help! I want to make this open source as possible! So feel free to add more.

The only requirements.

- You must write the tests for whatever endpoints you create.
- Follow the normal procedure for forking and pull requests.
- Don't compromise user data.

To get started with the tests, you'll need to add a file to the __seeds folder__.

__secret_login.js__ and inside there, you need the add the following data
```
var bad_login_body = {
      "userName": "88888",
      "email": "88888",
      "memberId": "88888",
      "password": "badbadbad"
    }


var good_login_body = {
      "userName": "YOUR USERNAME",
      "email": "YOUR USERNAME",
      "memberId": "YOUR USERNAME",
      "password": "YOUR USERNAME"
    }


module.exports = {
  good_login_body,
  bad_login_body
}
```
