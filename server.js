import express from "express";

const app = express();

app.use(express.json());
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`);
});

let books = [
    {
        id: 1, 
        title: "1984", 
        author: "george orwell"
    },
    {
        id: 2, 
        title: "the Hobbit",
        author: "J.R.R. Tolkien",
    }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
    const newBook = {
        id: books.length +1,
        title: req.body.title,
        uthor: req.body.author,
    };
    books.push(newBook);
    res.json({message: "book added succcessfully!", book: newBook})
});
app.put("/books:id", (req,res) =>{
const bookid = parseInt(req.params.id)
const book = books.find(b => b.id === book.id);
if(!book){
    return res.status(404).json({message: "book not found!"});
}
book.title = req.body.title || book.title;
book.author = req.body.author || book.author;
res.json({message: "book updated successfully!", book });
});

app.delete("/books/:id", (req,res) => {
    const bookid = parseInt(req.params.id);
    books = books.filter(b => b.id !==bookid);
    res.json({message: "book was removed from your list!"});
})





/*
{
    id: 1, 
    name: "Milk", 
    DayOfpurchase: "weendsday/sunday",

},
{
    id: 2, 
    name: "Breed",
    DayOfpurchase: "weendsday/sunday if needed",
},
{
    id: 3, 
    name: "Chees", 
    DayOfpurchase: "weendsday/sunday"
},
{
    id: 4, 
    name: "Ham", 
    DayOfpurchase: "weendsday/sunday"
},
{
    id: 5, 
    name: "Meat", 
    DayOfpurchase: "weendsday/sunday"
},
{
    id: 6, 
    name: "vegetables", 
    DayOfpurchase: "weendsday/sunday"
},
{
    id: 7, 
    name: "Fruit", 
    DayOfpurchase: "weendsday/sunday"
},
{
    id: 8, 
    name: "CleaningSupplies", 
    DayOfpurchase: "weendsday every 2 weeks"
},
{
    id: 9, 
    name: "Addon for food", 
    DayOfpurchase: "if needed on weendsday"
},
{
    id: 10, 
    name: "Treats", 
    DayOfpurchase: "fridays"
},
*/