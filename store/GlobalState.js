import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fetchData";
export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const initialState = {
        notify: {},
        auth: {}
    }

    useEffect(()=>{
        const firstLogin = localStorage.getItem("firstLogin");
        if(firstLogin){
            getData('auth/accesToken').then(res => {
                if(res.err) return localStorage.removeItem("firstLogin")
                dispatch({
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        user:res.user
                    }
                })
            })
        }
    },[])

    const [state,dispatch] = useReducer(reducers, initialState);
    return(
        <DataContext.Provider value = {{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}