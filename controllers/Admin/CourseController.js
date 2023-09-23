const CourseModel = require("../../models/Course")
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'ddc3epubs',
    api_key: '433914787825219',
    api_secret: 'J0gZRtPMMvc70LUC9QNTlgpBNjI'
});

class CourseController {

    static addcourse = async (req, res) => {
        try {
            const { name, email, image, role } = req.data1
            const odata = await CourseModel.find()
            res.render('admin/course/addcourse', { n: name, img: image, role, role, o: odata })
        } catch (error) {
            console.log(error)
        }
    }
    static courseinsert = async (req, res) => {
        try {
            const { cname } = req.body
            const result = new CourseModel({
                cname: cname,
            })
            await result.save()
            // console.log(result)
            res.redirect('/admin/addcourse')
        } catch (error) {
            console.log(error)
        }
    }
    static courseview = async (req, res) => {
        try {
            // console.log(req.params.id)
            const { name, email, image, role } = req.data1
            const odata = await CourseModel.findById(req.params.id)
            console.log(odata)
            res.render('admin/course/view', { n: name, img: image, role: role, o: odata })
        } catch (error) {
            console.log(error)
        }
    }
    static courseedit = async (req, res) => {
        try {
            const { name, email, image, role } = req.data1
            const odata = await CourseModel.findById(req.params.id)
            res.render('admin/course/edit', { n: name, img: image, role: role, o: odata })
        } catch (error) {
            console.log(error)
        }
    }
    static coursedelete = async (req, res) => {
        try {
            const {name,email}=req.data1
            const odata = await CourseModel.findByIdAndDelete(req.params.id)
            res.redirect('/addcourse')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = CourseController