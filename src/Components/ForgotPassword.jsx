import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { database } from "./Firebase";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function ForgotPassword(){
    const history = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const emalVal = e.target.email.value;
        sendPasswordResetEmail(database,emalVal).then(data=>{
            // alert("Check your gmail")
            swal({
                title: "Success!",
                text: "Recovery mail sent to your email",
                icon: "success",
                button: "Ok",
              });
            history("/")
        }).catch(err=>{
            alert(err.code)
        })
    }
    return(
        <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center text-gray-900">Forgot Password</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Reset Password
                </button>
                </form>
            </div>
        </div>

    )
}
export default ForgotPassword;