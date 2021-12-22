<#-- Construct the API response using Freemarker -->
<#-- For your Experience to run your API tab must have, at a minimum, open and closing brackets -->
<#-- Construct the API response using Freemarker -->
{
 <#if (getDecisionModelResultNode("VacationOffers"))??>
       <#assign products = getDecisionModelResultNode("VacationOffers")>
        <#if (products) ??>
        "products": ${toJSON(products.outputs[0].vacationoffers.record)}
    </#if>
    <#else>
    "products" : "Nothing to show"
    </#if>
    
}