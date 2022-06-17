
let refresh_token = 'AQC6TQh_U7lMCJgWZAudN6LqdGYU7v01e7fhmrT_Qf2hZQ8W6Jb7QgcN6nPxBwWfNKSLW9kFJ4w17dxRm0ssD7njgQ7eKN3MYei2CqK1F1Ldsec-SrPHRTBLUSzmxHnv6XQ'
export let access_token = 'token'
let client_id = '8c1911231cdb4965813de8bded49a19d'
let client_secret = 'd830830d45044e95b4e9b1730cfdc914'

/**
 * This function updates access token by sending refresh token to api endpoint
 * @returns {Promise<string>} a Promise with access token string
 */
export async function update_access_token(){
    return fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(client_id + ":" + client_secret)
        }
    }).then((response) => {
        if(response.status === 200){
            return response.json();
        }
        return Promise.reject("failed to query access token")
    })
        .then((resp_json) => {
            access_token = resp_json["access_token"]
            return Promise.resolve()
        } , error => Promise.reject(error))
}

