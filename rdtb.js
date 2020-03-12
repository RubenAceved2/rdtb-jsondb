// rdtb
const fs = require('fs')

// create database
create = (dbname) => {
    const database = {
        data: []
    }
    fs.writeFile(`./${dbname}.json`, JSON.stringify(database, null, 4) , (err) => {
        if (err) console.log(err)
        else console.log('\nDatabase created sucessfully.\n')
        }
    )
}

// insert data into database
insert = (dbname, ...arguments) => {
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => {
        if (err) console.log(err)
        else {
            db_parsed = parser(db_readed) // parse db
            db_parsed.data.push(arguments) // insert args
            //console.log(JSON.stringify(db_parsed, null, 4))
            dbStrFinal = JSON.stringify(db_parsed, null, 4) // turn into string again
            
            fs.writeFile(`${dbname}.json`, dbStrFinal, (err) => { // writing the whole thing
                if (err) console.log(err)
                else console.log('\nRegistry included sucessfully.\n')
            })
        } // end of else
    } //end of db_readed
    ) // end of readfile
} // end of insert

// selectEqual -- select data from db -- key === value
selectEqual = (dbname, key, value) => {
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => { // reading db
        if (err) console.log(err) 
        else {
            db_parsed = parser(db_readed) // parsing db
            console.log(db_parsed.data.reduce((a,b) => a.concat(b), []).filter(obj => obj[key] === value)) // obj.key returning [] obj.idade returning ok
        }
    })
} // end of selectEqual

// selectHigher select data from db -- key > value
selectHigher = (dbname, key, value) => {
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => { // reading db
        if (err) console.log(err) 
        else {
            db_parsed = parser(db_readed) // parsing db
            console.log(db_parsed.data.reduce((a,b) => a.concat(b), []).filter(obj => obj[key] > value)) // obj.key returning [] obj.idade returning ok
        }
    })
} // end of selectHigher

// selectLower select data from db -- key < value
selectLower = (dbname, key, value) => {
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => { // reading db
        if (err) console.log(err) 
        else {
            db_parsed = parser(db_readed) // parsing db
            console.log(db_parsed.data.reduce((a,b) => a.concat(b), []).filter(obj => obj[key] < value)) // obj.key returning [] obj.idade returning ok
        }
    })
} // end of selectLower

// selectHigherOr select data from db -- key >= value
selectHigherOr = (dbname, key, value) => {
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => { // reading db
        if (err) console.log(err) 
        else {
            db_parsed = parser(db_readed) // parsing db
            console.log(db_parsed.data.reduce((a,b) => a.concat(b), []).filter(obj => obj[key] > value || obj[key] === value)) // obj.key returning [] obj.idade returning ok
        }
    })
} // end of selectHigherOr

// selectLowerOr select data from db -- key <= value
selectLowerOr = (dbname, key, value) => {
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => { // reading db
        if (err) console.log(err) 
        else {
            db_parsed = parser(db_readed) // parsing db
            console.log(db_parsed.data.reduce((a,b) => a.concat(b), []).filter(obj => obj[key]< value || obj[key] === value)) // obj.key returning [] obj.idade returning ok
        }
    })
} // end of selectHigherOr

// selectAll selects all data from db 
selectAll = (dbname) => {
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => { // reading db
        if (err) console.log(err) 
        else {
            db_parsed = parser(db_readed) // parsing db
            console.log(db_parsed.data.reduce((a,b) => a.concat(b), []).filter(obj => obj))
        }
    })
} // end of selectAll

// selectBetween select data from db --   value2 < key > value2
selectBetween = (dbname, key, value1, value2) => { // value 1 needs to be the lower value of between
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => { // reading db
        if (err) console.log(err) 
        else {
            db_parsed = parser(db_readed) // parsing db
            console.log(db_parsed.data.reduce((a,b) => a.concat(b), []).filter(obj => obj[key] < value2 && obj[key] > value1)) 
        }
    })
} // end of selectBetween

// selectBetweenOr select data from db --   value2 <= key >= value2
selectBetweenOr = (dbname, key, value1, value2) => { // value 1 needs to be the lower value of between
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => { // reading db
        if (err) console.log(err) 
        else {
            db_parsed = parser(db_readed) // parsing db
            console.log(db_parsed.data.reduce((a,b) => a.concat(b), []).filter(obj => obj[key] < value2 && obj[key] > value1 || obj[key] === value1 || obj[key] === value2)) 
        }
    })
} // end of selectBetweenOr

// deleteEqual data argument from database
deleteEqual = (dbname, key, value) => {
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => { // reading db
        if (err) console.log(err) 
        else {
            db_parsed = parser(db_readed) // parsing db
            remover = (key, value) => db_parsed.data.reduce((a,b) => a.concat(b), []).filter(obj => obj[key] !== value)
             // obj.key returning [] obj.idade returning ok
            const dbremoved = remover(key,value) // is an object

            fs.unlinkSync(`${dbname}.json`, (err) => {
                if (err) console.log(err) 
                console.log('\ncleaning...\n')
            }) // erasing db

            fs.writeFile(`${dbname}.json`, JSON.stringify(dbremoved, null, 4), (err) => { // writing the whole thing
                if (err) console.log(err)
                else console.log('\nRegistry deleted sucessfully.\n') 
            }) // creating db again without deleted data


        } // end of else
    }) // end of readfile
} // end of deleteEqual

// cleans db data
clean = (dbname) => {
    fs.unlinkSync(`${dbname}.json`, (err) => {
        if (err) console.log(err) 
        console.log('\ncleaning...\n')
    }) // erasing db

    const database = {
        data: []
    }
    fs.writeFile(`./${dbname}.json`, JSON.stringify(database, null, 4) , (err) => {
        if (err) console.log(err)
        else console.log('Database cleaned sucessfully.\n')
        }
    )
    
} // end of clean

count = (dbname, key, value) => {
    fs.readFile(`${dbname}.json`, 'utf8', (err, db_readed) => { // reading db
        if (err) console.log(err) 
        else {
            db_parsed = parser(db_readed) // parsing db
            console.log(db_parsed.data.reduce((a,b) => a.concat(b), []).filter(obj => obj[key] === value).length) // obj.key returning [] obj.idade returning ok
        }
    })
} // end of selectEqual

// backup functions

// parser function
parser = (toParse) => JSON.parse(toParse)

// exporting functions
module.exports = {

    create,
    insert,
    selectAll,
    selectEqual,
    selectHigher,
    selectHigherOr,
    selectLower,
    selectLowerOr,
    selectBetween,
    selectBetweenOr,
    deleteEqual,
    clean,
    count

}