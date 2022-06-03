
//GRID FS -Route/controller
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './client/src/uploads/profilePicture')
    },
    filename: function(req, file, cb){
        console.log(file)
        cb(null, Date.now() +'-'+file.originalname)
    }
});
  
//const upload = multer({ storage: storage });
module.exports.upload = multer({ storage: storage });
