(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	$(document).ready(function(){

		var jtrt_tables = $('.jtrt-table');
		jtrt_tables.each(function(element) {
			
			var table = jQuery(jtrt_tables[element]);
			var id = table.attr('data-jtrt-table-id');
			var jtrt_table_data = JSON.parse($('textarea#jtrt_table_settings_'+id).html());

	
			jtrt_table_data[1].forEach(function(element) {
				var tRow = table.find('tr').eq(element['row']);
				var tCell = tRow.find('td,th').eq(element['col']);
				tCell.addClass(element['className']);

				if(element['borders']){
					var borderInfor = element['borders'];

					for (var key in borderInfor) {
						// skip loop if the property is from prototype
						if (!borderInfor.hasOwnProperty(key)) continue;

						var obj = borderInfor[key];
						for (var prop in obj) {
							// skip loop if the property is from prototype
							if(!obj.hasOwnProperty(prop)) continue;

							// your code
							if(key == "left" || key == "right" || key == "top" || key == "bottom"){
								if(obj['hide'] != true){
									tCell.addClass('border-'+key);
								}
							}
						}
					}

				}

				if(element['jtfootablebps']){
					var fottablehiddenVals = element['jtfootablebps'];
					var hiddenArraytoSplit = [];
					for (var key in fottablehiddenVals) {
						// skip loop if the property is from prototype
						if (!fottablehiddenVals.hasOwnProperty(key)) continue;

						if(fottablehiddenVals[key] != ""){
							hiddenArraytoSplit.push(fottablehiddenVals[key]);
						}
						
					}
					var bpStringjt = hiddenArraytoSplit.join(' ');
					tCell.attr('data-breakpoints',bpStringjt);
					tCell.attr('data-title',tCell.html());
				}

				if(element['jtfootabcoltype']){
					var fottablehiddenVals = element['jtfootabcoltype'];
					tCell.attr('data-type',fottablehiddenVals);
				}

				for (var k in element['jtcellstyle']){
					if (element['jtcellstyle'].hasOwnProperty(k)) {
						tCell.css(k,element['jtcellstyle'][k])
					}
				}
			}, this);


		}, this);

		$('.jtrespo-scroll table').each(function(infxx,tableee){
			var mytablr = $(tableee),
				isfiltered = mytablr.attr('data-filtering'),
				isSorted = mytablr.attr('data-sorting'),
				isPaged = mytablr.attr('data-paging'),
				isPagedCtn = mytablr.attr('data-paging-size');

			if(isfiltered == "true" || isSorted == "true" || isPaged == "true"){
				mytablr.DataTable({
					"paging":isPaged,
					"ordering":isSorted,
					"searching":isfiltered,
					"info":false,
				});
			}
		});


		$('.jtrespo-stack').each(function(infxx,tableee){
			var theadVals = $(tableee).find('thead tr th');
				var myVals = [];
				theadVals.each(function(indx,elem){
					myVals.push($(elem).html());
				});

				var mytbodyRows = $(tableee).find('tbody tr');

				mytbodyRows.each(function(indx,elem){
					var mytdcol = $(elem).find('td');
					

					mytdcol.each(function(indxx,elemm){
						var mytdcolval = $(elemm).html();
						$(elemm).html("<span class='stackedheadtitlejt' style='font-weight:bold;'>" + myVals[indxx] + ":</span><br>" + mytdcolval);
					});

				});
		});

		function checkTableWidth(table){
			if(table.outerWidth(true) < table.parent('.jtrespo-stack').attr('data-jtrt-stack-width')){
				table.addClass('stackMeNowJT');
				
			}else{
				table.removeClass('stackMeNowJT');
			}
		}

		checkTableWidth($('.jtrespo-stack table'));

		$(window).resize(function(){
			checkTableWidth($('.jtrespo-stack table'));
		});

		$('.highlightRows tr').on('mouseenter',function(){
			$(this).css('background',$('.highlightRows').attr('data-jtrt-rowhighligh-color'));
		});
		$('.highlightRows tr').on('mouseleave',function(){
			$(this).css('background','inherit');
		});


		$('.highlightCols td').on('mouseenter',function(){
			var eq = $(this).index() + 1;
			$('.highlightCols td:nth-child('+eq+')').css('background',$('.highlightCols').attr('data-jtrt-colhighligh-color'));
		});
		$('.highlightCols td').on('mouseleave',function(){
			var eq = $(this).index() + 1;
			$('.highlightCols td:nth-child('+eq+')').css('background','inherit');
		});

		

		$('.jtrespo-footable table').each(function(idx,elem){
			var id = $(elem).attr('data-jtrt-table-id');
			var footablBreaksjt = JSON.parse($('#jtrt_table_bps_'+id).html());
			$(elem).footable({
				"breakpoints": footablBreaksjt,
				"useParentWidth": true,
				"showToggle": true
				
			});
		});


		

	});
		
})( jQuery );
