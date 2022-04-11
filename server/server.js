
const express = require("express");
const conn = require('./connection');
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

conn.connect((err) => {
  if (err) throw err;
  if (!err) {
    console.log("Datbases connected successfully...!!!");
  } else {
    console.log("Connection Failed :", err.message);
  }
})

app.listen(3000, () => {
  console.log(`Server started on PORT: 3000`);
});

app.use('/upload', express.static('uploads'));  //no need url upload as static
app.use('/index', (req, res) => {
  console.log("index");
  res.send("index")
})

// console.log(__dirname);


const router = express.Router();
const multer = require('multer');

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + " " + file.originalname);
      }
    });

    const fileFilter = (req, file, cb) => {
      // reject a file
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

app.use("/", router);
// router.post('/upload', upload.single('productImages'), (req, res) => {
router.post('/upload', upload.array('productImages'), (req, res) => {
  res.status(200).json({
    success: true,
    productImage: Object.values(req.files).map(e=>e.path),
    // productImage: req.file.path
  });
});

//read/fetch images 
const fs = require("fs");
router.get('/image', (req, res) => {
  fs.readFile(__dirname+'/uploads/2022-04-11T08-33-50.393Z rule1.jpg',
    function (err, content) {
        // Serving the image
        res.end(content);
    });
});

//delete image
router.delete('/delete', (req, res)=>{
  try {
    fs.unlinkSync(__dirname+'/uploads/6.jpg');
    //file removed
  } catch(err) {
    console.error(err)
  }
  res.status(200).json({sucess:true})
})

//upadte image
router.post('/update', upload.single('newFile'), (req, res) => {
  try {
    fs.unlinkSync(__dirname+'/uploads/'+req.body.name);
    //file removed
  } catch(err) {
    console.error(err)
  }
  res.status(200).json({
    success: true,
    newFile: req.file.path
  });
});



const id = 1;
const name = "rohan";
// var sql = `create table company (id int, name varchar(50))`;
var sql = `insert into company values('${id}','${name}')`;

// conn.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Result : ", result);
// });