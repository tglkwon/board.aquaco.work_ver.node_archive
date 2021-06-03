/* ------ check javascript version ------ */
function check() {
    "use strict";

    try { eval("var foo = (x)=>x+1"); }
    catch (e) { return false; }
    return true;
}

if(!check()) {
    location.href = '/DoNotSupport/';
}
/* ------ check javascript version ------ */