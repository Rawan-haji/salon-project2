
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
    // 
    res.send(`service successfully applied: ${selectService}`)
}

const showDetails = async(req, res) => {
 const allServices = await Service.find()
//  const selectedService = await Service.find({serviceName: 'hairstyling'})
//  console.log(selectedService,"here--------------------");
 
    const serviceName = req.params.serviceName;
//     // add to mongodb    
    // const serviceDatabase = {
    //     haircut: {
    //         title: 'Hair Cut',
    //         description: 'Our Hair Cut includes a premium wash, precision trim, and a professional blowout styling.',
    //         price: '$50',
    //         duration: '45 mins'
    //     },
    //     manicure: {
    //         title: 'Manicure',
    //         description: 'Our Manicure includes full nail shaping, detailed cuticle care, and a relaxing hand massage.',
    //         price: '$35',
    //         duration: '30 mins'
    //     },
    //     makeup: {
    //         title: 'Makeup',
    //         description: 'Full face professional glam application customized perfectly for your specific special event.',
    //         price: '$85',
    //         duration: '60 mins'
    //     },
    //     hairstyling: {
    //         title: 'Hair Styling',
    //         description: 'Specialized hairstyling options including elegant updos, braids, curls, or formal straightening.',
    //         price: '$65',
    //         duration: '50 mins'
    //     }
    // };




    const selectedService = allServices.filter(service => {
        return  service.serviceName === serviceName
    })
    // const selectedService = serviceDatabase[serviceName];
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
