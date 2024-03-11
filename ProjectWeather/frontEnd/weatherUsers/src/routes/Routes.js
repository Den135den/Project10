import FirstPage from "../components/FirstPage/FirstPage";
import SecondPage from "../components/SecondPage/SecondPage";



export const RouteUser = [

    {
        id:1,
        path:'/',
        components: <FirstPage/>
    },

    
    {
        id: 2,
        path:'/secondPage',
        components: <SecondPage/>
    },
   
     
]


export const LinkUser = [
    {
        id:1,
        to:'/',
        value:'First'
    },

    {
        id: 2,
        to:'/secondPage',
        value:'Second'
    },

  
   
]