# Store a JWT in a cookie

Based off of [React Authentication: How to Store JWT in a Cookie](https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81) and updated to use [csrf-csrf](https://www.npmjs.com/package/csrf-csrf). Used [csrf-csrf](https://www.npmjs.com/package/csrf-csrf) because there's a flaw in [csurf](https://www.npmjs.com/package/csurf) -- csurf is deprecated now. Created a PDF of the original article for historial purposes.

> NOTE 1: covers protecting XSS attack via cookie by using `httpOnly: true` and CSRF via an anti-CSRF token. Read the PDF "ReactAuthentication_HowToStoreJWT InACookieByRyanChenkie_Medium.pdf" if the article doesn't exist anymore. Remember JWT is not secure on its own, so that's why I'm putting it into a cookie.

Few things hints to follow:
1. `npm install` in both the root folder and `food-app`
2. Run the `food-app` client first with `npm start`
3. Run the server after with `npm start`
4. Click on "Get JWT" first
5. Click on "Get Cookies" next
6. Click on "Get Foods" next
7. Click on "Create New Food" -- you should get a 401 error
7. Refresh browser to get the anit-CSRF token loaded -- required the JWT to get it first (could have done this step after getting the JWT)
8. Now click on "Create New Food" -- you should see it added a new item to your list without issue
9. Click on "Get Foods" to see the additinal item
10. Right click on the Chrome browser screeen > select "Inspect" to see the Network calls to see the cookies and headers being sent
11. I recommend looking at the Application, Console, and Network tabs in the "Inspect" view for Chrome

> NOTE 2: The server handles setting the cookies, always set the cookies from the server side, and the anti-CSRF token is loaded via useEffect hook when the client first loads the React component within App.js. Try changing the header `x-csrf-token` on the server side from `getTokenFromRequest: (req) => req.headers['x-csrf-token']` to `'x-csrf-tokenx` to see how it fails if you don't provide the anit-CSRF token in the headers.