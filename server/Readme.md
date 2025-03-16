

-   nodemone will be installed in dev dependency by the follwing command, and by doing so it would be accesible only using npm script and not directly in command line 🔴🔴
`
npm i --save-dev nodemon
`

-   With a local installation, nodemon will not be available in your system path or you can't use it directly from the command line. Instead, the local installation of nodemon can be run by calling it from within an npm script (such as npm start) or using npx nodemon.

-   express.json() parse JSON string(jisme both strings) data recieved from client into JS objects(jisme values r strings), usable!!!

-   express.urlencoded() parse urlencoded data or form data into js objects from client / form into JS objects...

- exress.urlencoded({extended:true}) means nested data can be parsed and false means direct plain data can be parsed, explicitly has to be told
-   name=Vasundhra&skills=JavaScript (url-encoded data)

- The connectToDB function is likely being called directly (not as a middleware in an Express route). When called outside the context of an Express route, req and res are not available, leading to the "status not defined" error.

- __v is a version key in mongo db which keeps a track on the updated documents, it is incremented each time a doicument is updated!!
- we can avoid it by adding {versionKey: false} in our schema in other fields.

- import cookie parser so that u get cookies from req.cookies

- on backend we use js object but while transering we exchange it in form of json string object, bcz http is text based protocol 
#### To DEPLOY backend
- Heroku
- digital ocean
- seenode
- railway
- onrender
- cyclic.sh

### Full Request and Response Flow
✅ Frontend se backend: JSON.stringify() → Converts JavaScript object → JSON string
✅ Backend pe receive: express.json() → Converts JSON string → JavaScript object
✅ Backend se frontend: res.json() → Converts JavaScript object → JSON string
✅ Frontend pe receive: res.json() → Converts JSON string → JavaScript object

### Headers
- Headers are sent to clarify the format of data sent (Content-Type) , or to tell whether the response is to be stored or not(Cache-Control) or token bhejne ke liye (Authorization)


## we can't directly parse file data so we use a middleware (library) like multer to upload and parse upcoming files. 
