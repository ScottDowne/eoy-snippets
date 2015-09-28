var fs = require('fs');
var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var nunjucks = require('nunjucks');

function build() {
  function compile(snippet, index, original) {
    var snippetData = snippet.data;
    var snippetSource = fs.readFileSync(snippet.source + "/snippet.html", "utf8");
    if (snippetData) {
      snippetSource = nunjucks.renderString(snippetSource, snippetData);
    }
    gulp.src('index.template')
      .pipe(rename('index.html'))
      .pipe(replace('{{ SNIPPET }}', snippetSource))
      .pipe(gulp.dest("./" + snippet.destination + "/"));
  }

  function compileSnippets(snippets) {
    snippets.forEach(compile);
  }

  compileSnippets([
    {
      source: "eyeball-snippet",
      destination: "eyeball-snippet",
      data: {
        "snippet_id": "666",
        "body": "What kind of information do you think the United States government should collect about you? <a href=\"https://sendto.mozilla.org/page/content/surveillance-interstitial/\">Sort it out here, and get smart on surveillance.</a>"
      }
    }, {
      source: "simple-snippet",
      destination: "simple-snippet",
      data: {
        "snippet_id": "666",
        "text": "<b>Dear Firefox users:</b> Mozilla puts the public good and user privacy before profit. If Firefox is useful to you, take one minute to support the non-profit behind it. <em>If everyone reading this donates $3, Mozilla's fundraiser would be over within an hour.</em> <i>Thank you.</i></p>",
        "highlightColor": 'rgba(243, 248, 1, 0.4)',
        "donationAmountLeft": "10",
        "donationAmountMiddle": "5",
        "donationAmountRight": "3",
        "donateButtonText": "Donate Now",
        'donationFormURL': "https://sendto.mozilla.org/page/contribute/givenow-seq",
        'backgroundColor': '',
        'backgroundImg': '',
        'buttonAnimate': ''
      }
    }, {
      source: "2015-snippet",
      destination: "2015-snippet",
      data: {
        "snippet_id": "666",
        "text": "Mozilla, die gemeinnützige Organisation hinter Firefox, ist auf Spenden von Leuten wie Ihnen angewiesen. <em>Falls jade Person, die das liest, ein paar Euro spendet, so wäre unsere Finanzierung für das nächste Jahr gesichert.</em>",
        "highlightColor": '#FFF8D0',
        "fontColor": 'inherit',
        "backgroundColor": 'inherit',
        "donationAmountFirst": "20",
        "donationAmountSecond": "10",
        "donationAmountThird": "5",
        "donationAmountFourth": "3",
        "selectedButton": "donation-amount-second",
        "donateButtonText": "Jetzt spenden",
        'monthlyCheckboxLabelText': 'Monatlich',
        "blockable": true,
        "currencyCode": "eur",
        "currencySymbol": "€",
        'donationFormURL': "https://donate.mofostaging.net/de/",
        'thisReallyHelpsUsImage': 'data:image/png;base64,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'
      }
    }, {
      source: "simple-snippet",
      destination: "disruptive-snippet-yellow",
      data: {
        "snippet_id": "666",
        "text": "<b>Dear Firefox users:</b> Mozilla puts the public good and user privacy before profit. If Firefox is useful to you, take one minute to support the non-profit behind it. <em>If everyone reading this donates $3, Mozilla's fundraiser would be over within an hour.</em> <i>Thank you.</i></p>",
        "highlightColor": '',
        "donationAmountLeft": "10",
        "donationAmountMiddle": "5",
        "donationAmountRight": "3",
        "donateButtonText": "Donate Now",
        'donationFormURL': "https://sendto.mozilla.org/page/contribute/givenow-seq",
        'backgroundColor': 'linear-gradient(to bottom, #FEE885, #FCDE3F)',
        'buttonAnimate': 'background-animate2' // background-animate1 or background-animate2
      }
    }, {
      source: "simple-snippet",
      destination: "disruptive-snippet-grey",
      data: {
        "snippet_id": "666",
        "text": "<b>Dear Firefox users:</b> Mozilla puts the public good and user privacy before profit. If Firefox is useful to you, take one minute to support the non-profit behind it. <em>If everyone reading this donates $3, Mozilla's fundraiser would be over within an hour.</em> <i>Thank you.</i></p>",
        "highlightColor": '',
        "donationAmountLeft": "10",
        "donationAmountMiddle": "5",
        "donationAmountRight": "3",
        "donateButtonText": "Donate Now",
        'donationFormURL': "https://sendto.mozilla.org/page/contribute/givenow-seq",
        'backgroundColor': 'linear-gradient(to bottom, #5B595B, #3A3A3C)',
        'fontColor': '#F3F3F4',
        'buttonAnimate': 'background-animate2' // outline-animate or background-animate
      }
    }, {
      source: "paypal-snippet",
      destination: "paypal-snippet",
      data: {
        "snippet_id": "666",
        'donationAmountLeft': '10',
        'donationAmountRight': '3',
        'donationAmountMiddle': '5',
        'donationFormURL': 'https://sendto.mozilla.org/page/contribute/givenow-seq?ref=EOYFR2014&amp;utm_campaign=EOYFR2014&amp;utm_source=firefox&amp;utm_medium=snippet&amp;utm_content=SelectAMT_test2&amp;sample_rate=0.1&amp;snippet_name=4807',
        'paypalURL': 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=44ZHAVWJHTK2N&amp;locale=US&amp;item_name=Mozilla%20Foundation&amp;no_note=1&amp;no_shipping=1&amp;rm=1&amp;custom=20140923%20eoy14%20sequential&amp;currency_code=USD&amp;amount=',
        'text': 'Mozilla, the non-profit behind Firefox, relies on grants and donations from people like you. <em>If everyone reading this donates a few dollars, we can be fully funded for another year.</em>',
        'highlightColor': 'rgba(243, 248, 1, 0.4)',
        'backgroundColor': '',
        'selectAmount': 'Select Amount',
        'paymentMethod': 'Payment Method',
        'donateNow': 'Donate Now',
        'buttonAnimate': '', // outline-animate or background-animate
        'thumbnailImg': '',
        'paypalImg': '',
        'creditCardImg': ''
      }
    }
  ]);
};

build();

var express = require("express");
var app = express();
var port = 3101;

app.use(express.static(__dirname));

app.listen(port, function() {
  console.log("Running ( http://localhost:" + port + "/ )");
  console.log("Press Ctrl+C to stop");
});
