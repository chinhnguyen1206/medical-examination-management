import userServices from "../services/userServices"
let handleLogin = async(req,res) => {
    let email = req.body.email
    let password = req.body.password

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameteter!'
        })
    }

    let userData = await userServices.handleUserLogin(email,password)
    // check email exit
    // compare password
    // return userInfor
    // access_token: JWT json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req,res) => {
    let id = req.query.id 

    if(!id){
        return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameter',
        users: []
    })
    }
    let users = await userServices.getAllUsers(id)
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser= async(req,res) => {
    let message = await userServices.createNewUser(req.body)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    // Đổi req.body.id thành req.query.id
    let id = req.query.id; 

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    
    // Sử dụng biến id vừa lấy từ query
    let message = await userServices.deleteUser(id);
    return res.status(200).json(message)
}

let handleEditUser = async(req,res) => {
    let data = req.body
    let message = await userServices.updateUserData(data)
    return res.status(200).json(message)
}

let getAllCode = async(req,res) => {
    try{
        setTimeout(async()=> {
            let data = await userServices.getAllCodeService(req.query.type);
        return res.status(200).json(data)
        },3000)
    }
    catch(e){
        console.log('Get all code error: ',e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
    })

    }
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
    
}