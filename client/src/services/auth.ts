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


const changePassword = (data: any) => {
    return new Promise((resolve, reject) => {

        axios.patch("/auth/reset", data).then(() => resolve("password has been updated")).catch((err) => {
            if (err.response.status === 500) {
                return reject("Sorry,Internal Server Error!");
            }

            else {
                return reject("Invalid or Expired Token");
            }
        })

    });
}
export {
    loginUser, resetPasswordOtpSender, checkValidOtp,changePassword
}