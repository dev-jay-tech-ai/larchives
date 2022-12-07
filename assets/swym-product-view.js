['SwymViewProducts', 'SwymWatchProducts', 'SwymProductVariants'].forEach(function(k){
  if(!window[k]) window[k] = {};
});
(function(et){
    var collections = {{ card_product.type | json }};
    var o={}, empi={{ card_product.id | json }},
    piu = {{ card_product.featured_image | img_url: '620x620' | json }};
    {% assign currentVariant = card_product.variants[0] %}
    {% for variant in card_product.variants %}
    {% if variant.selected %}
    {% assign currentVariant = variant %}
    {% endif %}
    SwymProductVariants[{{ variant.id|json }}] = {
      empi:empi,epi:{{ variant.id|json }},
      du:"{{ shop.url }}{{ card_product.url }}",
      dt:{{ card_product.title | json }},
      ct: collections,
      iu: {% if variant.image %} {{ variant | img_url: '620x620' | json }} {% else %} piu {% endif %},
      stk: {{variant.inventory_quantity}},
      pr: {{ variant.price }}/100,
      {% if variant.compare_at_price %} op: {{variant.compare_at_price}}/100, {% endif %}
      variants: [{ {{ variant.title | json }} : {{variant.id|json}}}]
    };
    SwymWatchProducts[{{variant.id | json}}] = o[{{variant.id | json}}] = {"id": {{variant.id | json}}, "available": {{variant.available | json}},"inventory_management": {{variant.inventory_management | json}},"inventory_quantity": {{variant.inventory_quantity | json}},"title": {{variant.title | json}}, "inventory_policy": {{variant.inventory_policy | json}}};
    {% endfor %}
    var product_data = {
      empi:empi, epi:{{ currentVariant.id }},
      dt	:{{ card_product.title | json }},du:"{{ shop.url }}{{ card_product.url }}",
      ct 	:collections,pr:{{ currentVariant.price }}/100,stk:{{ currentVariant.inventory_quantity }},
      iu	:{% if currentVariant.image %} {{ currentVariant | img_url: '620x620' | json }} {% else %} piu {% endif %},variants:[{ {{currentVariant.title | json}} : {{currentVariant.id | json}} }]
      {% if currentVariant.compare_at_price %} ,op:{{currentVariant.compare_at_price}}/100 {% endif %}
    };
    SwymViewProducts[{{ card_product.handle | json }}] = SwymViewProducts[{{ card_product.id | json }}] = product_data;
    SwymWatchProducts[{{ card_product.handle | json }}] = SwymWatchProducts[{{ card_product.id | json }}] = o;
  })();