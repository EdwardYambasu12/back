const express = require("express")
const axios = require("axios")

const matches = express.Router()



matches.get("/match", (req, res)=>{


	const {date, time_zone, code} = req.query

	const match_fetch = async()=>{

		try{


	const response = await axios.get('https://www.fotmob.com/api/matches', {
  params: {
    'date': date,
    'timezone': time_zone,
    'ccode3': code
  },
  headers: {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': '_cc_id=fd3b698f700d90530b559e2e0982d514; _pubcid=e0c28140-8d67-4033-a102-155ad81db4e4; _pubcid_cst=zix7LPQsHA%3D%3D; _au_1d=AU1D-0100-001718667612-LQHKCG03-USAL; _ga=GA1.1.2119553545.1718667549; _ga_SQ24F7Q7YW=GS1.1.1720792900.1.0.1720792905.0.0.0; _ga_K2ECMCJBFQ=GS1.1.1720792846.1.0.1720792906.0.0.0; g_state={"i_p":1726823972069,"i_l":4}; u:location=%7B%22countryCode%22%3A%22LR%22%2C%22ccode3%22%3A%22LBR%22%2C%22timezone%22%3A%22Africa%2FMonrovia%22%2C%22ip%22%3A%2241.57.95.17%22%7D; panoramaId_expiry=1724708892203; __gads=ID=92d5d724039964be:T=1718667552:RT=1724622850:S=ALNI_MaDE1K0PYrz7DyLAYDwmlqRSaVU4w; __gpi=UID=00000e3edcb15e28:T=1718667552:RT=1724622850:S=ALNI_MbTHt_CqKudRyJHJ7GDrOBF642EAg; __eoi=ID=a1c3f7154f50fa8b:T=1718667552:RT=1724622850:S=AA-AfjZ02jQeU68iiwfAT-o6Usbz; FCNEC=%5B%5B%22AKsRol_65fl2BCam6CtxfePKpLRkPdUO_bwsgl9frt0WdHBRsObInsSnmx9f2c_PGGuz1azHY1cMpbQtdX0g6VpNnYhGitSBd9Kd1KeUU6VO328_HrIsBJbMMy8gpRR-uRCGaLQixc5IphO8HBJPlyqjPVp6BnDF1A%3D%3D%22%5D%5D; _ga_G0V1WDW9B2=GS1.1.1724622480.11.1.1724622929.0.0.0',
    'if-none-match': '"124nd1hpwk06500"',
    'priority': 'u=1, i',
    'referer': 'https://www.fotmob.com/',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/128.0.0.0',
    'x-fm-req': 'eyJib2R5Ijp7ImNvZGUiOjE3MjQ2MjI5Mjk4MTJ9LCJzaWduYXR1cmUiOiIyNkI4MjhBNjgxQTlDOTI3QTVBNzdDMUNFQzFBOTQ4MCJ9'
  }


});

	res.json(response.data)
}
catch(e){
	console.log(e)
}
}





match_fetch()
})



matches.get("/all_leagues", (req, res)=>{


const league_fetch = async()=>{

	try{
	const response = await axios.get('https://www.fotmob.com/api/allLeagues', {
  params: {
    'locale': 'en',
    'country': 'LBR'
  },
  headers: {
    'x-fm-req': 'eyJib2R5Ijp7ImNvZGUiOjE3MjQ2Mjc1NzY3MzN9LCJzaWduYXR1cmUiOiI2Q0FFMDlBMUI2Q0MwRUEzRDNFODc1NDVFMEJEQUI5RCJ9',
    'Referer': 'https://www.fotmob.com/?date=20240825',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/128.0.0.0'
  }
});


		res.json(response.data)
}
catch(e){
	console.log(e)
}
}

league_fetch()

})



matches.get('/proxy', async (req, res) => {
  const { url, w, q } = req.query;
  try {
    const response = await axios.get('https://www.fotmob.com/_next/image', {
      params: {
        url,
        w,
        q,
      },
      headers: {
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128"',
        'Referer': 'https://www.fotmob.com/',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0',
        'sec-ch-ua-platform': '"Windows"',
      },
      responseType: 'arraybuffer', // If you need to get binary data (like an image)
    });
    res.set('Content-Type', response.headers['content-type']);
  
    res.send(response.data);

  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});

matches.get('/roxy', async (req, res) => {
  const { url, w, q } = req.query;
  try {
    const response = await axios.get('https://www.fotmob.com/_next/image', {
      params: {
        url,
        w,
        q,
      },
      headers: {
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128"',
        'Referer': 'https://www.fotmob.com/',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0',
        'sec-ch-ua-platform': '"Windows"',
      },
      responseType: 'arraybuffer', // If you need to get binary data (like an image)
    });
    res.set('Content-Type', response.headers['content-type']);
  
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});

matches.get('/player_pic', async (req, res) => {

 const { url, w, q } = req.query;
  try {
    const response = await axios.get('https://www.fotmob.com/_next/image', {
      params: {
        url,
        w,
        q,
      },
      headers: {
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128"',
        'Referer': 'https://www.fotmob.com/',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0',
        'sec-ch-ua-platform': '"Windows"',
      },
      responseType: 'arraybuffer', // If you need to get binary data (like an image)
    });
    res.set('Content-Type', response.headers['content-type']);
  
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }


});




module.exports = matches