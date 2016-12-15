var $jscomp={scope:{},checkStringArgs:function(a,c,b){if(null==a)throw new TypeError("The 'this' value for String.prototype."+b+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+b+" must not be a regular expression");return a+""}};
$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(b.get||b.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[c]=b.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,c,b,d){if(c){b=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in b||(b[e]={});b=b[e]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})}};$jscomp.polyfill("String.prototype.includes",function(a){return a?a:function(a,b){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,b||0)}},"es6-impl","es3");
$("#save-changes").on("click",function(){theme=$("#darkTheme").is(":checked");exportKeys=$("#export-keys").is(":checked");coinControl=$("#coin-control").is(":checked");importExport=$("#import-export").is(":checked");var a={Values:[]};a.Values.push(theme);a.Values.push(exportKeys);a.Values.push(coinControl);a.Values.push(importExport);j=JSON.stringify(a);postRequest("adjust-settings",j,function(a){obj=JSON.parse(a);"none"==obj.Error?window.location.href.includes("success")?window.location.href=window.location.href:
window.location.href+="?success=true":SetGeneralError("Error: "+obj.Error)})});$("#export-seed").on("click",function(){postRequest("get-seed","",function(a){obj=JSON.parse(a);"none"==obj.Error?(a=document.createElement("a"),a.download="WalletSeed.txt",a.href="data:text/plain;charset=UTF-8,"+encodeURIComponent(obj.Content),a.click()):SetGeneralError("Error: "+obj.Error)})});$("#import-file").on("click",function(a){document.getElementById("uploaded-file").click()});
$("#uploaded-file").on("change",function(){(input=document.getElementById("uploaded-file"))?input.files?input.files[0]?(file=input.files[0],fr=new FileReader,fr.onload=receivedText,fr.readAsText(file)):SetGeneralError("Please select a file before clicking 'Import From File'"):SetGeneralError("This browser doesn't seem to support the `files` property of file inputs."):SetGeneralError("Error: Couldn't find the fileinput element.")});
function receivedText(){is=fr.result;len=is.split(" ");12!=len.length?SetGeneralError("Seed must be 12 words"):(document.getElementById("data-expand").click(),$("#import-seed-reveal-text").text(fr.result),$("#import-seed-reveal-cancel").click())}
$("#import-seed-reveal-confirm").on("click",function(){seed=$("#import-seed-reveal-text").text();j=JSON.stringify({Seed:seed});postRequest("import-seed",j,function(a){obj=JSON.parse(a);"none"==obj.Error?SetGeneralSuccess("Seed has been changed to: "+obj.Content):SetGeneralError("Error: "+obj.Error)})});
