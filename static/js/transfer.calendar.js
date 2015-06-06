$(document).ready(function(){
	
    var btn = $('#pick');
	//bnt.css({ opacity: 0.5 });
	//btn.alpha(0.7);

    var lbls = $('#model-box label');
    lbls.mouseenter(function(){
    var el = $(this);
    var el_pos = el.position();
    
    var cls = 'model-selected';    
    
    lbls.not(this).removeClass(cls);
    if (el.hasClass(cls))
    {
        el.removeClass(cls);
        //if (btn.is(':visible'))
			//btn.hide();
    }
    else
    {
        el.addClass(cls);
        btn.css('position', 'absolute').css('left', el_pos.left + (el.width() - btn.width()) / 2).css('top', el_pos.top + (el.height() - btn.height()) / 2);
        //btn.show(); 
           
    }
	btn.show();
	var txt = el.next().val();
	var first = txt.indexOf('.');
	var last = txt.lastIndexOf('.');
	var pret = txt.substring(first + 1, last);
	if ( ! pret)
		pret = 29;
	$('#pickx').html('<h5>Model "' + txt.substring(0, first) + '"</h5><p>' + pret +'RON</p>').show();
	$('#picky').css('display', 'block').show();
    
    lbls.next().removeAttr('checked');
    el.next().click().attr('checked', 'checked');
    //console.log(el.next());  
    })

	// lbls.mouseleave(function(){
		// btn.hide();    
		// var cls = 'model-selected';    
		// $(this).removeClass(cls);}
	//);
	$('#model-box').mouseleave(function(){btn.hide();});
	
$largest = 680;	
    
$('div.luna-completata a').click(function(){
    var el = $(this);
    var file = el.attr('href');

    var img = $('<img style="display: block; margin: auto; border:5px solid white; cursor: pointer;" src="' + file.substr(file.indexOf('=') + 1) + '?anti-cache='+ Math.floor(Math.random()*1000) +'" />');
	img.load(function(){if ($(this).width() > $largest) $(this).width($largest)});
    $('#uploader').hide();

    $('body').css('background-color', '#447aad').prepend(img).show('fast');
    img.click(function()
    {
    $('body').css('background-color', 'white');
    img.hide('fast').remove();
    $('#uploader').show();});
     
    return false;
})


$('#up').click(function()
    {

        $('#upload-box').html('<strong>se incarca imaginea...</strong>');
    });       

});
