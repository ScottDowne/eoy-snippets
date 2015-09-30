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
      source: "simple-snippet",
      destination: "de-simple-snippet",
      data: {
        "snippet_id": "666",
        "text": "Mozilla, die gemeinnützige Organisation hinter Firefox, ist auf Spenden von Leuten wie Ihnen angewiesen. <em>Falls jade Person, die das liest, ein paar Euro spendet, so wäre unsere Finanzierung für das nächste Jahr gesichert.</em>",
        "highlightColor": 'rgba(243, 248, 1, 0.4)',
        "donationAmountLeft": "10",
        "donationAmountMiddle": "5",
        "donationAmountRight": "3",
        "donateButtonText": "spenden",
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
        "donationAmountFirst": "20",
        "donationAmountSecond": "10",
        "donationAmountThird": "5",
        "donationAmountFourth": "3",
        "donateButtonText": "Jetzt spenden",
        'monthlyCheckboxLabelText': 'Meine Spende monatlich wiederholen',
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
