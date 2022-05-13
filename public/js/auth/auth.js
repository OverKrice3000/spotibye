
let refresh_token = 'AQC6TQh_U7lMCJgWZAudN6LqdGYU7v01e7fhmrT_Qf2hZQ8W6Jb7QgcN6nPxBwWfNKSLW9kFJ4w17dxRm0ssD7njgQ7eKN3MYei2CqK1F1Ldsec-SrPHRTBLUSzmxHnv6XQ'
export let access_token = 'BQCA3RlFwl_jpCfu6t7_CSfEFuItjRj_0UiTWL8YjDgRTpiIVhXI94J8xRXlZDnw34xnCCHt8m17WPhvA2KKXa99hFnqsuRk8OYsEc4LNsMtpxU2vAFYw3xqNi3YJ630LSvJI9cMFEHGt7MhNQrcwW8DJMjTLNu41u_DTg'
let client_id = '8c1911231cdb4965813de8bded49a19d'
let client_secret = 'd830830d45044e95b4e9b1730cfdc914'

/**
 * This function receives new access token by sending refresh token to api endpoint
 * @returns {Promise<string>} a Promise with access token string
 */
async function get_tokens_through_refresh_token(){
    return fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(client_id + ":" + client_secret)
        }
    }).then((response) => response.json())
        .then((resp_json) => resp_json["access_token"])
}

/**
 * This function updates access token variable value
 */
export async function update_access_token(){
    access_token = await get_tokens_through_refresh_token()
}
