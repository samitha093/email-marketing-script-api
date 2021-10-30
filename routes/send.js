const router = require('express').Router();
const nodemailer = require("nodemailer");

router.route('/').post((req, res) => { 
    const host_ = req.body.host;
    const port_ = req.body.port;
    const user_ = req.body.user;
    const passs_ = req.body.password;
    const security_ = req.body.security; 
    const from_email = req.body.from;
    const to_email = req.body.to;
    const sublect_email = req.body.subjest;
    const body_email = req.body.body;
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
            res.status(400).json(err);
        } else {
            res.status(200).json(`mail sent ${info.response}`);
        }
    })
    
});

module.exports = router;