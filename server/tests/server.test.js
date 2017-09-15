//3rd Party modules
const expect = require("expect");
const request = require("supertest");

//3rd Party Modules
var { ObjectID } = require("mongodb");
const util = require("util");

//1st party modules
const { app } = require("./../server");
const {
  report_values_all,
  report_values_inactive,
  report_values_new_members
} = require("./seed/seed");
const { good_login_body, bad_login_body } = require("./seed/secret_login");

describe("POST /yl/login", () => {
  it("should return a response from good login", function(done) {
    request(app)
      .post("/v0/yl/login")
      .send(good_login_body)
      .expect(200)
      .expect(res => {
        // This creates a custom Expect
        var body = JSON.parse(res.text);
        expect(body).toExist();
        expect(body).toIncludeKeys([
          "userId",
          "userName",
          "displayName",
          "memberId",
          "signature"
        ]);
      })
      .end(done);
  });
});

describe("POST /yl/report_data", () => {
  var authtoken = "";
  it("should return a json object full of user data and the keys should equal the values in order for the first index of the array", function(
    done
  ) {
    request(app)
      .post("/v0/yl/login")
      .send(good_login_body)
      .expect(200)
      .expect(res => {
        // This creates a custom Expect
        expect(res.headers["authtoken"]).toExist();
        authtoken = res.headers["authtoken"];
      })
      .end((err, res) => {
        if (err) {
          return done(e);
        }
        request(app)
          .post("/v0/yl/report_data")
          .set("authtoken", res.headers["authtoken"])
          .set("content-type", "application/json")
          .send({ values: report_values_all })
          .expect(200)
          .expect(res => {
            var data = res.body[0];
            for (var key in data) {
              var item = data[key];
              expect(data[key]).toBe(item);
            }
          })
          .end(done);
      });
  });
});

describe("POST /yl/about_to_go_inactive", () => {
  var authtoken = "";
  it("should return users who are about to go inactive and the keys should equal the values in order for the first index of the array", function(
    done
  ) {
    request(app)
      .post("/v0/yl/login")
      .send(good_login_body)
      .expect(200)
      .expect(res => {
        // This creates a custom Expect
        expect(res.headers["authtoken"]).toExist();
        authtoken = res.headers["authtoken"];
      })
      .end((err, res) => {
        if (err) {
          return done(e);
        }
        request(app)
          .post("/v0/yl/about_to_go_inactive/")
          .set("authtoken", res.headers["authtoken"])
          .set("content-type", "application/json")
          .send({ values: report_values_inactive })
          .expect(200)
          .expect(res => {
            var data = res.body[0];
            for (var key in data) {
              var item = data[key];
              expect(data[key]).toBe(item);
            }
          })
          .end(done);
      });
  });
});

describe("POST /yl/rank_status", () => {
  var authtoken = "";
  it("should rank qualification of the user and their legs", function(done) {
    request(app)
      .post("/v0/yl/login")
      .send(good_login_body)
      .expect(200)
      .expect(res => {
        // This creates a custom Expect
        expect(res.headers["authtoken"]).toExist();
        authtoken = res.headers["authtoken"];
      })
      .end((err, res) => {
        if (err) {
          return done(e);
        }
        request(app)
          .post("/v0/yl/rank_status")
          .set("authtoken", res.headers["authtoken"])
          .set("content-type", "application/json")
          .send({ period: 440 })
          .expect(200)
          .expect(res => {
            expect(res).toExist();
          })
          .end(done);
      });
  });
});

describe("POST /yl/new_members", () => {
  var authtoken = "";
  it("should return their new memebers that they have signed up", function(done) {
    request(app)
      .post("/v0/yl/login")
      .send(good_login_body)
      .expect(200)
      .expect(res => {
        // This creates a custom Expect
        expect(res.headers["authtoken"]).toExist();
        authtoken = res.headers["authtoken"];
      })
      .end((err, res) => {
        if (err) {
          return done(e);
        }
        request(app)
          .post("/v0/yl/new_members")
          .set("authtoken", res.headers["authtoken"])
          .set("content-type", "application/json")
          .send({ values: report_values_new_members })
          .expect(200)
          .expect(res => {
            var data = res.body[0];
            for (var key in data) {
              var item = data[key];
              expect(data[key]).toBe(item);
            }
          })
          .end(done);
      });
  });
});



describe("GET /yl/profile", () => {
  var authtoken = "";
  it("should return the users profile", function(done) {
    request(app)
      .post("/v0/yl/login")
      .send(good_login_body)
      .expect(200)
      .expect(res => {
        // This creates a custom Expect
        expect(res.headers["authtoken"]).toExist();
        authtoken = res.headers["authtoken"];
      })
      .end((err, res) => {
        if (err) {
          return done(e);
        }
        request(app)
          .get("/v0/yl/profile")
          .set("authtoken", res.headers["authtoken"])
          .expect(200)
          .expect(res => {
            expect(res).toExist();
          })
          .end(done);
      });
  });
});


describe("GET /yl/downline", () => {
  var authtoken = "";
  it("should return the users profile", function(done) {
    request(app)
      .post("/v0/yl/login")
      .send(good_login_body)
      .expect(200)
      .expect(res => {
        // This creates a custom Expect
        expect(res.headers["authtoken"]).toExist();
        authtoken = res.headers["authtoken"];
      })
      .end((err, res) => {
        if (err) {
          return done(e);
        }
        request(app)
          .get("/v0/yl/downline")
          .set("authtoken", res.headers["authtoken"])
          .expect(200)
          .expect(res => {
            expect(res.text).toExist();
            var object = JSON.parse(res.text)
            expect(object).toIncludeKeys(["customerid", "currentperiodid", "legs", "totalchildren"])
          })
          .end(done);
      });
  });
});
