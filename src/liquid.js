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
  "as", "assign", "break", "capture", "case", "color", "comment", "continue", "cycle",
  "decrement", "echo", "else", "elsif", "endcapture", "endcase", "endcomment",
  "endfor", "endform", "endif", "endjavascript", "endraw", "endschema",
  "endsection", "endstylesheet", "endtablerow", "endunless", "font", "for",
  "for-render", "form", "if", "ifchanged", "include", "increment", "javascript",
  "layout", "liquid", "paginate", "raw", "react", "render", "schema", "section",
  "sections", "style", "style-tag", "stylesheet", "tablerow", "unless", "when", "with"
];

const KEYWORDS_SUBSET = [
    "limit",
    "offset",
    "range",
    "reversed"
];

// Booleans
const LITERALS = [
  "true",
  "false",
  "nil"
];

// Objects and Variables
const BUILT_INS = [
    "additional_checkout_buttons", "address", "all_country_option_tags",
    "all_products", "app", "app_settings", "article", "articles", "block",
    "block_order", "blocks", "blog", "blogs", "canonical_url", "cart",
    "checkout", "collection", "collections", "color_scheme", "comment",
    "content_for_additional_checkout_buttons", "content_for_header",
    "content_for_index", "content_for_layout", "country_option_tags",
    "currency", "current_page", "current_tags", "customer", "customer_address",
    "discount_allocation", "discount_application", "external_video", "font",
    "forloop", "form", "fulfillment", "gift_card", "global_block", "handle",
    "i", "image", "images", "index", "item", "letters", "line_item", "link",
    "linklist", "linklists", "location", "localization", "media", "metafield",
    "model", "model_source", "numbers", "order", "page", "page_description",
    "page_image", "page_title", "pages", "paginate", "part", "policy",
    "powered_by_link", "predictive_search", "predictive_search_autocomplete",
    "product", "product_option", "product_variant", "products",
    "recommendations", "request", "routes", "script", "scripts", "search",
    "section", "section_blocks", "selling_plan", "selling_plan_allocation",
    "selling_plan_group", "settings", "shipping_method", "shipping_rates",
    "shop", "shop_locale", "store_availability", "tablerow", "tax_line",
    "template", "theme", "transaction", "unit_price_measurement", "value",
    "variant", "video", "video_source"
];

// Liquid Filters
const FILTERS = [
    "abs", "append", "at_least", "at_most", "capitalize", "ceil", "color_brightness",
    "color_darken", "color_desaturate", "color_extract", "color_lighten",
    "color_modify", "color_saturate", "color_to_rgb", "compact", "concat",
    "date", "default", "divided_by", "downcase", "escape", "escape_once",
    "first", "floor", "font_face", "font_modify", "highlight", "highlight_active",
    "join", "last", "lstrip", "map", "minus", "modulo", "newline_to_br",
    "payment_type_img_url", "plus", "prepend", "remove", "remove_first",
    "replace", "replace_first", "reverse", "round", "rstrip", "size", "slice",
    "sort", "sort_natural", "split", "strip", "strip_html", "strip_newlines",
    "time_tag", "times", "truncate", "truncatewords", "uniq", "upcase",
    "url_decode", "url_encode", "where"
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
      // Handle comments in Liquid with whitespace control
      hljs.COMMENT('{%-?\\s*comment\\s*-?%}', '{%-?\\s*endcomment\\s*-?%}'),
      hljs.COMMENT('{%-?\\s*raw\\s*-?%}', '{%-?\\s*endraw\\s*-?%}'),

      // Parsing Liquid Tags with whitespace control
      {
        className: 'template-tag',
        begin: '{%-?\\s*',
        end: '\\s*-?%}',
        keywords: KEYWORDS.join(' '),
        contains: [
          {
            className: 'comment',
            begin: '#.*?(?=%})',
            relevance: 10
          },
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
            begin: '\\b(true|false|nil)\\b'
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

      // Parsing Output tags with whitespace control
      {
        className: 'template-variable',
        begin: '{{-?\\s*',
        end: '\\s*-?}}',
        contains: [
          hljs.QUOTE_STRING_MODE,
          hljs.C_NUMBER_MODE,
          {
            className: 'literal',
            begin: '\\b(true|false|nil)\\b'
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
