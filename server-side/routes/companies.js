const express= require('express'); 
const mongoose = require('../mongoose');
const router = express.Router(); 
const Company = require('../schemas/company'); 
const downloadExcel = require('../excelData/companyExcel')


const MyModel = mongoose.model('companies', {});

router.use('/download.xlsx' , downloadExcel)

router.use((req,res,next)=> {
    console.log('Time: ', Date.now())
    next()
})


router.get('/', (req, res) => {
    MyModel.find().then(docs => {
      // do something with the docs
      console.log(docs); 
      res.json(docs);
    }).catch(err => {
      // handle the error
      console.log('Error getting Companies:', err);
  res.status(500).send('Error getting Companies');
    });
  })

  router.get('/session/:placementSession', async (req, res)=>{
    try{
      const placementSession = req.params.placementSession;
      const companies = await MyModel.find({placementSession: placementSession}, 'name'); 
      res.json(companies); 
    } catch(err){
      console.error(err.message);
      res.status(500).send('Server Error'); 
    }
  });

router.post('/add', async(req, res)=>{
    const formData = req.body;
    console.log(formData); 
    const newCompany = new Company(formData); 
    try{
        const savedDocument = await newCompany.save(); 
        console.log('Document saved:', savedDocument);
        res.send('Form Data Saved to Database');
    } catch (error) {
        console.error('Error saving document:', error);
      }  
});



module.exports = router