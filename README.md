# rdtb-jsondb

An easy-to-use JSON database which can be used for small data storage, up to 100mb without getting slow.

Portable Node.js database, very useful.

## Features

Pros
1.	Portability
2.	Easy-to-use
3.	Can control several db’s at the same .js file
4.	Pretty fast when treating small volumes of data

Cons
1.	Slow when dealing with big data volumes
2.	Low security, just erase the .json created and the data is lost

### Installing

Just run: 
```
npm i rdtb-jsondb
```

Then, in your .js, summon it with:
```
const rdtb = require('rdtb-jsondb')
```

and you're ready to go!

## How to use

Important note: rdtb database is case sensitive, so if you try to query “Ruben Acevedo” typing “ruben acevedo” it will not work.

Always when treating strings on function arguments, go with ‘stringName’ instead of stringName. While when treating with ints, Boolean, etc just go without ‘ ‘.

## Creating a database 

Just run:

```
rdtb.create(‘dbname’) 
```

dbname is the name of your database, and it will create the dbname.json at the same folder of your .js file.


## Inserting data

Just run:  
```
rdtb.insert(‘dbname’, arguments)
```

arguments are objects, so you must insert them in the form of the next example:

```
rdtb.insert(‘dbname’, {name: “Ruben Acevedo”, age: 23, profession: “Developer Wannabe”})
```

You can also add more than one object at the same insert, separating the objects with comma:

```
rdtb.insert(‘dbname’, {name: “Ruben Acevedo”, age: 23, profession: “Developer Wannabe”}, 
                      {name: “Neymar Jr”, age: 26, profession: “Professional Soccer Player”})
```

and so on…

## Searching for data

### Select All:
```
rdtb.selectAll(‘dbname’)
```
Selects all data from database.

### Select Equal:
```
rdtb.selectEqual(‘dbname’, key, value)
```

It selects all data which satisfies condition key === value.

Example: 
``` 
rdtb.selectEqual(‘dbname’, ‘name’, ‘Ruben Acevedo’) 
```
Return: 
```
[{name: “Ruben Acevedo”, age: 23, profession: “Developer Wannabe”}]
```
When value is not a string: 
``` 
rdtb.selectEqual(‘dbname’, ‘age’, 23)
```
Return: 
``` 
[{name: “Ruben Acevedo”, age: 23, profession: “Developer Wannabe”}]
```

### Count: 
```
rdtb.count(‘dbname’, key, value)
```

It follows the same logic that SelectEqual, but it shows the number of objects found.


### Select Higher:
```
rdtb.selectHigher(‘dbname’, key, value)
```
It selects all data which satisfies condition key > value.

Example: 
```
rdtb.selectHigher(‘dbname’, ‘age’, 23) (age > 23) 
```

### SelectHigherOr
```
rdtb.selectHigherOr(‘dbname’, key, value)
```
It selects all data which satisfies condition key >= value (Higher or Equal)

Example: 
```
rdtb.selectHigherOr(‘dbname’, ‘age’, 23) (age >= 23)
```
Following the same syntax:


### Select Lower: 
```
rdtb.selectLower(‘dbname’, key, value)
```

key < value



### Select Lower Or:
```
rdtb.selectLowerOr(‘dbname’, key, value)
```
key <= value


### Select Between:
```
rdtb.selectBetween(‘dbname’, key, value1, value2)
```
It selects all data which satisfies condition value1 < key < value2

Example: 
```
rdtb.selectBetween(‘dbname’, age, 22, 24)   (22 < age < 24)
```
Result: all objects with age === 23


### Select Between Or:
```
rdtb.selectBetweenOr(‘dbname’, key, value1, value2)
```
Same logic, but including value1 and value2 data (in the example, include all data with age 22, 23 and 24)

## Deleting data:

I didn’t see a reason to expand the deleting section like the query section to deletebetween, deletehigher and so on, due to delete command is more likely to be used for specific data treatment. 

### Delete Equal:
```
rdtb.deleteEqual(‘dbname’, key, value)
```
Same logic for querying data with selectEqual, but erasing the selected data.
Example: 
```
rdtb.deleteEqual(‘dbname’, ‘name’, ‘Ruben Acevedo’)
```

### Clean: 

``` 
rdtb.clean(‘dbname’)
```
Erases all data from database, leaving it exactly the same as a new rdtb.create database.


# Authors

* **Ruben Acevedo

If you need any support, or have any new ideas, just send me an email: rubenfsolorzano@hotmail.com

## License

License: ICS!

