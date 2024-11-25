/*
Language: Liquid
Author: Laurel King <laurel.king@shopify.com>, Mathieu Legault <mathieu.legault@shopify.com>
Contributors: N/A
Description: Shopify's Liquid templating language
Website: https://shopify.dev/docs/api/liquid
*/

const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';

// Liquid Tags
const KEYWORDS = [
  "as", "assign", "break", "capture", "case", "comment", "continue", "cycle",
  "decrement", "echo", "else", "elsif", "endcapture", "endcase", "endcomment",
  "endfor", "endform", "endif", "endjavascript", "endraw", "endschema",
  "endsection", "endstylesheet", "endtablerow", "endunless", "for", "form",
  "if", "ifchanged", "include", "increment", "javascript", "layout", "liquid",
  "raw", "render", "schema", "section", "style", "stylesheet", "tablerow",
  "unless", "when", "with"
];

const KEYWORDS_SUBSET = [
    "limit", "offset", "reversed", "range",
];

// Booleans
const LITERALS = [
  "true",
  "false",
  "null"
];

// Objects and Variables
const BUILT_INS = [
    "additional_checkout_buttons", "address", "all_country_option_tags",
    "all_products", "article", "articles", "block", "blog", "blogs",
    "canonical_url", "cart", "checkout", "collection", "collections",
    "comment", "content_for_additional_checkout_buttons", "content_for_header",
    "content_for_index", "content_for_layout", "country_option_tags",
    "currency", "current_page", "current_tags", "customer", "customer_address",
    "discount_allocation", "discount_application", "external_video", "font",
    "forloop", "form", "fulfillment", "gift_card", "handle", "image",
    "images", "line_item", "link", "linklist", "linklists", "location",
    "localization", "metafield", "model", "model_source", "order", "page",
    "page_description", "page_image", "page_title", "pages", "paginate",
    "part", "policy", "powered_by_link", "predictive_search", "product",
    "product_option", "product_variant", "recommendations", "request",
    "routes", "script", "scripts", "search", "section", "selling_plan",
    "selling_plan_allocation", "selling_plan_group", "settings",
    "shipping_method", "shop", "shop_locale", "store_availability",
    "tablerow", "tax_line", "template", "theme", "transaction",
    "unit_price_measurement", "variant", "video", "video_source",
    "item", "numbers", "i", "index", "value", "letters", "products"
  ];

// Liquid Filters
const FILTERS = [
    "abs", "append", "at_least", "at_most", "capitalize", "ceil", "compact",
    "concat", "date", "default", "divided_by", "downcase", "escape",
    "escape_once", "first", "floor", "join", "last", "lstrip", "map",
    "minus", "modulo", "newline_to_br", "plus", "prepend", "remove",
    "remove_first", "replace", "replace_first", "reverse", "round",
    "rstrip", "size", "slice", "sort", "sort_natural", "split", "strip",
    "strip_html", "strip_newlines", "times", "truncate", "truncatewords",
    "uniq", "upcase", "url_decode", "url_encode"
];

const OPERATORS = [
    "==", "=", "\\:", "\\.", "\\|", "!=", "<>", ">", "<", ">=", "<=", "contains", "and", "or", "\\[", "\\]"
];

export default function(hljs) {
  return {
    name: 'Liquid',
    aliases: ['shopify'],
    case_insensitive: true,
    contains: [
      // Handle comments in Liquid
      hljs.COMMENT('{% comment %}', '{% endcomment %}'),
      hljs.COMMENT('{% raw %}', '{% endraw %}'),

      // Parsing Liquid Tags
      {
        className: 'template-tag',
        begin: '{%-?\\s*',
        end: '-?%}',
        keywords: KEYWORDS.join(' '),
        contains: [
          {
            // Capture as sublanguage
            beginKeywords: KEYWORDS.join(' '),
            relevance: 10,
          },
          // Strings handling
          hljs.QUOTE_STRING_MODE,
          // Numbers, booleans and null
          hljs.C_NUMBER_MODE,
          {
            className: 'literal',
            begin: '\\b(true|false|null)\\b'
          },
          // Operators & punctuation
          {
            className: 'operator',
            begin: '(' + OPERATORS.join('|') + ')'
          },
          // Built-ins
          {
            className: 'built_in',
            begin: '\\b(' + BUILT_INS.join('|') + ')\\b'
          },
          // Filters as function calls
          {
            className: 'function',
            begin: '\\|\\s*(' + FILTERS.join('|') + ')\\b(?:\\s*:[^:\\s,|}]+(?:\\s*:[^:\\s,|}]+)*)?',
            keywords: FILTERS.join(' ')
          }
        ]
      },

      // Parsing Output tags (`{{` `}}`)
      {
        className: 'template-variable',
        begin: '{{-?',
        end: '-?}}',
        contains: [
          hljs.QUOTE_STRING_MODE,
          hljs.C_NUMBER_MODE,
          {
            className: 'literal',
            begin: '\\b(true|false|null)\\b'
          },
          {
            className: 'operator',
            begin: '(' + OPERATORS.join('|') + ')'
          },
          {
            className: 'built_in',
            begin: '\\b(' + BUILT_INS.join('|') + ')\\b'
          },
          {
            className: 'function',
            begin: '\\|\\s*(' + FILTERS.join('|') + ')\\b(?:\\s*:[^:\\s,|}]+(?:\\s*:[^:\\s,|}]+)*)?',
            keywords: FILTERS.join(' ')
          }
        ]
      },

      {
        className: 'property',
        begin: '\\b[a-zA-Z0-9_]+\\.([a-zA-Z0-9_]+)\\b'
      }
    ]
  };
}
