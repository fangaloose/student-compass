import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Spinner from "../../components/spinner/spinner.component";
import { changeAuth, UserState } from "../../features/user/userSlice";
import AuthService from "../../service/auth.service";

const LogoutPage=()=>{
    const dispatch = useAppDispatch();
    const history=useHistory();
    
    useEffect(()=>{

        const _logout=async ()=>{
            const user:UserState =await AuthService.logout();
            dispatch(changeAuth(user))
            history.push('/')
        }

        _logout()
        
    })

    return(<Spinner></Spinner>)

}

export default LogoutPage