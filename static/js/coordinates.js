(function($){

		
		$.fn.coordinates = function (options)
		{
			
			// set options
			var 
			initial = {
				title : 'click for somethingelse',
				error : {type: 'it\'s not a table'},
				
				extra : $.noop,
				
				color : {on: 'red', off : this.css('color') || 'black'}
			}, 
			opt = $.extend(initial, options),
			klass = opt['class'] || null;			
			
			return this.each( function(){
			
			// save jQuery table object
			var that = $(this);

			// works only with table
			if ( ! that.is('table'))
			{
				// record a warning 
				console.log(opt.error.type)				
				// return element for chaining
				return that;
			}
			// show cursor
			that.find('tr>td').css('cursor', 'pointer');
			// select cells without th and first cell of the row
			var cols = that.find('th').length;
			var cells = that.find('td').filter(function(i){return i % cols}).attr('title', opt.title).hover(
				//over
				function(inx){
					var 
					jtd = $(this),
					col = jtd.index(),
					row = jtd.parent().index(),// because header cells are an extra row
 
					th = that.find('th').eq(col),		
					tr = that.find('tr').eq(row).find('td:first');

					if (klass)
					{
						// show coordinate
						th.addClass(klass);
						tr.addClass(klass);
						// show cell
						jtd.addClass(klass);
					}
					else
					{
						// store original colors of cell, header cell and leftmost cell
						$.data(this, 'color-th', th.css('color') || opt.color.off);
						th.css('color', opt.color.on);
						$.data(this, 'color-tr', tr.css('color') || opt.color.off);
						tr.css('color', opt.color.on);
						$.data(this, 'color-cell', jtd.css('color') || opt.color.off);
						jtd.css('color', opt.color.on);
					}
					//var prices = jtd.text().split(',');
					var 
					priceUnit = parseFloat(jtd.text()).toFixed(2), 
					priceTotal = priceUnit * parseInt(tr.text()),
					priceTotalTVA = priceTotal * (1+ that.data('tva'));
					$.data(jtd, 'title') || $.data(jtd, 'title', 
						that.find('caption').text() + "\n" + 
						tr.text() + ' bucati pe ' + th.text() + ' grame' + "\n" + 
						priceUnit + ' pret bucata ' + "\n" + 
						priceTotal.toFixed(2) + ' pret total' + "\n" + 
						priceTotalTVA.toFixed(2) + ' pret cu tva' + "\n" + 
						'preturi in ' + that.data('valute')
					);
					jtd.attr('title', $.data(jtd, 'title'));
										
					// execute onmouseover client callback
					$.isFunction(opt.onmouseover) && opt.onmouseover($(this));
				},
				// out
				function(){
					var 
					jtd = $(this),
					col = jtd.index(),
					row = jtd.parent().index(),
 
					th = that.find('th').eq(col),		
					tr = that.find('tr').eq(row).find('td:first');
					
					if (klass)
					{
						th.removeClass(klass);
						tr.removeClass(klass);

						jtd.removeClass(klass);						
					}
					else
					{
						th.css('color', $.data(this, 'color-th'));
						tr.css('color', $.data(this, 'color-tr'));						
						jtd.css('color', $.data(this, 'color-cell'));
					}
					
					// execute onmouseout client callback
					$.isFunction(opt.onmouseout) && opt.onmouseout($(this));

				}).
				// execute click client callback
				click( function(){$.isFunction(opt.onclick) && opt.onclick($(this))});
				
			// apply extra function to cells 
			$.isFunction(opt.extra) && opt.extra.call(that, $(cells));
	
			});

		}

})(jQuery);
