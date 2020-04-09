export const actionUserName=()=>(dispatch)=>{
    setTimeout(()=>{
        return dispatch({type:'CHANGE_USER',value:'Berubah ranger merah'})
    },2000)
}