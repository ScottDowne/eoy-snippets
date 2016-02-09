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
      source: "signup-snippet",
      destination: "signup-snippet",
      data: {
        "snippet_id": "666",
        "text": "Mozilla stands up for online privacy. Will you join us? Sign up to get important email updates and opportunities to stand with us.",
        "emailPlaceholder": "Email (required)",
        "firstnamePlaceholder": "First Name",
        "countryPlaceholder": "Country",
        "lang": "en-US",
        "privacyPolicy": "I’m okay with Mozilla handling my info as explained in <a href=\"https://www.mozilla.org/en-US/privacy/websites/\">this Privacy Notice</a>.",
        "submit": "Submit",
        "blockable": true,
        "basketHost": "https://basket.mozilla.org",
        "closeButtonTitle": "close",
        "basketError": "There was an unexpected error, please try again later.",
        "successMessage": "Great! Look for a confirmation email in your inbox to complete your subscription to our email list.", 
        "newsletters": "mozilla-foundation",
        "video_url": "http://video.webmfiles.org/big-buck-bunny_trailer.webm",
        "video_poster": "http://jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
      }
    },
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
      source: "2015-spectacular-snippet-1",
      destination: "2015-spectacular-snippet-1",
      data: {
        "snippet_id": "123",
        "bodyText": "HELLO there: We know you love Firefox, but did you know a non-profit called Mozilla built Firefox? Thanks to donations, Mozilla does a lot more than build this awesome browser. We teach people to code, fight for online privacy, and protect this amazing thing called the Web for future generations. Just a few times a year Mozilla asks for donations, and usually only a tiny portion of Firefox users give. <b>If everyone reading this chipped in $3 to help Mozilla, we could wrap this fundraiser up in under an hour and keep our work going another year.</b> <i>Thank you.</i>",
        "donationAmountFirst": "20",
        "donationAmountSecond": "10",
        "donationAmountThird": "5",
        "donationAmountFourth": "3",
        "donateButtonText": "Donate now",
        'monthlyCheckboxLabelText': 'Make my donation monthly',
        'closeButtonTitle': 'Remove',
        "blockable": true,
        "currencyCode": "usd",
        "locale": "en-US",
        'donationFormURL': "https://donate.mozilla.org/en-US/"
      }
    }, {
      source: "2015-spectacular-snippet-2",
      destination: "2015-spectacular-snippet-2",
      data: {
        "snippet_id": "123",
        "bodyText": "HELLO there: We know you love Firefox, but did you know a non-profit called Mozilla built Firefox? Thanks to donations, Mozilla does a lot more than build this awesome browser. We teach people to code, fight for online privacy, and protect this amazing thing called the Web for future generations. Just a few times a year Mozilla asks for donations, and usually only a tiny portion of Firefox users give. <em>If everyone reading this chipped in $3 to help Mozilla, we could wrap this fundraiser up in under an hour and keep our work going another year.</em> <i>Thank you.</i>",
        "donationAmountFirst": "20",
        "donationAmountSecond": "10",
        "donationAmountThird": "5",
        "donationAmountFourth": "3",
        "donateButtonText": "Donate now",
        'monthlyCheckboxLabelText': 'Make my donation monthly',
        'closeButtonTitle': 'Remove',
        "blockable": true,
        "animate": true,
        "currencyCode": "usd",
        "locale": "en-US",
        'donationFormURL': "https://donate.mozilla.org/en-US/"
      }
    }, {
      source: "2015-spectacular-snippet-3",
      destination: "2015-spectacular-snippet-3",
      data: {
        "snippet_id": "123",
        "bodyText": "HELLO there: We know you love Firefox, but did you know a non-profit called Mozilla built Firefox? Thanks to donations, Mozilla does a lot more than build this awesome browser. We teach people to code, fight for online privacy, and protect this amazing thing called the Web for future generations. Just a few times a year Mozilla asks for donations, and usually only a tiny portion of Firefox users give. <em>If everyone reading this chipped in $3 to help Mozilla, we could wrap this fundraiser up in under an hour and keep our work going another year.</em> <i>Thank you.</i>",
        "donationAmountFirst": "20",
        "donationAmountSecond": "10",
        "donationAmountThird": "5",
        "donationAmountFourth": "3",
        "donateButtonText": "Donate now",
        'monthlyCheckboxLabelText': 'Make my donation monthly',
        'closeButtonTitle': 'Remove',
        "blockable": true,
        "animate": true,
        "currencyCode": "usd",
        "locale": "en-US",
        'donationFormURL': "https://donate.mozilla.org/en-US/"
      }
    }, {
      source: "2015-snippet",
      destination: "2015-snippet-en-US",
      data: {
        "snippet_id": "666",
        "text": "Mozilla, die gemeinnützige Organisation hinter Firefox, ist auf Spenden von Leuten wie Ihnen angewiesen. <em>Falls jede Person, die das liest, ein paar Euro spendet, so wäre unsere Finanzierung für das nächste Jahr gesichert.</em>",
        "donationAmountFirst": "20",
        "donationAmountSecond": "10",
        "donationAmountThird": "5",
        "donationAmountFourth": "3",
        "donateButtonText": "Donate now",
        'monthlyCheckboxLabelText': 'Make my donation monthly',
        'closeButtonTitle': 'Remove',
        "blockable": true,
        "currencyCode": "usd",
        "locale": "en-US",
        'donationFormURL': "https://donate.mofostaging.net/en-US/"
      }
    }, {
      source: "2015-snippet",
      destination: "2015-snippet-de",
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
        'donationFormURL': "https://donate.mofostaging.net/de/"
      }
    }, {
      source: "2015-snippet",
      destination: "2015-snippet-fr",
      data: {
        "snippet_id": "666",
        "text": "Mozilla, die gemeinnützige Organisation hinter Firefox, ist auf Spenden von Leuten wie Ihnen angewiesen. <em>Falls jede Person, die das liest, ein paar Euro spendet, so wäre unsere Finanzierung für das nächste Jahr gesichert.</em>",
        "donationAmountFirst": "20",
        "donationAmountSecond": "10",
        "donationAmountThird": "5",
        "donationAmountFourth": "3",
        "donateButtonText": "Faire un don",
        'monthlyCheckboxLabelText': 'Je choisis un don mensuel',
        'closeButtonTitle': 'Supprimer',
        "blockable": true,
        "currencyCode": "eur",
        "locale": "fr",
        'donationFormURL': "https://donate.mofostaging.net/fr/"
      }
    }, {
      source: "2015-snippet",
      destination: "2015-snippet-pt-BR",
      data: {
        "snippet_id": "666",
        "text": "Mozilla, die gemeinnützige Organisation hinter Firefox, ist auf Spenden von Leuten wie Ihnen angewiesen. <em>Falls jede Person, die das liest, ein paar Euro spendet, so wäre unsere Finanzierung für das nächste Jahr gesichert.</em>",
        "donationAmountFirst": "250",
        "donationAmountSecond": "150",
        "donationAmountThird": "100",
        "donationAmountFourth": "50",
        "donateButtonText": "Doe agora",
        'monthlyCheckboxLabelText': 'Fazer minha doação mensal',
        'closeButtonTitle': 'Remover',
        "blockable": true,
        "currencyCode": "brl",
        "locale": "pt-BR",
        'donationFormURL': "https://donate.mofostaging.net/pt-BR/"
      }
    }, {
      source: "2015-snippet",
      destination: "2015-snippet-es",
      data: {
        "snippet_id": "666",
        "text": "Mozilla, die gemeinnützige Organisation hinter Firefox, ist auf Spenden von Leuten wie Ihnen angewiesen. <em>Falls jede Person, die das liest, ein paar Euro spendet, so wäre unsere Finanzierung für das nächste Jahr gesichert.</em>",
        "donationAmountFirst": "20",
        "donationAmountSecond": "10",
        "donationAmountThird": "5",
        "donationAmountFourth": "3",
        "donateButtonText": "Donar ahora",
        'monthlyCheckboxLabelText': 'Hacer una donación mensual',
        'closeButtonTitle': 'Eliminar',
        "blockable": true,
        "currencyCode": "eur",
        "locale": "es",
        'donationFormURL': "https://donate.mofostaging.net/es/"
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
