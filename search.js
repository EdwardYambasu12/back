const api = "./details.js"
const axios = require("axios")
const express = require("express")

const search = express.Router()


search.get("/search", async(req, res)=>{
try{

              const {term} = req.query
             

       const response = await axios.get('https://www.fotmob.com/api/search/suggest', {
  params: {
    'hits': '50',
    'lang': 'en',
    'term': term
  },
  headers: {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': '_cc_id=fd3b698f700d90530b559e2e0982d514; _pubcid=e0c28140-8d67-4033-a102-155ad81db4e4; _pubcid_cst=zix7LPQsHA%3D%3D; _au_1d=AU1D-0100-001718667612-LQHKCG03-USAL; _ga=GA1.1.2119553545.1718667549; _ga_SQ24F7Q7YW=GS1.1.1720792900.1.0.1720792905.0.0.0; _ga_K2ECMCJBFQ=GS1.1.1720792846.1.0.1720792906.0.0.0; g_state={"i_p":1726823972069,"i_l":4}; panoramaId_expiry=1724708892203; u:location=%7B%22countryCode%22%3A%22LR%22%2C%22ccode3%22%3A%22LBR%22%2C%22timezone%22%3A%22Africa%2FMonrovia%22%2C%22ip%22%3A%2241.57.95.47%22%7D; FCNEC=%5B%5B%22AKsRol-sQ-RjmYWGyjW5w51Q6zYgt_DSq2UJR9mSaZsxN-FKEGxyOTLCQXHxPR3RhTP6UaQFEmmhG2QenF7h0D0-XA7vc-0YH4YfFvcWxtYdKqgf3pYDqFdNHpNnwYYpL96fMtOPEjeU4LkqQDRE7C732EAVW5E2kg%3D%3D%22%5D%5D; _ga_G0V1WDW9B2=GS1.1.1724652315.17.1.1724653142.0.0.0; __gads=ID=92d5d724039964be:T=1718667552:RT=1724653145:S=ALNI_MaDE1K0PYrz7DyLAYDwmlqRSaVU4w; __gpi=UID=00000e3edcb15e28:T=1718667552:RT=1724653145:S=ALNI_MbTHt_CqKudRyJHJ7GDrOBF642EAg; __eoi=ID=a1c3f7154f50fa8b:T=1718667552:RT=1724653145:S=AA-AfjZ02jQeU68iiwfAT-o6Usbz',
    'priority': 'u=1, i',
    'referer': 'https://www.fotmob.com/',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/128.0.0.0',
    'x-fm-req': 'eyJib2R5Ijp7ImNvZGUiOjE3MjQ2NTMxNTYwOTB9LCJzaWduYXR1cmUiOiIwMkIwRjI5MzM0NkI5RDhEMTM3ODhEM0QzQUVBM0VFMiJ9'
  }
});

       res.json(response.data)

     }

     catch (e){
      console.log(e)
     }
       
})

module.exports = search