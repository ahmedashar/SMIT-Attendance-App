window.sucessAlert = function(successfulMessage){  // onclick="sweetAlert('good feeling')"
    Swal.fire({
        icon: 'success',
        title: successfulMessage,
        showConfirmButton: false,
        timer: 1500
      })
}

// window.errorAlert = function (errorMessage){  // onclick="errorAlert('good feeling')"
//     Swal.fire({
//         icon: 'error',
//         title:errorMessage,
//         text: 'Something went wrong!',
//         // footer: '<a href="">Why do I have this issue?</a>'
//       })
// }
import {firebaseSignIn} from './firebase.js'

window.loginAdmin = async function(){
    let email = document.getElementById('admin_email').value;
    let password = document.getElementById('admin_password').value;
    try{
        await firebaseSignIn(email,password)
        let errorMsg = document.getElementById('error_msg')
        errorMsg.innerText = '';
        
        window.location = './home/home.html'
    }
    catch(e){
    let errorMsg = document.getElementById('error_msg')
    errorMsg.innerText = e.message;
   
    }


}
