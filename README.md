# Angular2 - Asp Net Core - Azure (Ng2a) - ChatApp

## Live demo hosted on azure
 http://ng2a-hneu-web-ui.azurewebsites.net/<br>
 1. you can login with one of two: 
  1. login: guestone@hneu.microsoft.com -paswoord: Test1234
  2. login: guesttwo@hneu.microsoft.com -paswoord: Test1234
 2. wait for you friend to login and start chatting... 


## This is a Ng2A sample project. 

  it uses:
   1. asp.net core (net452)
   2. angular2-webpack-starter
   3. Azure AD - adal.js   
   4. azure webjobs
   5. asp.net signalr
   6. asp.net owin   
   7. asp.net cors
   8. azure-github-ci-webhook
   9. azure app-insights (.js client)
   
## Screenshots

   
## Install

 1. setup your environment. (VS2015 + Visual studio code). Read section environment 
 2. run git clone https://github.com/HNeukermans/Ng2Aa-demo.git
 3. Open VS 2015 press F5. 
 verify
    1. webp-api is running at http://localhost:10772/api/values
    2. signalr is running at http://localhost:10772/signalr/hubs
    3. goto sub dir .\src\Ng2a.WebUI\wwwroot and type 'npm install'
    4. type npm start.
    4. type code . to open Visual studio code.
    

## Environment
  My setup:
  1. npm -v : 3.5.3
  2. tsc -v : 2.0.0
  3. node -v : 6.6.0
  4. VS2015 community edition - update 3 (help>about)
  5. Visual studio code 1.5.3 (help/about)
  6. npm install rimraf -g
  
## Troubleshout
  1. startup webapi doesn't work: I had to disable AVG security, to avoid intermittent failures
  2. signalr: make sure that windows firewall is disabled.  
  3. npm install fails. install rimraf globally
  
