(function(){
    
    setTimeout(function(){ 
         var productName = "";
    var pageVisited = "";
    var recentVisited = Date.parse("1912-11-01");
    guest.sessions.forEach(function(session) {
      session.events.forEach(event => {
          if(event.type == "VIEW")
            {
                var tempDate = Date.parse(event.modifiedAt);
                if(tempDate > recentVisited && (event.arbitraryData.page.contains("product-a") || event.arbitraryData.page.contains("product-b") || event.arbitraryData.page.contains("product-c")))
                {
                    recentVisited =  tempDate ;
                    if(event.arbitraryData.page.contains("product-a"))
                     {productName = "A"; }
                    if(event.arbitraryData.page.contains("product-b"))
                     {productName = "B";}
                    if(event.arbitraryData.page.contains("product-c"))
                     {productName = "C";}
                }
            }
         
      });
  });
  return productName; 
        
    }, 5000);
   
})();