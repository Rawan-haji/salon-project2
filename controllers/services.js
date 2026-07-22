
const Service = require('../models/service')

const serve = async (req, res) => {
  res.render('salon/service.ejs', {
    selectedService: null
  });
};

const chooseService = async (req,res)=>{
    const selectService=req.body.service
    const serviceName = req.params.serviceName;

    
    if(!selectService){
        return res.send("please select at least one service befor applying")
    }
    console.log("user select this service:", selectService)
    
    res.send(`service successfully applied: ${selectService}`)
}

const showDetails = async(req, res) => {
 const allServices = await Service.find()

    const serviceName = req.params.serviceName;

    const selectedService = allServices.filter(service => {
        return  service.serviceName === serviceName
    })
  
    console.log(selectedService[0])

    res.render('salon/service.ejs', {
        selectedService: selectedService[0] || null
    });
};

module.exports = { 
    chooseService,
    serve,
showDetails
}
