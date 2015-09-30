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
        "text": "<b>Hallo:</b> Wir wissen, dass Sie Firefox mögen, aber wussten Sie, dass Firefox von einer gemeinnützigen Organisation namens Mozilla entwickelt wird? Mit Hilfe von Spenden tut Mozilla noch viel mehr als diesen tollen Browser zu entwickeln. Wir bringen Menschen das Programmieren bei, kämpfen für Datenschutz im Internet und schützen das tolle Gebilde, das man Internet nennt, zum Wohle folgender Generationen. Mozilla bittet nur ein paar Mal pro Jahr um Spenden und zehntausende von Menschen auf der ganzen Welt geben. Täten sie das nicht, könnten wir diese guten Taten nicht vollbringen. <em>Wenn jeder, der das liest, nur ein paar Euro beitragen würde, wäre diese Spendenkampagne in weniger als einer Stunde vorbei. Sie können hier Ihre Spende geben. Vielen Dank.</em>",
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
