const mongoose = require('../mongoose');
const ExcelJS = require('exceljs');
const express = require('express');
const router = express.Router();


const Company = require('../schemas/company');

router.get('/' , async(req,res)=>{
    const companies = await Company.find();

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('Companies');

    worksheet.columns = [
        { header: 'Company Name', key: 'companyName' },
        { header: 'HR name', key: 'HRName' },
        { header: 'HR Email', key: 'HREmail' },
        { header: 'HR Phone' , key: 'HRPhone'},
        { header: 'CRC' , key: 'CRC'},
        { header: 'Placement Session' , key: 'session'},
        { header: 'Category' , key: 'category'},
        { header: 'Additional Information' , key: 'detailsExtra'},
      ];

      companies.forEach(company => {
        worksheet.addRow({
            companyName: company.name,
            HRName: company.hrDetails.name,
            HREmail: company.hrDetails.email,
            HRPhone: company.hrDetails.phone,
            CRC: company.crcAssociated,
            session: company.placementSession,
            category: company.category,
            detailsExtra: company.additionalDetails
        })
      })

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=cdownload.xlsx');
    

      await workbook.xlsx.write(res).then((err)=>{
        res.send(err)
      }).catch(()=>{
        res.send("Failure")
      })
})


module.exports = router;