const express = require( 'express' );
const app = express();
const fs = require ( 'fs' );
const hbs = require( 'hbs' );

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(( req, res, next ) => {
    var now = new Date().toString();
    var log = `${ now }: ${ req.method } ${ req.url }`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', ( err ) => {
        if ( err ) {
            console.log('Unable to copy data to server.log');
        }
    })
    next();
});
/*
*this is a way to shut down the website and only go to this page
*by not calling next() it does not allow anything below it to run
app.use(( req, res, next ) => {
    res.render('maintenance');
});
*/
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', ( text ) => {
    return text.toUpperCase();
});

app.get('/', ( req, res ) => {
    res.render('home', {
        welcome: 'Hey this is great stuff',
        pageTitle: 'Home Page'
    });
});

app.get('/about', ( req, res ) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', ( req, res ) => {
    res.send({
        error: 'Request Unhandled',
        status_code: 404
    });
});

app.listen(port, () => {
    console.log(`Server Started on ${ port }`);
});
