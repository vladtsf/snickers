(function(undefined){SnickersTemplates={"widget-results.jade":function anonymous(locals,attrs,escape,rethrow){var attrs=jade.attrs,escape=jade.escape,rethrow=jade.rethrow,buf=[];with(locals||{}){var interp;buf.push("<div"),buf.push(attrs({"class":"widget-snickers widget-s-result"},{})),buf.push("><div"),buf.push(attrs({"class":"flag-result"},{})),buf.push("><img"),buf.push(attrs({src:"/images/flags/"+country.flag+".png",alt:country.name},{src:!0,alt:!0})),buf.push("/></div><div"),buf.push(attrs({"class":"widget-foot"},{})),buf.push("><div"),buf.push(attrs({"class":"widget-social-box"},{})),buf.push("><div"),buf.push(attrs({"class":"social-icons-big"},{})),buf.push("><a"),buf.push(attrs({target:"_blank",href:"https://www.facebook.com/sharer/sharer.php?s=100&p[url]="+enc("http://www.sports.ru/#snickers_iframe")+"&p[summary]="+enc("Поддержи любимую сборную! Футболист - не футболист, когда голоден.")+"&p[title]="+enc("Я накормил сборную "+country.accusative+"!")+"&[images][0]="+enc("http://s5o.ru/common/images/snickers.jpg")+"","class":"soc fb"},{target:!0,href:!0})),buf.push("></a><a"),buf.push(attrs({target:"_blank",href:"http://vk.com/share.php?url="+enc("http://www.sports.ru/#snickers_iframe")+"&description="+enc("Поддержи любимую сборную! Футболист - не футболист, когда голоден.")+"&image="+enc("http://s5o.ru/common/images/snickers.jpg")+"&title="+enc("Я накормил сборную "+country.accusative+"!")+"","class":"soc vk"},{target:!0,href:!0})),buf.push("></a><a"),buf.push(attrs({target:"_blank",href:"https://twitter.com/intent/tweet?&text="+enc("Я накормил сборную "+country.accusative+"!")+"&url="+enc("http://www.sports.ru/#snickers_iframe")+"","class":"soc tw"},{target:!0,href:!0})),buf.push("></a></div></div></div><!-- country.accusative--></div>")}return buf.join("")},"widget-vote.jade":function anonymous(locals,attrs,escape,rethrow){var attrs=jade.attrs,escape=jade.escape,rethrow=jade.rethrow,buf=[];with(locals||{}){var interp,flag_small_mixin=function(a){var b=this.block;buf.push("<i"),buf.push(attrs({"data-id":a._id,alt:a.name,title:a.name,"class":"flag-s "+("flag-"+a.flag+"")},{"class":!0,"data-id":!0,alt:!0,title:!0})),buf.push("></i>")},flag_big_mixin=function(a){var b=this.block;buf.push("<div"),buf.push(attrs({"class":"scroll-item-f"},{})),buf.push("><img"),buf.push(attrs({src:"/images/flags/"+a.flag+".png",alt:a.name},{src:!0,alt:!0})),buf.push("/><span"),buf.push(attrs({"class":"counter"},{})),buf.push(">");var c=a.rating;buf.push(escape(null==c?"":c)),buf.push("</span></div>")},flags_dropdown_mixin=function(a){var b=this.block;buf.push("<div"),buf.push(attrs({style:"display:none;","class":"flag-select-dropdown"},{style:!0})),buf.push("><i"),buf.push(attrs({"class":"fs-top"},{})),buf.push("></i><div"),buf.push(attrs({"class":"fs-box"},{})),buf.push(">"),function(){if("number"==typeof a.length)for(var b=0,c=a.length;b<c;b++){var d=a[b];flag_small_mixin(d)}else for(var b in a){var d=a[b];flag_small_mixin(d)}}.call(this),buf.push("</div><i"),buf.push(attrs({"class":"fs-bot"},{})),buf.push("></i></div>")},scrolling_flags_mixin=function(a){var b=this.block;buf.push("<div"),buf.push(attrs({"class":"scrolling-flags"},{})),buf.push("><span"),buf.push(attrs({"class":"prevPage browse left disabled"},{})),buf.push(">Пред.</span><span"),buf.push(attrs({"class":"nextPage browse right"},{})),buf.push(">След.</span><div"),buf.push(attrs({"class":"scrollable-flag"},{})),buf.push("><div"),buf.push(attrs({"class":"items-f"},{})),buf.push(">");for(var c=0;c<16;c+=3){buf.push("<div"),buf.push(attrs({"class":"chunk"},{})),buf.push(">");for(var d=c;d<=c+2&&a[d];d++)flag_big_mixin(a[d]);buf.push("</div>")}buf.push("</div></div></div>")};buf.push("<div"),buf.push(attrs({"class":"widget-snickers"},{})),buf.push("><form"),buf.push(attrs({action:"#","class":"send-snickers"},{action:!0})),buf.push("><span"),buf.push(attrs({"class":"flag-select"},{})),buf.push(">"),flag_small_mixin(countries[random]),buf.push("</span><input"),buf.push(attrs({type:"button",value:"","class":"send-s-but"},{type:!0,value:!0})),buf.push("/>"),flags_dropdown_mixin(countries),buf.push("</form><div"),buf.push(attrs({"class":"widget-foot"},{})),buf.push(">"),scrolling_flags_mixin(countries),buf.push("</div></div>")}return buf.join("")}}})()