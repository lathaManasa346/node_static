// post call to send requested data from the form and display errors based on conditions
// app.post('/order', (req, res) => {
//     console.log("POST /order route hit");
//     const isbn = req.body.product;
//     const copies = parseInt(req.body.copies);
//     const errors = {}; 

//     // Error handling

   
//     if (!isbn || isbn === "0") {
//         errors.isbn = "You must select a book.";
//         // res.status(400).send("<html><body><p>Must Select a book!</p></body></html>");
//         return;
//     }

//     if (!copies || copies <= 0 || isNaN(copies)) {
//         // res.status(400).send("<html><body><p>Must purchase at least one copy!</p></body></html>");
//         errors.copies = "Enter a valid number of copies.";
//         return;
//     }
//  console.log("Errors",Object.keys(errors).length)
//     if (Object.keys(errors).length > 0) {
//         res.render('order', {
//             layout: false,           // Render the same form again
//             products,                // Pass the product list
//             errors,                  // Pass validation errors
//             formData: { isbn, copies: req.body.copies || '' } // Preserve user input
//         });
//         return;
//     }


//     const book = products.find(product => product.isbn.toString() === isbn);

//     // Calculate totals
//     const totalPrice = (book.price * copies).toFixed(2);
//     const tax = (totalPrice * 0.1).toFixed(2); // Example: 10% tax
//     const finalTotal = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

//     res.render('receipt', {
//         layout: false,
//         bookTitle: book.title,
//         bookImage: book.image,
//         copies,
//         price: book.price.toFixed(2),
//         totalPrice,
//         tax,
//         finalTotal
//     });
// });

app.post('/order', (req, res) => {
    console.log("POST /order called"); // Check if route is hit
    console.log("Request Body:", req.body); // Log the incoming data

    const isbn = req.body.product;
    const copies = parseInt(req.body.copies);
    const errors = {};

    // Error handling
    // if (!isbn || isbn === "0") {
    //     errors.isbn = "You must select a book.";
    // }

    // if (!copies || copies <= 0 || isNaN(copies)) {
    //     errors.copies = "Enter a valid number of copies.";
    // }

    // If there are errors, re-render the form with errors and existing data
    if (Object.keys(errors).length > 0) {
        res.render('order', {
            layout: false,          // Render the same form again
            products,               // Pass the product list
            errors,                 // Pass validation errors
            formData: { isbn, copies } // Preserve user input
        });
        return;
    }

    // Find the book from the product list
    const book = products.find(product => product.isbn.toString() === isbn);

    // Calculate totals
    const totalPrice = (book.price * copies).toFixed(2);
    const tax = (totalPrice * 0.1).toFixed(2); // Example: 10% tax
    const finalTotal = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

    // Render the receipt
    res.render('receipt'
    // {
    //     layout: false,
    //     bookTitle: book.title,
    //     bookImage: book.image,
    //     copies,
    //     price: book.price.toFixed(2),
    //     totalPrice,
    //     tax,
    //     finalTotal
    // }
    );
});


// middleware to get the details of the book based on isbn number
// app.use('/order', (req, res) => {
//     const isbn = req.body.product;
//     const copies = parseInt(req.body.copies)
//     const bookdetails = getIsbnNum(isbn);

//     const totalWithOutTax = bookdetails.price * copies;
//     const tax = totalWithOutTax * Tax;
//     const total = totalWithOutTax + tax;

//     res.send(`Thank you for your order of ${copies} copies of <b> ${bookdetails.title} </b>. At $${bookdetails.price} per copy, your total bill is 
//   $${total.toFixed(2)} with tax.`)

// });


//Error handling for 404 and 500 errors

app.use((err,req, res,next) => {
    res.status(404).send("File Not Found");
});