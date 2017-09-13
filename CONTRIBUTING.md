## Want to contribute? 

I would love the help! I want to make this open source as possible! So feel free to add more.

The only requirements.

1. You must write the __tests__ for whatever endpoints you create.
2. Follow the normal procedure for forking and pull requests.
3. Don't compromise user data.


To get started with the tests, you'll need to add a file to the **seeds folder**.

**secret_login.js**
and inside there, you need the add the following data

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
