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
        "text": "Mozilla, die gemeinnützige Organisation hinter Firefox, ist auf Spenden von Leuten wie Ihnen angewiesen. <em>Falls jede Person, die das liest, ein paar Dollar spendet, so wäre unsere Finanzierung für das nächste Jahr gesichert.</em>",
        "highlightColor": 'rgba(243, 248, 1, 0.4)',
        "donationAmountLeft": "10",
        "donationAmountMiddle": "5",
        "donationAmountRight": "3",
        "donateButtonText": "spenden",
        'donationFormURL': "https://sendto.mozilla.org/page/contribute/givenow-seq-de",
        'backgroundColor': '',
        'backgroundImg': '',
        'buttonAnimate': ''
      }
    }, {
      source: "2015-snippet",
      destination: "2015-snippet",
      data: {
        "snippet_id": "666",
        "text": "Mozilla, die gemeinnützige Organisation hinter Firefox, ist auf Spenden von Leuten wie Ihnen angewiesen. <em>Falls jede Person, die das liest, ein paar Euro spendet, so wäre unsere Finanzierung für das nächste Jahr gesichert.</em>",
        "donationAmountFirst": "20",
        "donationAmountSecond": "10",
        "donationAmountThird": "5",
        "donationAmountFourth": "3",
        "donateButtonText": "Jetzt spenden",
        'monthlyCheckboxLabelText': 'Meine Spende monatlich wiederholen',
        'closeButtonTitle': 'Entfernen',
        "blockable": true,
        "currencyCode": "eur",
        "currencySymbol": "€",
        'donationFormURL': "https://donate.mozilla.org/de/",
        'thisReallyHelpsUsImage': 'data:image/png;base64,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'
      }
    }, {
      source: "2015-snippet",
      destination: "2015-snippet-without",
      data: {
        "snippet_id": "666",
        "text": "Mozilla, die gemeinnützige Organisation hinter Firefox, ist auf Spenden von Leuten wie Ihnen angewiesen. <em>Falls jede Person, die das liest, ein paar Euro spendet, so wäre unsere Finanzierung für das nächste Jahr gesichert.</em>",
        "donationAmountFirst": "20",
        "donationAmountSecond": "10",
        "donationAmountThird": "5",
        "donationAmountFourth": "3",
        "donateButtonText": "Jetzt spenden",
        'monthlyCheckboxLabelText': 'Meine Spende monatlich wiederholen',
        'closeButtonTitle': 'Entfernen',
        "blockable": true,
        "currencyCode": "eur",
        "currencySymbol": "€",
        'donationFormURL': "https://donate.mofostaging.net/de/"
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
