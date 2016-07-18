# express-static-file-server for blog api
## uses json file for storage - no database. easy to change routes and objects: for example, posts to users

## Running

1. ```npm install```
2. ```npm start```
2. ```running on localhost:3000```

routes:  
		http://localhost:3000/posts/  --get all posts  
		...'/posts/:id'  --get one; put/update  
		...'/newPost'    --add  
		...'/deletePost/:id'  
