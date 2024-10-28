const products = [
    {
        isbn: 7845124578451,
        title: "Pulling Together By Joseph Murphy",
        price: 12.00,
        image: "/pages/images/7845124578451.jpg"
    },
    {
        isbn: 7845124578985,
        title: "Believe in Yourself By Joseph Murphy",
        price: 12.66,
        image: "/pages/images/7845124578985.jpg",
    },
    {
        isbn: 9854657812456,
        title: "Law Of Attraction By Joseph Murphy",
        price: 19.99,
        image: "/pages/images/9854657812456.jpg"
    }
]

//function to search array of products to get the requested book details of its corresponding isbn number

function getIsbnNum(num){
   return products.find(x=> x.isbn == num);
}

//export function getIsbnNum

module.exports = { getIsbnNum }