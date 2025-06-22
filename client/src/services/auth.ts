import axios from "./axios"

const loginUser = (credentials: { email: string, password: string }) => {
    return new Promise((resolve, reject) => {

        axios.post("/auth/login", credentials).then(res => {
            if (res.status === 200) {
                resolve(res.data);
            }
        })

            .catch(err => {
                reject(err.response.data);
            })


    })
}



const resetPasswordOtpSender = (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post("/auth/reset", data).then(res => resolve(res)).catch(err => reject(err.response));
    })
}


const checkValidOtp = (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post("/auth/reset/check", data).then(res => {
            resolve(res);
        }).catch(err => reject(err.response));
    })
}
export {
    loginUser, resetPasswordOtpSender, checkValidOtp
}