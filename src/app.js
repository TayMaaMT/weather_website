const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocoding = require('./utils/geocoding');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;
//////////////////////////////////////////
const app = express();
app.use(express.static(path.join(__dirname, "../public")));
const appview = path.join(__dirname, "../templates/views");
const apppartials = path.join(__dirname, "../templates/partials");
//////////////////////////////////////////
app.set('view engine', 'hbs');
app.set('views', appview);
hbs.registerPartials(apppartials);
//////////////////////////////////////////
app.get('', (req, res) => {
    res.render("index", {
        title: "index page",
        name: "taymaa",
        indexpg: "this is index weather page that you want to know"
    });
})
app.get('/about', (req, res) => {
    res.render("about", {
        title: "about page",
        name: "weather",
        aboutpg: "this is about weather page that you want to know"
    });
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            Error: "you must provide address for weather app ",

        });
    } else {
        geocoding(req.query.address, (err, { latitude, longitude, place_name } = {}) => {
            if (err) {
                return res.send({
                    Error: err
                });
            }

            forecast(latitude, longitude, (err, data) => {
                if (err) {
                    return res.send({
                        Error: err
                    });
                }
                res.send({
                    address: place_name,
                    tempreature: data
                });
            })
        })

    }
})
app.get('/about/*', (req, res) => {
    res.render("error", {
        errorpg: "about article not found",
        title: "404 page",
        name: "error",
    });

})
app.get('*', (req, res) => {
        res.render("error", {
            errorpg: "page not found",
            title: "404 page",
            name: "error",
        });
    })
    ///////////////////////////////////////////
app.listen(port, () => {
    console.log('localhost server is running at post 3000');
})