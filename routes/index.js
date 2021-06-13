var express = require("express"),
    request = require("request"),
    router = express.Router();



router.get("/", (req, res) => {
    res.redirect("/ms");
});

router.get("/ms", (req, res) => {
    res.render("search");
});

router.get("/ms/results", (req, res) => {
	const APIkey = process.env.APIkey;
    const url = "http://www.omdbapi.com/?s=" + req.query.searchQuery.trim() + "&apikey="+APIkey;
    request(url, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            // console.log(data.Response);
            if(data.Response === "False") {
                req.flash("error", "Sorry! No Related Content Found");
                res.redirect("back");
            } else {
                res.render("searchResults", {results: {data: data, searchQuery: req.query.searchQuery.trim()}});
            }
        }
    });
});

router.get("/ms/moreInfo/:imdbID", (req, res) => {
    // if someone alters imdbID in url then handle that as well
    const imdbID = req.params.imdbID;
    const url = "http://www.omdbapi.com/?i=" + imdbID + "&apikey=e37552dd";
    request(url, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if(data.Response === "False") {
                res.redirect("back");
            } else {
                // console.log(data);
                res.render("moreInfo", {data: data});
            }
        }
    });
});

router.get("/about", (req, res)=> {
    res.render("about");
});


module.exports = router;