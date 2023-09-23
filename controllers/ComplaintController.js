const ComplaintModel = require('../models/Complaint')
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer')

cloudinary.config({
    cloud_name: 'ddc3epubs',
    api_key: '433914787825219',
    api_secret: 'J0gZRtPMMvc70LUC9QNTlgpBNjI'
});

class ComplaintController{

    static addcomplaint = async (req, res) => {
        try {
            const { name, email, role, image, id } = req.data1
            const cdata = await ComplaintModel.find({user_id:id})
            res.render('complaint/addcomplaint',{ c: cdata, n: name, role: role, img:image })
        } catch (error) {
            console.log(error)
        }
    }
    static complaintinsert = async (req, res) => {
        try {
            const { name, email, role, image, id } = req.data1
            // console.log(req.body)
            // console.log(req.files.image)
            const { ctype, semester, subject, cdetail, user_id }= req.body
            const complaint = await ComplaintModel.findById(id)
            // console.log(id)
            const file = req.files.image
            const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'complaint Image'
            })
            const result = new ComplaintModel({
                name: name,
                email: email,
                ctype: ctype,
                cdetail: cdetail,
                semester: semester,
                subject: subject,
                user_id: id,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url,
                }
            })
            await result.save()
            this.sendEmail1(name, email, ctype)
            // console.log(result)
            res.redirect('/addcomplaint')
        } catch (error) {
            console.log(error)
        }
    }
    static viewcomplaint = async (req, res) => {
        try {
            // console.log(req.params.id)
            const { name, email, role, image, id } = req.data1
            // console.log(req.params.id)
            const cdata = await ComplaintModel.findById(req.params.id)
            // console.log(cdata)
            res.render('complaint/view',{ c: cdata,img:image, n: name, role: role})
        } catch (error) {
            console.log(error)
        }
    }
    static editcomplaint = async (req, res) => {
        try {
            const { name, email, role, image } = req.data1
            // console.log(req.params.id)
            const cdata = await ComplaintModel.findById(req.params.id)
            // console.log(data)
            res.render('complaint/edit', { c: cdata, n: name, role: role, img: image})
        } catch (error) {
            console.log(error)
        }
    }
    static updatecomplaint = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.files.image)
            const { name, email, password ,cdetail} = req.body
            const hashpassword = await bcrypt.hash(password, 10)
            if (req.files) {
                // image delete code
                const complaint = await ComplaintModel.findById(req.params.id)
                const imageid = student.image.public_id
                // console.log(imageid)
                await cloudinary.uploader.destroy(imageid)
                // image update
                const file = req.files.image
                // image upload code
                const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'complaint Image'
                })
                var data = {
                    name: name,
                    email: email,
                    password: hashpassword,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url,
                    }
                }
            } else {
                var data = {
                    name: name,
                    email: email,
                    password: hashpassword,
                }
            }
            const id = req.params.id
            await ComplaintModel.findByIdAndUpdate(id, cdata)
            req.flash('success', 'update successfully')
            res.redirect('/complaint/addcomplaint')
        } catch (error) {
            console.log(error)
        }
    }
    static complaintdelete = async (req, res) => {
        try {
            const {name,email}=req.data1
            const cdata = await ComplaintModel.findByIdAndDelete(req.params.id)
            res.redirect('/addcomplaint')
        } catch (error) {
            console.log(error)
        }
    }
    static updatestatus = async (req,res)=>{
        try {
            const {name, email, comment, status} = req.body
            // console.log(req.body)
            await ComplaintModel.findByIdAndUpdate(req.params.id,{
                comment:comment,
                status:status
            })
            this.sendEmail(name,email,comment,status)
            res.redirect('/displaycomplaint')
        } catch (error) {
            console.log(error)
        }
    }
    static sendEmail = async(name, email, comment, status)=> {
        //console.log("email sending")
        //console.log("propertyName")
        // console.log(name,email,comment,status)

        // connect with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "uprety1999@gmail.com",
                pass: "epoa eray uqaf clbe",
            },
        });
        let info = await transporter.sendMail({
            from:"test@gmail.com", //sender address
            to: email, //list of receivers
            subject: `Complaint ${status} Successfully`, //Subject line
            text: "hello", //plain text body
            html: `<b>${name}</b> Complaint <b>${status}</b> successfully !Complaint <b>${comment}</b>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
    }
    static sendEmail1 = async(name, email, ctype)=> {
        //console.log("email sending")
        //console.log("propertyName")
        console.log(name,email,ctype)

        // connect with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "uprety1999@gmail.com",
                pass: "epoa eray uqaf clbe",
            },
        });
        let info = await transporter.sendMail({
            from:"test@gmail.com", //sender address
            to: email, //list of receivers
            subject: `Complaints send Successfully`, //Subject line
            text: "hello", //plain text body
            html: `<b>${name}</b> Complaint <b>${ctype}</b> successfully !please wait for response`, // html body
        });
        console.log("Message sent: %s", info.messageId);
    }

   
    
}



module.exports = ComplaintController