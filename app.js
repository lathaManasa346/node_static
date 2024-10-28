const express = require('express');
const path = require("path");
const { getIsbnNum } = require('./data/products')

const app = express();
const PORT = 3000;
const Tax = 0.0175; //tax of 1.75%

//middleware to parse url from HTML forms
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Pages', 'index.html'));
});

//post call to send requested data from the form and display errors based on conditions
app.post('/order', (req, res, next) => {

    const isbn = req.body.product;
    const copies = parseInt(req.body.copies)

    //Error to display if there is no book selected

    if (!isbn || isbn == "0") {
        res.status(400).end("<html><body><p>Must Select a book!</p></body></html>");
        return;
    }

    //Error to display if there are no copies

    if (!copies || copies <= 0 || isNaN(copies)) {
        res.status(400).end("<html><body><p>Must purchase atleast one copy!</p></body></html>");
        return;
    }

    next();
});

//middleware to get the details of the book based on isbn number
app.use('/order', (req, res) => {
    const isbn = req.body.product;
    const copies = parseInt(req.body.copies)
    const bookdetails = getIsbnNum(isbn);

    const totalWithOutTax = bookdetails.price * copies;
    const tax = totalWithOutTax * Tax;
    const total = totalWithOutTax + tax;

    res.send(`Thank you for your order of ${copies} copies of <b> ${bookdetails.title} </b>. At $${bookdetails.price} per copy, your total bill is 
  $${total.toFixed(2)} with tax.`)

});

//Error handling for 404 and 500 errors

app.use((req, res) => {
    console.error(err.stack);
    res.status(404).send("File Not Found");
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Server Error");
})

//server listening at port number

app.listen(PORT, () => {
    console.log("Server listens at 3000");
})