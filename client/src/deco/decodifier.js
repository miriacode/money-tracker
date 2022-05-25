// function check_cookie_name(name){
//     var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//     if (match) {
//         return match[2];
//     }
//     else{
//         return '--something went wrong---';
//     }
// }

// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
    
//     return JSON.parse(jsonPayload);
// };

// export {check_cookie_name, parseJwt}