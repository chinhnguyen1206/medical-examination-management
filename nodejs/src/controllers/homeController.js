import db from '../models/index'
import CRUDServices from '../services/CRUDServices'

let getHomePage = async (req,res) => {
    try{
        let data = await db.User.findAll()

        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        })
    }catch(e) {
        console.log(e)
    }

}

let getCRUD =  (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async(req, res) => {
    let message = await CRUDServices.createNewUser(req.body)
    console.log(message)

    return res.send('post crud from server')
}

let displayGetCRUD = async(req,res) => {
    let data = await CRUDServices.getAllUser()
    console.log('--------------------')
    console.log(data)
    console.log('--------------------')

    return res.render('displayCRUD.ejs',{
        dataTable: data
    })
}

let getEditCRUD = async (req,res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDServices.getUserInfoById(userId)
        //check user data not found
        return res.render('editCRUD.ejs', {
            user: userData[0]
        })
    }
    else{
        return res.send('User not found!')
    }
}

let putCRUD = async (req,res) => {
    let data = req.body
    let allUser = await CRUDServices.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

let deleteCRUD = async (req,res) => {
    let id = req.query.id
    if(id) {
        await CRUDServices.deleteUserById(id)
        return res.send('Delete the user succed!')
    }
    else{
        return res.send('User not found!')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
} //dùng để xuất hàm, biến hoặc object từ file này sang file khác để dùng lại tỏng nodejs
//nói cách khác, nó cho phép filekasc import váuwr dụng cde của file hiện tại