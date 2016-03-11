# close-api

## API
##### Public End Points
|Request|URL|Response|
|---|---|---|
|Get All|/api/items/|[itemObj]|
|Get One Item by ID|/api/items/:itemId|{itemObj}|
|Get Items by User Id|/api/users/:userId|[itemObj...]|
|Get All Items By Creation Date (ASC/true || DESC/false)|/api/items/?sortby=creationdate&ascending=true|[itemObj...]|
|Get All Items By Price (ASC/true || DESC/false)|/api/items/?sortby=creationdate&ascending=true|[itemObj...]|
|Get Items By Lat/Long|/api/items/?sortby=location&lat=FLOAT&long=FLOAT|[itemObj...]|
