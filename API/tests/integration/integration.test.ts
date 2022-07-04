
import express from 'express';
import supertest from 'supertest';
import router from '../../routes/books.routes';
import booksRoutes from '../../routes/books.routes';




const app = express();
const request = supertest;
app.use(express.json());
app.use('/api/books', booksRoutes);




jest.mock('../../data/books.json', () => [
	{ id: 1, title:  "The Hobbit" },
    { id: 2, title:  "The Lord of The Rings" },
    { id: 3, title:  "The Two Towers" },
    { id: 4, title:  "The Return of The King" }

]);



describe('Should simulate HTTP Requests',    () =>  {

// GET

    test('GET /api/books - success -  outputs array containing books',  async  ()  =>  {

        const {   body, statusCode   }  =   await request(app).get('/api/books');

        
        expect(body).toEqual(
          
                expect.arrayContaining([
                    expect.objectContaining({

                        id: expect.any(Number),
                        title: expect.any(String)
    
    })]));

        expect(statusCode).toBe(200);
    });



// POST

    test('POST/ failure ',  async() =>  {

        const { body, statusCode }  =   await request(app).post('/api/books').send({ id: '', title: 'Dune' });

        expect(statusCode).toBe(400);

        expect(body).toEqual({
            errors: [
                {
                    location: 'body',
					msg: 'Book id is required',
					param: 'id',
					value: '',
                
    }]});

    });




    test('POST/ success',   async   ()  =>  {

        const { body, statusCode }  =   await   request(app).post('/api/books').send({ id: 45, title: 'Dune' });
// 200 --> 201 
        expect(statusCode).toBe(200);

        expect(body).toEqual({

            message: 'Success'

        });

    });




// PUT    

    test('PUT/ failure (book not found)',   async   ()  =>  {

        const { body, statusCode }  =   await request(app).put('/api/books/99').send({ title: 'Franny and Zoey'  });

        expect(statusCode).toBe(404);
        expect(body).toEqual({

            error: true,
            message: 'Book not found'

        });
    });




    test('PUT/ success',    async   ()  =>  {

        const { body, statusCode }  =   await request(app).put('/api/books/2').send({ title: 'Crime & Punishment' });

        expect(statusCode).toBe(200);

    });




    test('DELETE/ failure',   async   ()  =>  {

        const { body, statusCode }  =   await request(app).delete('/api/books/99');

        expect(statusCode).toBe(404);
        expect(body).toEqual({

            error: true,
            message: 'Book not found'

        });

    });




    test('DELETE/ success',   async   ()  =>  {

        const { body, statusCode }  =   await request(app).delete('/api/books/2');

        expect(statusCode).toBe(200);
        expect(body).toEqual({

            message: 'Success'
        })
    });


});
