const express = require('express');
const path = require("path");

const app = express();
const PORT = 3000;

app.use('/pages', express.static(path.resolve(__dirname,'pages')));
app.use('/images',express.static(path.resolve(__dirname,'pages/images')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Pages', 'index.html')); 
});


app.get('/select/:isbn',(req,res)=>{
    const isbn = req.params.isbn;
    const filePath = path.resolve(__dirname,'pages',`${isbn}.html`);

    res.sendFile(filePath,(err)=>{
        if (err) {
            if (err.code === 'ENOENT') { 
                res.status(404).send('File not found');
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    
    })
})


app.listen(PORT, ()=>{
    console.log("Server listens at 3000")
})