import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

const PORT = 3000;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "books API",
            version: "1.0.0",
            description: "A simple Express book API",
        },
    },
    apis: ["./server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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

/**
 * @swagger
 * /books:
 *  get:
 *   summary: retrives a list of all books
 *   description: Retrieve a list of books in the library.
 *   responses:
 *    200:
 *      description: A list of books.
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id: 
 *                   type: integer
 *                title:
 *                   type: string
 *                author:
 *                   type: string
 */


app.get('/books', (req, res) => {
    res.json(books);
});
/**
 * @swagger
 * /books:
 *  post:
 *    summary: Add a new book
 *    requestBody:
 *      require: true
 *      content:
 *         application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - author
 *              properties:
 *                title:
 *                  type: string
 *                author:
 *                  type: string
 * responses:
 *    200:
 *      description: Book added successfully.
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              properties:
 *                id: 
 *                   type: integer
 *                title:
 *                   type: string
 *                author:
 *                   type: string
 */

app.post("/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        uthor: req.body.author,
    };
    books.push(newBook);
    res.json({ message: "book added succcessfully!", book: newBook })
});
/**
 * @swagger
 * /books/{id}:
 *  put:
 *   summary: update an existing book
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: numeric ID of the book to update
 * requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *           author:
 *             type: string
 * responses:
 *   200:
 *     description: Book updated successfully.
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *        properties:
 *            message:
 *              type: string
 *            book: 
 *              type: string
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                author:
 *                  type: string
 *      404:
 *        description: Book not found.
 */
app.put("/books:id", (req, res) => {
    const bookid = parseInt(req.params.id)
    const book = books.find(b => b.id === book.id);
    if (!book) {
        return res.status(404).json({ message: "book not found!" });
    }
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json({ message: "book updated successfully!", book });
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *      summary: delete a book
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: numeric ID of the book to delete
 * responses:
 *   200:
 *     description: Book deleted successfully.
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *   404:
 *     description: Book not found.
 */
app.delete("/books/:id", (req, res) => {
    const bookid = parseInt(req.params.id);
    books = books.filter(b => b.id !== bookid);
    res.json({ message: "book was removed from your list!" });
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