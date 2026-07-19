
const Service = require('./services')

const serve=async(req, res)=>{
    res.render('salon/service')
    
}

const chooseService = async (req,res)=>{
    const selectService=req.body.service

    if(!selectService){
        return res.send("please select at least one service befor applying")
    }
    console.log("user select this service:", selectService)

    res.send(`service successfully applied: ${selectService}`)
}

module.exports = { chooseService,
    serve,

}
