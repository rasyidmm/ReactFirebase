import firebase from '../../firebase'
import {database} from '../../firebase'

export const actionUserName=()=>(dispatch)=>{
    setTimeout(()=>{
        return dispatch({type:'CHANGE_USER',value:'Berubah ranger merah'})
    },2000)
}


export const registerUserAPI=(data)=>(dispatch)=>{
    console.log(data);
    return new Promise((resolve,reject)=>{
        dispatch({type:'CHANGE_LOADING',value:true})
        console.log(data);
        firebase.auth().createUserWithEmailAndPassword(data.email,data.password).then(res=>{
            console.log('sukses',res);
            dispatch({type:'CHANGE_LOADING',value:false})
            resolve(true)
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode);
            console.log(errorMessage)
            dispatch({type:'CHANGE_LOADING',value:false})
            reject(false)
        })
    })
}

export const loginUserAPI=(data)=>(dispatch)=>{
    console.log(data);

    return new Promise((resolve,reject)=>{
        dispatch({type:'CHANGE_LOADING',value:true})
        firebase.auth().signInWithEmailAndPassword(data.email,data.password).then(res=>{
            // console.log('sukses',res);
            const dataUer={
                email:res.user.email,
                uid:res.user.uid,
                emailVerified:res.user.emailVerified,
                refreshToken: res.user.refreshToken
            }
            dispatch({type:'CHANGE_LOADING',value:false})
            dispatch({type:'CHANGE_ISLOGIN',value:true})
            dispatch({type:'CHANGE_USER',value:dataUer})
            resolve(dataUer)
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode);
            console.log(errorMessage)
            dispatch({type:'CHANGE_LOADING',value:false})
            dispatch({type:'CHANGE_ISLOGIN',value:false})
            reject(false)
        })
    })
}

export const addDataToAPI=(data)=>(dispatch=>{
    database.ref('notes/'+data.userId).push({
        title:data.title,
        content:data.content,
        date:data.date
    })

})

export const getDataFromAPI = (userId)=>(dispatch)=>{
    const urlNotes = database.ref('notes/'+ userId);
    return new Promise((resolve,reject)=>{
        urlNotes.on('value',function(snapshot) {
            // updateStartCount(postElement,snapshot.val())
            const data = [];
            Object.keys(snapshot.val()).map(key=>{
                data.push({
                    id:key,
                    data:snapshot.val()[key]
                })
            });
            // const data = Object.keys(snapshot.val())
            // console.log('getdata :' ,snapshot.val());
            dispatch({type:'SET_NOTES',value:data})
            resolve(snapshot.val())
        })
    })
}
export const updateDataAPI = (data)=>(dispatch)=>{
    const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve,reject)=>{
        urlNotes.set({
            title:data.title,
            content:data.content,
            date:data.date
        }, (err)=>{
            if(err){
                reject(false)
            }else{
                resolve(true)
            }
        })
    })
}
export const deleteDataAPI = (data)=>(dispatch)=>{
    const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve,reject)=>{
        urlNotes.remove()
    })
}
