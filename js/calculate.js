/**
 * Created by verenka on 10/12/14.
 */

var exchangeRate;
var currencies=[];
var currencyCode;

$(function() {

    $.ajax({
        url:'currencylist.php',
        success: function(data) {
            currencies = JSON.parse(data);
            currencyList();
        }
    });

    $('#toEUR').click(function() {
        curToEur();
    });

    $('#toCur').click(function() {
        eurToCur();
    });

});

function determineCurrency(curCode) { //is only ever called from index.html
    currencyCode = curCode;
    exchangeRate = parseFloat(currencies[curCode].rate);

    //set Header and Buttons to CurrencyCode <-> EUR
    $('#setheader').html("EUR <-> " + currencyCode);
    $('#toEUR').html(currencyCode + " -&gt; EUR");
    $('#toCur').html("EUR -&gt; " + currencyCode);
}

function eurToCur() {

    if (isNaN(parseFloat($('#amount_entered').val())))
    {
        $('#result').append("Please enter a number!<br />");
    }
    else
    {
        var eur = $('#amount_entered').val();
        var cur = Math.round((eur * exchangeRate) * 100) / 100;
        $('#result').append(eur + " EUR are equal to " + cur + " " + currencyCode +".<br />");
    }
}

function curToEur() {

     if (isNaN(parseFloat($('#amount_entered').val())))
     {
         $('#result').append("Please enter a number!<br />");
     }
    else
     {
         var cur = parseFloat($('#amount_entered').val());
         var eur = Math.round(cur / exchangeRate *100)/100;
         $('#result').append(cur + " " + currencyCode + " are equal to " + eur + " EUR.<br />");
     }

}

function currencyList() {
    for (key in currencies) {
        mycurrency = currencies[key];
        $('#currencylist').append('<li data-theme="d">'
        + '<a href="#conversion" data-transition="slide" onclick="determineCurrency(' + "'" + mycurrency.code +"'" + ')">'
            //These quotation marks cost me an hour of my life I won't get back and
            // are apparently necessary for the function to accept a String
        + mycurrency.code
        + '<span class="ui-li-count">'
        + mycurrency.rate
        + '</span>' +
        '</a>' +
        '</li>').listview('refresh');
        }

}