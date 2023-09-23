class TeacherController{

    static displayTeacher=async(req,res)=>{
        try {
            res.send('display teacher')
        } catch (error) {
            console.log(error)
        }
    }
    
}
module.exports=TeacherController