import fs from 'fs';
import path from 'path';



function save( booksData: any ) {

    try{

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'books.json'), JSON.stringify(booksData));
        return true;
    }
    catch(error)    {

        return false;
    }

};

export default save;