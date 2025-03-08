import { User } from "../models/User.model.js"

const getUser = async(searchinput)=>{
    try{
        return await User.findOne({
            $or: [
                {user_id: searchinput},
                {user_name: searchinput},
                {user_email: searchinput},
            ]
        }).lean();
    }catch(err){
        throw err;
    }
}

export { getUser};