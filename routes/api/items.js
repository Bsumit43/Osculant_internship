const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './client/src/public');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
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
// const auth = require('../../middleware/auth')

//Item Model
const Item = require('../../schema/ItemSchema');

//@routes /api/items
// router.get('/', async function(req, res, next) {
    // var services = await addPage.find();
    // res.render('index', { title: 'Express', posts : services });
// });

router.get('/', (req,res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
});

router.post('/',upload.single('cover'), (req,res) => {
    console.log(req.body);
    // console.log()
    console.log(req.file);
    req.files
    const newItem = new Item({
         name: req.body.name,
         cover: req.file.originalname,
         description: req.body.description
    });
    newItem.save()
    .then(item => res.json(item));
});

router.delete('/:id',(req,res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success : true})))
    .catch(err => res.status(404).json({success : false}));
});


module.exports = router;