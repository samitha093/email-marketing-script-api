const router = require('express').Router();
const nodemailer = require("nodemailer");
let Camp = require('../models/campain.model');
let Template = require('../models/template.model');
let List = require('../models/list.model');
let Delivery = require('../models/delivery.model');


router.route('/').get((req, res) => {
    Camp.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    Camp.findById(req.params.id)
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/').post(async(req, res) => {
    const cmpname = req.body.cmpname;
    const tempid = req.body.tempid;
    const listid = req.body.listid;
    const status = false;
    const sended = 0;
    var size = 0;
    await List.findById(listid)
        .then(exercises => size = Number(exercises.list.length))
    const newList = new Camp({
        cmpname,
        tempid,
        listid,
        status,
        sended,
        size
    });
    newList.save()
        .then(() => res.json('Email Cmpain created!'))
        .catch(err => res.status(400).json('Error: ' + err))
});
router.route('/:id').delete((req, res) => {
    Camp.findByIdAndDelete(req.params.id)
    .then(() => res.json('server deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').put((req, res) => {
    Camp.findById(req.params.id)
    .then(exercise => {
        exercise.cmpname = req.body.cmpname;
        exercise.tempid = req.body.tempid;
        exercise.listid= req.body.listid;

      exercise.save()
        .then(() => res.json('Server updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/run/:id').put((req, res) => {
    Camp.findById(req.params.id)
    .then(exercise => {
        exercise.status = true;

    exercise.save()
        .then(() => res.json('Campain updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    

    //run mail server
    Camp.findById(req.params.id)
        .then(exercises => (data1(exercises,req.params.id)))
    //re activate button
    //init(req.params.id);

});
async function data1(data,id) {
    Template.findById(data.tempid)
        .then(exercises => (data2(exercises,data.listid,id)))
}
async function data2(data,listid,id) {
    List.findById(listid)
        .then(exercises => (data3(exercises, data,id)))
}
async function data3(data, emailtemplate,id) {
    var emailscount = 0;
    var server = [];
    await Delivery.find()
        .then(exercises => server = exercises)
    var reportarray = await data.list.map(async (item) => {
        var j = 0;
        var i = 0;
        while(j==0){
            try{
                if(server[i].size > 0){
                    server[i].size -= 1;
                    var intervaltime = (40 - server[i].size) * 10000;
                    await sleep(intervaltime);
                    console.log(item);
                    emailscount += 1;
                    //data4(emailtemplate, item, server[i]);;
                    j += 1;
                }else{
                    i += 1;
                }
            }catch{
                break;
                console.log("no more server to send email");
            }
        }
    });
    for(var h = 0 ; h<80 ; h += 1){
        await sleep(10000*h);
    
        Camp.findById(id)
        .then(exercise => {
            exercise.sended = emailscount;

        exercise.save()
            .then(() => console.log('Campain updated!'))
            .catch(err => console.log('Error: ' + err));
        })
    }
}
async function data4(emailtemplate, toemail, server) {
    //console.log(emailtemplate);
    console.log(toemail);
    //console.log(server);

    const host_ = server.host;
    const port_ = server.port;
    const user_ = server.username;
    const passs_ = server.password;
    const security_ = server.protocol; 
    const from_email = server.from;
    const to_email = toemail;
    const sublect_email = emailtemplate.subject;
    const body_email = emailtemplate.htmlcord;
    const transporter = nodemailer.createTransport({
        host: host_,
        port: port_,
        secure: security_,
        auth: {
            user: user_,
            pass: passs_,
        },
    });
    let mainOptions = {
        from: from_email,
        to: to_email, 
        subject: sublect_email,
        html: body_email,
    }
    transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`mail sent ${info.response}`);
        }
    })

}
async function init(id) {
    await sleep(5000);
    Camp.findById(id)
        .then(exercise => {
            exercise.status = false;
        exercise.save()
            .then(() =>console.log('-----End Campain----'))
            .catch(err => console.log('Error: ' + err));
        })
        .catch(err => console.log('Error: ' + err));
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
module.exports = router;