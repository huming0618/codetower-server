const API = "/github";
const prefix = {'prefix': API};
const router = require('koa-router')(prefix);
const url = require('url');
const querystring  = require("querystring");
const axios = require('axios');

router.get('/', async (ctx) => {
    ctx.body = {
        'error': 'the detail of action is required',
        'errorCode': 100
    }
    ctx.res.statusCode = 500;
});

router.get('/auth/success', async (ctx)=>{
    //http://localhost:9000/github/auth/success?code=4616993562b734f0f12c
    
    
    const authCode = querystring.parse(ctx.querystring)['code'];

    if (authCode){
        console.log('authCode', authCode);
        const payload = {
            client_id: '2fd3f82498288907e4b6',
            client_secret: 'a85ba47bc78c7ae1a2237761a2524bb180c82353',
            code: authCode
        }

        await axios
                .post('https://github.com/login/oauth/access_token', payload)
                .then((resp)=>{
                    if (resp.status === 200){
                        
                        const accessToken = querystring.parse(resp.data)['access_token'];
                        console.log('accessToken', accessToken);
                        ctx.body = 'auth OK ! ' + accessToken;
                    }
                    else {
                        ctx.body = 'auth Error!';
                    }
                })
        // "https://github.com/login/oauth/access_token"
        // console.log(ctx.res);
    }


});

//http://localhost:9000/github/auth/github.com
router.get('/auth/:host', async (ctx) => {
    const host = ctx.params.host;
    const res = ctx.res;
    //ctx.body = {'host': host };
    if (host === 'github.com'){
        
        //http://localhost:9000/github/auth/success?host=github.com
        const oauthConfig = {
            client_id: '2fd3f82498288907e4b6',
            //redirect_uri: 'http://localhost:9000/github/auth/success',
            scope: 'repo, user'
        }


        const authURL = `https://github.com/login/oauth/authorize?${querystring.stringify(oauthConfig)}`;
        console.log(authURL);

        //res.statusCode = 302;
        ctx.redirect(authURL);
       
    }
});

module.exports = router;
