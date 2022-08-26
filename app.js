 const express = require("express");
const app = express();
const axios = require("axios");
const asyncHandler = require("express-async-handler");
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PATCH, DELETE, PUT"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization, x-zisession, user, session-token, x-ziid, Cookie"
  );

  next();
});

const ANURA_API_ENDPOINT = "https://dozi-staging.zoominfo.com/anura/formComplete/forms";

app.all(
  "/*",
  asyncHandler(async function (req, res) {
    // console.log(req.headers);
    // console.log(`original url: ${req.originalUrl}`);
    // console.log(`method: ${req.method}`);
    // console.log(`path: ${req.path}`);
    // console.log(`query: ${JSON.stringify(req.query)}`);
    // console.log(`body: ${JSON.stringify(req.body)}`);
    // console.log(`headers: ${JSON.stringify(req.headers)}`);

    let requestOptions = {
      method: req.method,
      baseURL: ANURA_API_ENDPOINT,
      headers: {
        "x-zisession":
          "xOaJvqCLqJjbTZhiqafGvPd5VQVyz0mk5Mfe2pjlD_pVKpcCcudh8vGBPbM0nQ3fma0yonJiOcaEjE0Z4pkiuEwpx18a8Oe4gelxg_8YZGdxKzvAVB1bljxWld4KvzFG",
        user: "20029685",
        "session-token": "1",
        "content-type": "application/json",
        "x-ziid":
          "xOaJvqCLqJjbTZhiqafGvPd5VQVyz0mk5Mfe2pjlD_pVKpcCcudh8vGBPbM0nQ3fma0yonJiOcbBv8ko23pWlQ",
        Cookie: "CookieConsent=true; GCP_IAP_UID=105779085696369948742; _y=3de6d580-5142-4459-a86a-a418db30f58c; _shopify_y=3de6d580-5142-4459-a86a-a418db30f58c; oktaMachineId=d59a70db-3de1-dc57-9090-790597c7b050; userZoomCompanyId=10000000; marketingCloudUser=naveen.ramkumar%40zoominfo.com; name=Naveen%20Ramkumar; email=naveen.ramkumar%40zoominfo.com; userEmail=naveen.ramkumar%40zoominfo.com; firstname=Naveen; analyticsId=20029685; doziUser=naveen.ramkumar%40zoominfo.com; totango.heartbeat.last_module=DOZI Staging; userEmail=naveen.ramkumar%40zoominfo.com; GCP_IAAP_AUTH_TOKEN_66269046087E2BCF=eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2MTY0OWU0NTAzMTUzODNmNmI5ZDUxMGI3Y2Q0ZTkyMjZjM2NkODgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDgyNDEwNjkxNDczLWE3ODN1Y2sxZXJoN2N1ZG1kMG42N2poaGd2MW5qMjJzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA4MjQxMDY5MTQ3My1hNzgzdWNrMWVyaDdjdWRtZDBuNjdqaGhndjFuajIycy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNTc3OTA4NTY5NjM2OTk0ODc0MiIsImhkIjoiem9vbWluZm8uY29tIiwiZW1haWwiOiJuYXZlZW4ucmFta3VtYXJAem9vbWluZm8uY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJNNmRtOTB3VVdDOGJQX2RiREMwOU9nIiwiZ29vZ2xlIjp7ImdpYyI6IkFHT281MmhUV1N0YnF6NmJEY0lhemZ6TGFjcVdWczNhWmI0UEtEcjIyXzcyNTdrdE9HSk9UYzViSG05cmtaNzZtTmJtcVNtMXliMG5aR0hUTWMxU2ExOEtYQk9IazI4em9qaEw5b2c5aWFNQlZzSHdycmpvcXN6WFRMWGlpNXotemthWjY4cFZzNUpGY255dWpuV0hUMWRRRk1nR0JDVV9FTUxlLVp5VzFWdVdjWFRWUkctM1dPNkR4T3VEWmJxRjVkdS1PMnY2cTcycE9GVWp6Qm9iakpocHlWRjhfbW00In0sImlhdCI6MTY1MTQ1MjMxOSwiZXhwIjoxNjUxNDU1OTE5fQ.cNqPLY8W3wtBrQp0aNgYFzQ1rC9xg1EFmLxnZk8ud7lKLEQF-PX7Yov3ymCMgTQJikqYJb74gunh_UP5u6bO6qB6F174skdA-w66LQ0rycSsEbVAKDCvTfCU52ZDlaKjHYvLPDZkctsxzdCzNRqrQbnn3H1XFmcyBaptJKM0AX33z_A7Ip8M7wSkCbSBhT7wuurDOrtyGICDEvwlvCX1Sqb8xIxcX4DousNgm6U3N9Y0YXw3Tr17_Q1caUi6TJuwS2zTz7O58jR0pvfIPTqPyq30iT3XtsuVorZ5glQrbQbZNqMF7mLk0ObXbYH_l69PpYG4F3tRKihvAVWwMhlgwg; ssoredirecturl=https%3A%2F%2Fdozi-staging.zoominfo.com%2F%2F%2F%23; ziid=xOaJvqCLqJjbTZhiqafGvPd5VQVyz0mk5Mfe2pjlD_pVKpcCcudh8vGBPbM0nQ3fma0yonJiOcbBv8ko23pWlQ; zisession=xOaJvqCLqJjbTZhiqafGvPd5VQVyz0mk5Mfe2pjlD_pVKpcCcudh8vGBPbM0nQ3fma0yonJiOcaEjE0Z4pkiuEwpx18a8Oe4gelxg_8YZGdxKzvAVB1bljxWld4KvzFG; ziaccesstoken=eyJraWQiOiJjTDliY3NITEM1R3dyRkkzbUw5OUtTcllUZ3pZTjhxeThubm81bEhZcGFRIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkZWRVRtd1FXTFc1ZTJEMUpRNU1KS3NHNzdseGlYQ01Xa1AzUTdqcjJDZXMiLCJpc3MiOiJodHRwczovL3pvb21pbmZvLWNpYW0tc3RhZ2luZy5va3RhcHJldmlldy5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjUxNDgyNTEwLCJleHAiOjE2NTE1MzY1MTAsImNpZCI6IjBvYTIyNGtvendnWlRwSkNNMWQ3IiwidWlkIjoiMDB1MWRvOHoxdDV2MXkwUFgxZDciLCJzY3AiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIl0sImF1dGhfdGltZSI6MTY1MTQ4MjUwOCwiemlVc2VybmFtZSI6Im5hdmVlbi5yYW1rdW1hckB6b29taW5mby5jb20iLCJzdWIiOiJuYXZlZW4ucmFta3VtYXJAem9vbWluZm8uY29tIiwiZmlyc3ROYW1lIjoiTmF2ZWVuIiwibGFzdE5hbWUiOiJSYW1rdW1hciIsInppU2Vzc2lvblR5cGUiOi0zLCJ6aUdyb3VwSWQiOjAsInppVXNlcklkIjoyMDAyOTY4NSwiemlUZW5hbnRJZCI6MTAwMDAwMDAsImVtYWlsIjoibmF2ZWVuLnJhbWt1bWFyQHpvb21pbmZvLmNvbSIsInppTW9uZ29Vc2VySWQiOiIyMDAyOTY4NSIsInppUGxhdGZvcm1zIjpbIlJFQ1JVSVRFUiIsIk1BUktFVElORyIsIkRPWkkiLCJBRE1JTiIsIkVOR0FHRSIsIlpJIENIQVQiXX0.NqVHHm1Qs42fswlGhhvFNaMxYl0a_FeGJVl0EHkMlvuqRXqjotRbROwUCZE-rBuHm5jk5YBhnw_FLPXM9eOXlZepUA3jedkCPFUephwzFRONnksdG_I7aBN-Cdl6Bll0qSY5ljgcJYTJ1oCJI8-965jOXVhZUQ309h2J3Vl00dAYGQbPEIZcxY8vt07zJqudj96Qx-iUqKf8lPrN6G2W5KtJp8OQ1OF34P0vM198fGX5p1veiVTYW9HQ9V3pdhCp7s57zrygmJcp1MIrE2M1i5evCxvwOyZ9HImnR5orgZDkGv7FNr5b3xAQ-mYbWGStUxZDO5LFDaFc5uDjyA5AtQ; parseSessionToken=1; userId=20029685; totango.heartbeat.last_ts=1651483162108; _dd_s=rum=0&expire=1651484069596; amplitude_id_6df4d4fa782dba3adb6191a1b24e4b4fzoominfo.com=eyJkZXZpY2VJZCI6IjM0NTRiNmExLTQyMDktNDE0My1iYjQ1LWY5YzgxODEzZGQ4NFIiLCJ1c2VySWQiOiIyMDAyOTY4NSIsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTY1MTQ4MjQzMTcxOSwibGFzdEV2ZW50VGltZSI6MTY1MTQ4MzE3MjI0NiwiZXZlbnRJZCI6MTU4LCJpZGVudGlmeUlkIjo5Niwic2VxdWVuY2VOdW1iZXIiOjI1NH0=",
        "content-type": "application/json",
          "x-ziaccesstoken" :
          "eyJraWQiOiJjTDliY3NITEM1R3dyRkkzbUw5OUtTcllUZ3pZTjhxeThubm81bEhZcGFRIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkZWRVRtd1FXTFc1ZTJEMUpRNU1KS3NHNzdseGlYQ01Xa1AzUTdqcjJDZXMiLCJpc3MiOiJodHRwczovL3pvb21pbmZvLWNpYW0tc3RhZ2luZy5va3RhcHJldmlldy5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjUxNDgyNTEwLCJleHAiOjE2NTE1MzY1MTAsImNpZCI6IjBvYTIyNGtvendnWlRwSkNNMWQ3IiwidWlkIjoiMDB1MWRvOHoxdDV2MXkwUFgxZDciLCJzY3AiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIl0sImF1dGhfdGltZSI6MTY1MTQ4MjUwOCwiemlVc2VybmFtZSI6Im5hdmVlbi5yYW1rdW1hckB6b29taW5mby5jb20iLCJzdWIiOiJuYXZlZW4ucmFta3VtYXJAem9vbWluZm8uY29tIiwiZmlyc3ROYW1lIjoiTmF2ZWVuIiwibGFzdE5hbWUiOiJSYW1rdW1hciIsInppU2Vzc2lvblR5cGUiOi0zLCJ6aUdyb3VwSWQiOjAsInppVXNlcklkIjoyMDAyOTY4NSwiemlUZW5hbnRJZCI6MTAwMDAwMDAsImVtYWlsIjoibmF2ZWVuLnJhbWt1bWFyQHpvb21pbmZvLmNvbSIsInppTW9uZ29Vc2VySWQiOiIyMDAyOTY4NSIsInppUGxhdGZvcm1zIjpbIlJFQ1JVSVRFUiIsIk1BUktFVElORyIsIkRPWkkiLCJBRE1JTiIsIkVOR0FHRSIsIlpJIENIQVQiXX0.NqVHHm1Qs42fswlGhhvFNaMxYl0a_FeGJVl0EHkMlvuqRXqjotRbROwUCZE-rBuHm5jk5YBhnw_FLPXM9eOXlZepUA3jedkCPFUephwzFRONnksdG_I7aBN-Cdl6Bll0qSY5ljgcJYTJ1oCJI8-965jOXVhZUQ309h2J3Vl00dAYGQbPEIZcxY8vt07zJqudj96Qx-iUqKf8lPrN6G2W5KtJp8OQ1OF34P0vM198fGX5p1veiVTYW9HQ9V3pdhCp7s57zrygmJcp1MIrE2M1i5evCxvwOyZ9HImnR5orgZDkGv7FNr5b3xAQ-mYbWGStUxZDO5LFDaFc5uDjyA5AtQ"
      },
    };

    var config = {
      method: 'get',
      url: 'https://dozi-staging.zoominfo.com/anura/formComplete/forms',
      headers: {
          'authority': 'dozi-staging.zoominfo.com',
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
          'application': 'DOZI',
          'cookie': 'GCP_IAP_UID=105779085696369948742; doziUser=naveen.ramkumar%40zoominfo.com; oktaMachineId=3a782afa-9d87-1f82-08b5-1cd04cc50e84; GOOGAPPUID=712; amplitude_id_7b4ed37932e21db5dc95b89b92e6957bzoominfo.com=eyJkZXZpY2VJZCI6ImJmNWQ1ZmJkLThlNmEtNDFmMS1hZWE5LTczNTMwZTkzNGQ5NFIiLCJ1c2VySWQiOiIxMDU4MjM2NjA2NTE5OTEyIiwib3B0T3V0IjpmYWxzZSwic2Vzc2lvbklkIjoxNjU5Mzk1Njc0MzUwLCJsYXN0RXZlbnRUaW1lIjoxNjU5Mzk1NjgzMzIyLCJldmVudElkIjo0LCJpZGVudGlmeUlkIjozMCwic2VxdWVuY2VOdW1iZXIiOjM0fQ==; marketingCloudUser=naveen.ramkumar%40demandadv.com; userEmail=naveen.ramkumar%40demandadv.com; firstname=Naveen; name=Naveen%20Ramkumar; email=naveen.ramkumar%40demandadv.com; analyticsId=20048250; userZoomCompanyId=10018422; GCP_IAP_XSRF_NONCE_7zcDuO2UmwW21WFdBrpobg=1; GCP_IAAP_AUTH_TOKEN_66269046087E2BCF=eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3MjdiNmI0OTQwMmI5Y2Y5NWJlNGU4ZmQzOGFhN2U3YzExNjQ0YjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDgyNDEwNjkxNDczLWE3ODN1Y2sxZXJoN2N1ZG1kMG42N2poaGd2MW5qMjJzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA4MjQxMDY5MTQ3My1hNzgzdWNrMWVyaDdjdWRtZDBuNjdqaGhndjFuajIycy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNTc3OTA4NTY5NjM2OTk0ODc0MiIsImhkIjoiem9vbWluZm8uY29tIiwiZW1haWwiOiJuYXZlZW4ucmFta3VtYXJAem9vbWluZm8uY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJsalU5RnlqeGpXOHpzemZSWENYRTh3IiwiZ29vZ2xlIjp7ImdpYyI6IkFGbU9VdG9ZTjI1cExoTEhuR18zem9GZERUX1ZPLWRFWnI0eWFvYUJJWkhVdWxTaU96OEpCZGE4TjlDLWJhc0RsVDdZdmx3RTJtcHdGbmRfVXM2cWIzb3F0b0tvOW9VUmF6WUphajFEdlFGUDhFVk9tQUplci1DYXRrbTFNaXV4WmRYTko0bGc3Wi1kOXFlYm5XejgtbGV1ZzdaTk1JSDJoNlFqSHJNSVB5QzlBMVNQYkVPNGxXd001THZKY0VZUGxxckVNa3RSOTJhZ1VaODVoakhEQ3loa0hpb3dpc3M3eTZrIn0sImlhdCI6MTY2MDYwNjMxNiwiZXhwIjoxNjYwNjA5OTE2fQ.rbtdZy5sDXjKnZj4IvLZf3LQZWqbU2pOQX6XUji-X2oQMBZWrS9yqzOxAMrwW8cj2x4a81NeLEXrcUUsRXBqQVXRQEX7-33xrclYJa4X_wS9vMRSV39DvT87UZl_hxIteQUFKhYYcBoXF8x_KXUcx7F3BKbiXFFoNB8YrAwuklYx4Lhb3MRJnf36w9ew-6QKVNbKOdMXdZBEJPULSt6taFUAB8jAf3gaNSXlxp3p38rfi0Gx3gfPvht9W5h88EfUDDcutPtFNNpvDUWVP3Fkd9wE7wsrSPGQp2HnqR9_wCwJZGCXbVTId5u3k-C_dxLVn_4ftJvGP7q19nMhiWT8Gw; ssoredirecturl=https%253A%252F%252Fdozi-staging.zoominfo.com%252F%252F%2523; ziid=4d-1LPbmGkXCySmZ4v3CyxrBqoYkTxOH6sEib4BtXCnXHC_LDPGRFXLaDPbHtJESm8xeeOXrSPfZB5PMFBWu5Q; zisession=4d-1LPbmGkXCySmZ4v3CyxrBqoYkTxOH6sEib4BtXCnXHC_LDPGRFXLaDPbHtJESm8xeeOXrSPds6HJ75lTOpUwpx18a8Oe4gelxg_8YZGezX_6qX7uPLzxWld4KvzFG; ziaccesstoken=eyJraWQiOiJObnBwRGdldGJ1QmJVUzduZUhReDVhMkxKUlN6TkY4VS1MN1BFVVViSjlRIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnVGdzZBZ01YZ19LQzBrN3J3akJNTjlSQ0R2ZTBFOS0zTXhYQ1V6NEJKVG8iLCJpc3MiOiJodHRwczovL29rdGEtbG9naW4tc3RhZ2luZy56b29taW5mby5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjYwNjA2NDI4LCJleHAiOjE2NjA2NjA0MjgsImNpZCI6IjBvYTIyNGtvendnWlRwSkNNMWQ3IiwidWlkIjoiMDB1M244ZjI2ZEpicW92Q00xZDciLCJzY3AiOlsiZW1haWwiLCJwcm9maWxlIiwib3BlbmlkIl0sImF1dGhfdGltZSI6MTY2MDYwNjQyNywiemlVc2VybmFtZSI6Im5hdmVlbi5yYW1rdW1hckBkZW1hbmRhZHYuY29tIiwic3ViIjoibmF2ZWVuLnJhbWt1bWFyQGRlbWFuZGFkdi5jb20iLCJmaXJzdE5hbWUiOiJOYXZlZW4iLCJsYXN0TmFtZSI6IlJhbWt1bWFyIiwiemlTZXNzaW9uVHlwZSI6LTMsInppR3JvdXBJZCI6MTAwMjUwMywiemlVc2VySWQiOjIwMDQ4MjUwLCJ6aVRlbmFudElkIjoxMDAxODQyMiwiZW1haWwiOiJuYXZlZW4ucmFta3VtYXJAZGVtYW5kYWR2LmNvbSIsInNmQWNjb3VudElkIjoiMDAxOEcwMDAwMEdlNk9LUUFaIiwiemlNb25nb1VzZXJJZCI6IjIwMDQ4MjUwIiwiemlQbGF0Zm9ybXMiOlsiTUFSS0VUSU5HIiwiQURNSU4iLCJaSSBDSEFUIl19.VIQrg8Hf0IqKZjwpxHHe10rlimc-hkTHTzdjb6hT2FYBLk18OmYK8EPjDsvjQIC6i1_4Sb4NgIgjbN47YWcVBZFrAjOTQQBlGGnet2eVUf4TsVeE_Xw1EjEsS7pbIk8E4HUdmof7Nr_HMcoEqSjKtuhyE6F9kGSDyuAzKUSsH7C_Glnxs9H_EtAYsvIqlx5gRaUZ6cowNGckYo6Q3avhxohoybdB_t8OOVYJFoVgdd0pL4V6JX-s6ScQUgUKPRWNkNuyMQonaUTz3Cdk1BzwrxW13_JZCafKKK6doLsXw_TR3z_17IXpJkFu7vAx2_3PtYojoGtU--tyXWrjTU9ErQ; parseSessionToken=1; userId=20048250; _dd_s=rum=0&expire=1660607335073; __cf_bm=C0R8Wbp6mw2welpLkrUnbvZQ.9V1dSUK87EG.UgDsh4-1660606435-0-AV+75HIFfKeo+FUXAK26kYNgXi8Q1Pg+RlWSCVS8A2jS+j0UHMeuPyqgWZcB3mqD/D3/DkRXa0oDPSeWd43DUNo=; amplitude_id_6df4d4fa782dba3adb6191a1b24e4b4fzoominfo.com=eyJkZXZpY2VJZCI6IjRkMDUzODdjLWU3ZTUtNGFjNC05Njg4LTljMTA5NTNkZGU3ZFIiLCJ1c2VySWQiOiIyMDA0ODI1MCIsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTY2MDYwNjM0NjEzNiwibGFzdEV2ZW50VGltZSI6MTY2MDYwNjQ0MDUyOCwiZXZlbnRJZCI6MTUyLCJpZGVudGlmeUlkIjoyMTAsInNlcXVlbmNlTnVtYmVyIjozNjJ9; allowedIntegrations=%5B%22slack%22%5D; userEmail=naveen.ramkumar%40demandadv.com; amplitude_id_6cd417c49e0c8236eab016b90d75b422zoominfo.com=eyJkZXZpY2VJZCI6ImRiNjE1ZGM2LWVlYWQtNDFkNy04MGNjLWE4YmY0MzhkMGE0YlIiLCJ1c2VySWQiOiIyMDA0ODI1MCIsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTY2MDYwNjQ0MTE3OSwibGFzdEV2ZW50VGltZSI6MTY2MDYwNjQ0NjEzMywiZXZlbnRJZCI6MTU2LCJpZGVudGlmeUlkIjoyNTksInNlcXVlbmNlTnVtYmVyIjo0MTV9; __cf_bm=9mFmbILiMMEZ5B9BeFSJFiRdMVXUX6U6z8Uy6NaHGUU-1660606541-0-ATDnLMNq/1/kBHK+hwl6Bw/nXUBs6pvzdkGxUMfIS1Ajl59awchnneI48UIjswWUm+jN868g52KIbG0s4NM9rbQ=',
          'referer': 'https://dozi-staging.zoominfo.com/',
          'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'session-token': '1',
          'user': '20048250',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
          'x-sourceid': 'ZI_FOR_MARKETING',
          'x-ziaccesstoken': 'eyJraWQiOiJObnBwRGdldGJ1QmJVUzduZUhReDVhMkxKUlN6TkY4VS1MN1BFVVViSjlRIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnVGdzZBZ01YZ19LQzBrN3J3akJNTjlSQ0R2ZTBFOS0zTXhYQ1V6NEJKVG8iLCJpc3MiOiJodHRwczovL29rdGEtbG9naW4tc3RhZ2luZy56b29taW5mby5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjYwNjA2NDI4LCJleHAiOjE2NjA2NjA0MjgsImNpZCI6IjBvYTIyNGtvendnWlRwSkNNMWQ3IiwidWlkIjoiMDB1M244ZjI2ZEpicW92Q00xZDciLCJzY3AiOlsiZW1haWwiLCJwcm9maWxlIiwib3BlbmlkIl0sImF1dGhfdGltZSI6MTY2MDYwNjQyNywiemlVc2VybmFtZSI6Im5hdmVlbi5yYW1rdW1hckBkZW1hbmRhZHYuY29tIiwic3ViIjoibmF2ZWVuLnJhbWt1bWFyQGRlbWFuZGFkdi5jb20iLCJmaXJzdE5hbWUiOiJOYXZlZW4iLCJsYXN0TmFtZSI6IlJhbWt1bWFyIiwiemlTZXNzaW9uVHlwZSI6LTMsInppR3JvdXBJZCI6MTAwMjUwMywiemlVc2VySWQiOjIwMDQ4MjUwLCJ6aVRlbmFudElkIjoxMDAxODQyMiwiZW1haWwiOiJuYXZlZW4ucmFta3VtYXJAZGVtYW5kYWR2LmNvbSIsInNmQWNjb3VudElkIjoiMDAxOEcwMDAwMEdlNk9LUUFaIiwiemlNb25nb1VzZXJJZCI6IjIwMDQ4MjUwIiwiemlQbGF0Zm9ybXMiOlsiTUFSS0VUSU5HIiwiQURNSU4iLCJaSSBDSEFUIl19.VIQrg8Hf0IqKZjwpxHHe10rlimc-hkTHTzdjb6hT2FYBLk18OmYK8EPjDsvjQIC6i1_4Sb4NgIgjbN47YWcVBZFrAjOTQQBlGGnet2eVUf4TsVeE_Xw1EjEsS7pbIk8E4HUdmof7Nr_HMcoEqSjKtuhyE6F9kGSDyuAzKUSsH7C_Glnxs9H_EtAYsvIqlx5gRaUZ6cowNGckYo6Q3avhxohoybdB_t8OOVYJFoVgdd0pL4V6JX-s6ScQUgUKPRWNkNuyMQonaUTz3Cdk1BzwrxW13_JZCafKKK6doLsXw_TR3z_17IXpJkFu7vAx2_3PtYojoGtU--tyXWrjTU9ErQ',
          'x-ziid': '4d-1LPbmGkXCySmZ4v3CyxrBqoYkTxOH6sEib4BtXCnXHC_LDPGRFXLaDPbHtJESm8xeeOXrSPfZB5PMFBWu5Q',
          'x-zisession': '4d-1LPbmGkXCySmZ4v3CyxrBqoYkTxOH6sEib4BtXCnXHC_LDPGRFXLaDPbHtJESm8xeeOXrSPds6HJ75lTOpUwpx18a8Oe4gelxg_8YZGezX_6qX7uPLzxWld4KvzFG'
      }
    };


      // console.log(config);

    // console.log(`requestOptions: ${JSON.stringify(requestOptions)}`);

    try {
      let result = await axios(config);
      console.log("success");
      console.log(result.data);

      return res.status(200).send(result.data);
    } catch (e) {
      console.log(`error from api: ${e}`);
      return res.status(400).send(e.message);
    }
  })
);

app.listen(8000, function () {
  console.log("server running on port " + 8000);
});
