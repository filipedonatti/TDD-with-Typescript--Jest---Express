import express, { Request, Response } from 'express';
import booksRoutes from '../routes/books.routes';
import booksData from '../data/books.json';

const app = express();
app.use(express.json());
app.use('/api/books', booksRoutes);

app.get('/', (req: Request, res: Response)  =>   {

    res.status(200).send({
        msg: "ok"
    });
    return console.log('Hullo');

});




app.listen(9000, ()  => {
    console.log('listening at localhost:9000');

});

