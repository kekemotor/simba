const API  = ' http://localhost:3000/'
const HEADERS = {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer `+localStorage.access,
                    refresh : localStorage.refresh,
                    accessToken : localStorage.access
                }

async function requester (method, url, body){
  try{
    console.log(body)
     const res = await axios[method.toLowerCase()](API+url, body? body : {headers : HEADERS}, { headers: HEADERS}, ).then(async (res)=>{
     
      return res.data
     }).catch(e=>{
      console.log(e)
      return {e:e.response.data.message, isE: true}
     })
     
    //  if(res.statusCode===203){
    //     const res  = await axios.post(API+"refreshRefreshtoken/refreshToken",{refreshToken:localStorage.refresh},{headers:HEADERS})
    //     if(res.data.statusCode ===201){
    //       console.log(res.data.newAccessToken,res.data.newRefreshToken)
          
    //       localStorage.access = await res.data.newAccessToken
    //       localStorage.refresh =await  res.data.newRefreshToken
    //       HEADERS.refresh = localStorage.refresh
    //       HEADERS.access =  localStorage.access
    //       body.userToken = localStorage.access
    //     }
        
    //      return requester(method,url,body)
    //  }
     return res
  }catch(e){
      console.log(e)
      return {e:e.message, isE: true}
  }

  }
