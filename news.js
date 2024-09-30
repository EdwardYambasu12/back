const express = require("express")
const axios = require("axios")
const mongoose = require("mongoose")

const bodyParser = require('body-parser');
const news = express.Router()
// Increase the limit for JSON payloads
news.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed

// For URL-encoded payloads
news.use(bodyParser.urlencoded({ limit: '1550mb', extended: true })); // Adjust the limit as needed


news.get("/sportsup_news", async(req, res)=>{

try{
	console.log(req.query.page)

const response = await axios.get('https://www.fotmob.com/api/worldnews', {
  params: {
    'lang': 'en',
    'page': req.query.page
  },
  headers: {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': '_cc_id=c8c6179c3962460a30e12119dd8cf3ee; g_state={"i_p":1728177707886,"i_l":4}; psession=wr0pDoFBqpxEeO_3PtBKxw.SL1dzPqDCxI1Jy7NA3xtGWNFmEIV9MUUQQ630G-auJY.1725758879931.2592000000.3Chzlf8p0ISQ0lp6e0V7vItW7eVpofXd8VLqm98eQRU; fbuser=%7B%22displayName%22%3A%22Edward%20S.%20Yambasu%22%2C%22name%22%3A%22Edward%20S.%20Yambasu%22%2C%22image%22%3A%22https%3A%2F%2Fplatform-lookaside.fbsbx.com%2Fplatform%2Fprofilepic%2F%3Fasid%3D474237165603592%26height%3D50%26width%3D50%26ext%3D1728350892%26hash%3DAbYTvrYFwoySp8zxRDmG5FLh%22%2C%22id%22%3A%22474237165603592%22%7D; user=wPnCBVh4ZrrQVKDphRpCpw.0qwZuMMXUr5GxyhXPT3MuAQm3ppe77ct1lFeCLzp-4tetoXqghtlhbFD31BUlpML3voNVDQt6Z7RIQyplA4PrIja5Zr4nqUxCQnT7ZWKhwx388PLYcTCIqt4yLNNohGJV4IxVngOAnnqIk8TTn0yspbbr1HAh24aGnEeSIOb4uivB9AQUvw0XBS9_d9GLcSzMNgYT1uIpqn2-6iaqEjov3JP7Fy5rnUVMKnWv3tKMNqhXqnAyknthQILiI9f2mrBwgLH-TkQql8z5D41_dDC7vi5oYjU_u0roZdUd09wqBv8kw5zMxG0C2CxspOocAtB-tpJt_nkA6sc9qmIjfG0FMr9Ns11OzABoaAV5F_7mLJH0P447PEw1qIVE3iZ8xCF0EKtDzE7gAjWpOpZY4DyuHExIvRmpxWqjDzT5JkD_PXq2qTG25j8rNGcD0GUyvu6w_D6yfgpJwdQeU5-XupXN5VcoGuOzXFfJnBSrzxHOGHKZrGzHgEnovTcRxQir-n2emc1c4xey3yBlf7D0sDJI5tXcgJdDg2R99EtgZUy45nKuhgojI-KZhHxcF_WF2Ib9HfDuM5EnQbcvRoN-Fak2YU5P0aJ-wcaCoHApe_pcutxwXqe49BwIBjZT8_qALlAuTEgn_9lmu3-A6C_EOY6YesgMvXpLUO7YYW7uiOd1XfED7P2eVS6GHqVjeqobVnGCR2Ct4NYAxSskDgcPR6409g_IOH_deXe1G0__5yW8NqkbGn3J605zq6wXq80yi3ik5X4P1wHC4kp8N2zsec0gy8M18D3Exyi2CyyEKF1cuy-KHqjToiXbPd3WZ-9WmoKx5fauWo3jyj65S0JMiNT8ilRr_7dRpLMrZQ05xJuqYsg6L1rSDTlIDZcPApJ-3mYl63ccdHwkPaF-e7l4_St5NgVaAENf3GDueOiRouErVBSgZBLfiOomLUjJ3SAzPe0fv_tYzQzSPkosKDaz-a2hK4KwA7boTePmP1CPo69HkhLsjbz05c4Ruo20hu0ttPOqdQtE1vB0ideYUpnqsQEE9gDQu-ICLut_hSj00F1-Ly4HlZ8ESGu8A2YDQyqfvnRs5P8_I-lWwn7BwtTbvIjT3itw8QQOjpJnzfFD0FizG3q55eYqF4OpbKb8mRO6vjF649jUQHGk_uQti0RSzmtqDUUxS5P87Hr5Ezkfztc8vfJMCOUnt8B8mYT_lM_kUJDTXqJ8U_WKtmfhyJjWUresacGshENIfj-pQT9BU-gxbw1AVhrzQsyOFYqGkjYWBIPtmGzDRd79IGF_H0KJGNNgOKsN33LADG_t6a5YFE-FbRzXDvRRfBVXAjwhBYOA9vxkFW1g7l1HMShNj0b_aSAvBiXNT7ETiwgqjajVjNsfDJI-hISI6rtfgS-exMbvezgzRvwZJufmS9CMjeHbnp0VDfE9jDovZyrLJqdYwrm626ThF9HLe94ksYTQwdFhVAKwJEbT5HtG03v31pnsbCoU3W3fz5ibqbMAO9sexXt6GHuV0rklTXoLfV0xsWPT70asgBqChB8cWVkX9UKaEnLCy3B-R0WgnofUQN7dsaq752oNUws2hyYeOMyIJG5jrxXr9SaxjuDqz7ejd2uRe0oJLgzMKX_1uK_ZtHxmC_TjEWdTmABOlO1Twtor2_vqOziF0Hh1D1fupit8tUbUU_giXQQt55aUTsqyitn31QtkgRnrEBjMEUlBAStERTplgN3MEezmVq0C11hdjD8hmsoddFwgI9jlzWtV_ycRoHSN0VTgLZ5gjSCKykXkadzArvMmmfyY2Slsuya3OizYT9XmKOroYJiI4lTlZfT8wD6Hbw0OlmrAeS0ObazjTvu0X4DW6GnvkTejRnZmyTQB3d07DPRd0lUWQSrC6dQrvo0Hb31arKJCFhEHhojhxBqJFfznaRPxtE7r0zHHgXZIaZTzoVs1N_n3Jmk6NpsFpZgEclhSFSlK3Vhvyx54iywqsRL.1725758892291.2592000000.u6Jks7LtNJRyTCnvKd6n88O5juBf7D6ccMmGqkfwcbk; _ga=GA1.1.1197639636.1720874154; _ga_SQ24F7Q7YW=GS1.1.1725760073.11.1.1725760993.0.0.0; _ga_K2ECMCJBFQ=GS1.1.1725760071.11.1.1725760993.0.0.0; panoramaId_expiry=1725913126515; u:location=%7B%22countryCode%22%3A%22LR%22%2C%22ccode3%22%3A%22LBR%22%2C%22timezone%22%3A%22Africa%2FMonrovia%22%2C%22ip%22%3A%2241.57.95.107%22%7D; __gads=ID=9828ff5d7c2cd946:T=1720874168:RT=1725904107:S=ALNI_MaUS8lEc4ApqGrphdQQTv9ETkycaA; __gpi=UID=00000e8802ba87fb:T=1720874168:RT=1725904107:S=ALNI_MY5cN5RUAsgtbUfTaQYRYSs8mclVw; __eoi=ID=c8bcf496f47c802e:T=1720874168:RT=1725904107:S=AA-AfjbMK25OSSPf8IUC9Liswzlb; cto_bundle=vHYP9V9adWNZMzk1c1lPamUyNHN4Y21xb2xyWGwlMkZTZGZHTm9FdjA0cyUyQlZNSzhYc2w3bUhmJTJCZDBRSVpyJTJCRjFoamZUT3VPazVQcTdQZGxmTU4lMkJjeVIyRmFWUFY0OExFNkptdCUyRmx0ZWR3RDczYWdUbGtjelVIRzI3MFZXeG54Z3glMkZFaTRwTWR6TCUyRnVENEZtOFVuRlNqYmt2RnV0anBFMVgxcDBkMkl4MzJZU05uMkMlMkJnMXFCdzlTZmJGS0I1ZWl0bVUlMkYzQW1kUVM4bnhjMHNFT1J2RWUyS3lXVGV6U25jRVYyb0dBJTJCZ0FaJTJGVFRUTkd1VCUyRmh2aGxJZ0dEazc5b201cDlJQWk; FCNEC=%5B%5B%22AKsRol_truuMllFKvGpxmvV6dmXJINJvNhGQlHooCSy8ga6yYoCHjQYJqdH-xBXoUKRFjatzcUildWDe2UU7MiH68cX0CVU9EX-_XV0LMomvUCtnNscI-Nx_ZJfurJtdWjtWcF_XKP2ZAvD6q__dzuhYQE4OibmEVA%3D%3D%22%5D%5D; _ga_G0V1WDW9B2=GS1.1.1725904098.39.1.1725906176.0.0.0',
    'priority': 'u=1, i',
    'referer': 'https://www.fotmob.com/news?page=3',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
    'x-fm-req': 'eyJib2R5Ijp7ImNvZGUiOjE3MjU5MDcwODk3Nzd9LCJzaWduYXR1cmUiOiIwMzQxNzQzOTg3QUI1NDJCQzE3MjExODY0RTcwMjg4QSJ9'
  }
});

res.json(response.data)

}

catch(e){
	console.log(e)
}

})



news.get("/top", async(req, res)=>{

	const response = await axios.get('https://www.fotmob.com/_next/data/Pm9s-k1eBdZRV0SAYyMEy/en/news/9r9wvy7lyoal1wgz45t3r8ozo-israel-0-2-italy-frattesi-kean-keep-azzurri-perfect.json', {
  params: {
    'id': '9r9wvy7lyoal1wgz45t3r8ozo'
  },
  headers: {
    'x-nextjs-data': '1',
    'Referer': 'https://www.fotmob.com/news',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  }
});
	res.json(response.data)
})

module.exports = news