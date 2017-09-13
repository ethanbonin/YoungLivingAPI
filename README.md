# YoungLiving API
----------------

## Reason for the API

I created this API because I wanted to create some awesome stuff for my mom. She uses Young Living on a daily basis, 
and from what I could tell, she wanted more condensed and consise tools with Young Living.

----------------
## Want to contribute? 

I would love the help! I want to make this open source as possible! So feel free to add more.

The only requirements.

1. You must write the __tests__ for whatever endpoints you create.
2. Follow the normal procedure for forking and pull requests.
3. Don't compromise user data.


To get Started with The tests, you'll need to add a file to the seeds folder.

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


## Final Note before using

You have to start with __/yl/login/__ before you can do anything. It will return back an authtoken that you will use for any requests.

----------------
## END POINTS

- [/yl/login/](https://github.com/ethanbonin/YoungLivingAPI/wiki/YL-LOGIN)
- [/yl/report_data/](https://github.com/ethanbonin/YoungLivingAPI/wiki/YL-REPORT-DATA)
- [/yl/about_to_go_inactive/](https://github.com/ethanbonin/YoungLivingAPI/wiki/YL-POST-about_go_inactive)
- [/yl/rank_status](https://github.com/ethanbonin/YoungLivingAPI/wiki/YL-POST-rank_status)


