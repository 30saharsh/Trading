var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/datafetch", function (req, res, next) {
  try {
    const jsonData = fs.readFileSync("api.json", "utf8");
    const apiData = JSON.parse(jsonData);

    const x = apiData.response.optionData;
    x.forEach((element) => {
      var ce = element.CE.ltp;
      var pe = element.PE.ltp;
       const ceProfitLoss = ce - element.strikePrice;
      const peProfitLoss = element.strikePrice - pe;
      const Cvol = element.CE.volume;
      const Pvol = element.CE.volume;

    });
    res.render( "data" , {x});
  } catch (error) {
    console.error("Error", error);
    res.send("Error Occured !");
  }
});

module.exports = router;
