var fs = require('fs');
var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

function build() {
  function compile(snippet, index, original) {
    var snippetData = snippet.data;
    var snippetSource = fs.readFileSync(snippet.source + "/snippet.html", "utf8");
    if (snippetData) {
      Object.keys(snippetData).forEach(function(dataKey, index, original) {
        var dataValue = snippetData[dataKey];
        dataKey = dataKey.replace("|", "\\|");
        dataKey = dataKey.replace("(", "\\(");
        dataKey = dataKey.replace(")", "\\)");
        snippetSource = snippetSource.replace(new RegExp(dataKey, 'g'), dataValue);
      });
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
        "{{ snippet_id }}": "666",
        "{{ body|safe }}": "What kind of information do you think the United States government should collect about you? <a href=\"https://sendto.mozilla.org/page/content/surveillance-interstitial/\">Sort it out here, and get smart on surveillance.</a>"
      }
    }, {
      source: "simple-snippet",
      destination: "simple-snippet",
      data: {
        "{{ snippet_id }}": "666",
        "{{ text|safe }}": "<b>Dear Firefox users:</b> Mozilla puts the public good and user privacy before profit. If Firefox is useful to you, take one minute to support the non-profit behind it. <em>If everyone reading this donates $3, Mozilla's fundraiser would be over within an hour.</em> <i>Thank you.</i></p>",
        "{{ highlightColor }}": 'rgba(243, 248, 1, 0.4)',
        "{{ donationAmountLeft|safe }}": "10",
        "{{ donationAmountMiddle|safe }}": "5",
        "{{ donationAmountRight|safe }}": "3",
        "{{ donateButtonText|safe }}": "Donate Now",
        '{{ donationFormURL|safe }}': "https://sendto.mozilla.org/page/contribute/givenow-seq",
        '{{ backgroundColor }}': '',
        '{{ backgroundImg }}': '',
        '{{ buttonAnimate }}': ''
      }
    }, {
      source: "2015-snippet",
      destination: "2015-snippet",
      data: {
        "{{ snippet_id }}": "666",
        "{{ text|safe }}": "<b>Hello there:</b> We know you love Firefox, but did you know a non-profit called Mozilla built Firefox? Thanks to donations, Mozilla does a lot more than build this awesome browser. We teach people to code, fight for online privacy, and protect this amazing thing called the Web for future generations. Just a few times a year Mozilla asks for donations, and tens of thousands of people all over the world give. If the didn't, we couldn't do all this good stuff. <em>If everyone reading this chipped in jast a few dollars we could wrap this fundraiser up in under an hour. You can make a donation here. Thank you.</em>",
        "{{ highlightColor }}": '#FFF8D0',
        "{{ donationAmountFirst|safe }}": "20",
        "{{ donationAmountSecond|safe }}": "10",
        "{{ donationAmountThird|safe }}": "5",
        "{{ donationAmountFourth|safe }}": "3",
        "{{ donateButtonText|safe }}": "Donate Now",
        '{{ monthlyCheckboxLabelText|safe }}': 'Make my donation monthly',
        '{{ donationFormURL|safe }}': "https://donate.mofostaging.net/en-US/"
      }
    }, {
      source: "simple-snippet",
      destination: "disruptive-snippet-yellow",
      data: {
        "{{ snippet_id }}": "666",
        "{{ text|safe }}": "<b>Dear Firefox users:</b> Mozilla puts the public good and user privacy before profit. If Firefox is useful to you, take one minute to support the non-profit behind it. <em>If everyone reading this donates $3, Mozilla's fundraiser would be over within an hour.</em> <i>Thank you.</i></p>",
        "{{ highlightColor }}": '',
        "{{ donationAmountLeft|safe }}": "10",
        "{{ donationAmountMiddle|safe }}": "5",
        "{{ donationAmountRight|safe }}": "3",
        "{{ donateButtonText|safe }}": "Donate Now",
        '{{ donationFormURL|safe }}': "https://sendto.mozilla.org/page/contribute/givenow-seq",
        '{{ backgroundColor }}': 'linear-gradient(to bottom, #FEE885, #FCDE3F)',
        '{{ buttonAnimate }}': 'background-animate2' // background-animate1 or background-animate2
      }
    }, {
      source: "simple-snippet",
      destination: "disruptive-snippet-grey",
      data: {
        "{{ snippet_id }}": "666",
        "{{ text|safe }}": "<b>Dear Firefox users:</b> Mozilla puts the public good and user privacy before profit. If Firefox is useful to you, take one minute to support the non-profit behind it. <em>If everyone reading this donates $3, Mozilla's fundraiser would be over within an hour.</em> <i>Thank you.</i></p>",
        "{{ highlightColor }}": '',
        "{{ donationAmountLeft|safe }}": "10",
        "{{ donationAmountMiddle|safe }}": "5",
        "{{ donationAmountRight|safe }}": "3",
        "{{ donateButtonText|safe }}": "Donate Now",
        '{{ donationFormURL|safe }}': "https://sendto.mozilla.org/page/contribute/givenow-seq",
        '{{ backgroundColor }}': 'linear-gradient(to bottom, #5B595B, #3A3A3C)',
        '{{ fontColor }}': '#F3F3F4',
        '{{ buttonAnimate }}': 'background-animate2' // outline-animate or background-animate
      }
    }, {
      source: "paypal-snippet",
      destination: "paypal-snippet",
      data: {
        "{{ snippet_id }}": "666",
        '{{ donationAmountLeft|safe }}': '10',
        '{{ donationAmountRight|safe }}': '3',
        '{{ donationAmountMiddle|safe }}': '5',
        '{{ donationFormURL|safe }}': 'https://sendto.mozilla.org/page/contribute/givenow-seq?ref=EOYFR2014&amp;utm_campaign=EOYFR2014&amp;utm_source=firefox&amp;utm_medium=snippet&amp;utm_content=SelectAMT_test2&amp;sample_rate=0.1&amp;snippet_name=4807',
        '{{ paypalURL|safe }}': 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=44ZHAVWJHTK2N&amp;locale=US&amp;item_name=Mozilla%20Foundation&amp;no_note=1&amp;no_shipping=1&amp;rm=1&amp;custom=20140923%20eoy14%20sequential&amp;currency_code=USD&amp;amount=',
        '{{ text|safe }}': 'Mozilla, the non-profit behind Firefox, relies on grants and donations from people like you. <em>If everyone reading this donates a few dollars, we can be fully funded for another year.</em>',
        '{{ highlightColor }}': 'rgba(243, 248, 1, 0.4)',
        '{{ backgroundColor }}': '',
        '{{ selectAmount|safe }}': 'Select Amount',
        '{{ paymentMethod|safe }}': 'Payment Method',
        '{{ donateNow|safe }}': 'Donate Now',
        '{{ buttonAnimate }}': '', // outline-animate or background-animate
        '{{thumbnailImg}}': '',
        '{{paypalImg}}': '',
        '{{creditCardImg}}': ''
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
