
const Service = require('./services')

const serve=async(req, res)=>{
    res.render('salon/service.ejs',{
        selectedService: null
    })
    
} 

const chooseService = async (req,res)=>{
    const selectService=req.body.service

    if(!selectService){
        return res.send("please select at least one service befor applying")
    }
    console.log("user select this service:", selectService)

    res.send(`service successfully applied: ${selectService}`)
}

const showDetails = (req, res) => {
    const serviceName = req.params.serviceName;
    
    const serviceDatabase = {
        haircut: {
            title: 'Hair Cut',
            description: 'Our Hair Cut includes a premium wash, precision trim, and a professional blowout styling.',
            price: '$50',
            duration: '45 mins'
        },
        manicure: {
            title: 'Manicure',
            description: 'Our Manicure includes full nail shaping, detailed cuticle care, and a relaxing hand massage.',
            price: '$35',
            duration: '30 mins'
        },
        makeup: {
            title: 'Makeup',
            description: 'Full face professional glam application customized perfectly for your specific special event.',
            price: '$85',
            duration: '60 mins'
        },
        hairstyling: {
            title: 'Hair Styling',
            description: 'Specialized hairstyling options including elegant updos, braids, curls, or formal straightening.',
            price: '$65',
            duration: '50 mins'
        }
    };

    const selectedService = serviceDatabase[serviceName];

    res.render('salon/service.ejs', {
        selectedService: selectedService || null
    });
};

module.exports = { 
    chooseService,
    serve,
showDetails
}
