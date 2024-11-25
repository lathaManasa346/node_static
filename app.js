const express = require('express');
const path = require("path");
const { getIsbnNum , products} = require('./data/products');
const { engine } = require('express-handlebars');

const app = express();
const PORT = 3000;
const Tax = 0.0175; //tax of 1.75%

//middleware to parse url from HTML forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'handlebars');  // Set Handlebars as the view engine
app.set('views', path.join(__dirname, 'views'));  // Views folder location

app.use('/pages/images', express.static(path.join(__dirname, 'pages/images')));

app.engine('handlebars', engine({
    defaultLayout: 'main',  // Use the 'main' layout by default
    layoutsDir: path.join(__dirname, 'views', 'layouts'),  // Layout folder location
    extname: '.handlebars'  // Set file extension to .handlebars
  }));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'Pages', 'index.html'));
// });


// Route for the books page
app.get('/books', (req, res) => {
    // res.send('<h1>Books Page</h1>'); 
    const { products } = require('./data/products');  // Import product dataapp.get('/books', (req, res) => {
    if (!products || products.length === 0) {
      return res.status(500).send('No products available');
    }
    // Render 'booksTable.handlebars' with the product data
    res.render('booksTable', { layout: false,products });
  });
  
  // Route for the home page
  app.get('/', (req, res) => {
      res.render('main');  // Render 'main.handlebars'
    });

    app.get('/order', (req, res) => {
        const { products } = require('./data/products');
        res.render('order',  {
            layout: false,
            products, // List of products
            errors: {}, // No errors initially
            formData: { product: "", copies: "" }});
    });

    // post call to send requested data from the form and display errors based on conditions
    app.post('/order', (req, res) => {
        const isbn = req.body.isbn; // Ensure it matches the 'name' in the form
        const copies = parseInt(req.body.copies, 10);
        const errors = {};
    
        // Validate isbn
        if (!isbn || isbn === "0") {
            errors.isbn = "You must select a book.";
        }
    
        // Validate copies
        if (!copies || isNaN(copies) || copies <= 0) {
            errors.copies = "Enter a valid number of copies.";
        }
    
        // If there are errors, re-render the form with errors and data
        if (Object.keys(errors).length > 0) {
            return res.render('order', {
                layout: false,         // Do not use the default layout
                products,              // Pass product list for dropdown
                errors,                // Pass validation errors
                formData: { isbn, copies: req.body.copies || '' } // Preserve user input
            });
        }
    
        // Success case: Find the product and calculate totals
        const book = products.find(product => product.isbn.toString() === isbn);
        if (!book) {
            return res.render('order', {
                layout: false,
                products,
                errors: { isbn: "Invalid book selection." },
                formData: { isbn, copies }
            });
        }
    
        const totalPrice = (book.price * copies).toFixed(2);
        const tax = (totalPrice * 0.1).toFixed(2); // Example: 10% tax
        const finalTotal = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);
    
        // Render the receipt page
        return res.render('receipt', {
            layout: false,
            bookTitle: book.title,
            bookImage: book.image,
            copies,
            price: book.price.toFixed(2),
            totalPrice,
            tax,
            finalTotal
        });
    });
    


app.use((err,req, res,next) => {
    res.status(500).send("Server Error");
})

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
  });
//server listening at port number

app.listen(PORT, () => {
    console.log("Server listens at 3000");
})


