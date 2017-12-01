# Standard-Backend

## google speech:
# config middleware/speech.js line 10:

# encoding: 'LINEAR16'
# sampleRateHertz: 44100
# languageCode: 'en-US'



## google vision api: 
    - npm: https://www.npmjs.com/package/@google-cloud/vision
    - vision auth guide: https://googlecloudplatform.github.io/google-cloud-node/#/docs/vision/0.12.0/vision.
    - document: https://cloud.google.com/vision/docs/tutorials

## Wit ai: learn more https://wit.ai/docs/quickstart
    - Login wit ai with facebook or github: https://wit.ai/;
    - Create your app -> open app.
    - On tab 'Understanding', you can train your app by adding more examples.
        + e.g: 
            User says...: 'Hello'
            Add intent with value 'Hi you!'
            Finally on click button 'Validate'
    - Switch tab Setting: 
        + On panel 'Change App Details', change for your setting.
        + On panel 'API Details', you need 'Client Access Token' to access wit ai from your node app. If text box is null please click icon reset token.
    - In node app: npm install --save node-wit.
        (GIT: https://github.com/wit-ai/node-wit) 
    - Using:  
    ////////////////////////////////////////
            var {Wit} = require('node-wit');
            var client = new Wit({
                accessToken: '<Client Access token>'
            })
            client.message('Hello',{})
                .then(data=>{
                    //return result follow what you taught it
                    console.log(data);
                    console.log(data.entities.intent[0].value); // 'Hi you!'. It worked
                })
                .catch(console.error)