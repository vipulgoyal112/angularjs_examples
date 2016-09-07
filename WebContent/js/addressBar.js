angular.module('address-bar', [])
.directive('ngAddressBar', function($browser, $timeout) {
   return {
     template: 'Address: <input id="addressBar" type="text" style="width: 400px" >',
     link: function(scope, element, attrs){
    	 
    	 var $container 	= $('#am-container'),
			$imgs		= $container.find('img').hide(),
			totalImgs	= $imgs.length,
			cnt			= 0;
		
		$imgs.each(function(i) {
			var $img	= $(this);
			$('<img/>').load(function() {
				++cnt;
				if( cnt === totalImgs ) {
					$imgs.show();
					$container.montage({
						fillLastRow				: true,
						alternateHeight			: true,
						alternateHeightRange	: {
							min	: 90,
							max	: 240
						}
					});
					
					/* 
					 * just for this demo:
					 */
					$('#overlay').fadeIn(500);
				}
			}).attr('src',$img.attr('src'));
    	 
    	 
    	 /*
       var input = element.children("input"), delay;

       input.on('keypress keyup keydown', function(event) {
               delay = (!delay ? $timeout(fireUrlChange, 250) : null);
               event.stopPropagation();
             })
            .val($browser.url());

       $browser.url = function(url) {
         return url ? input.val(url) : input.val();
       };

       function fireUrlChange() {
         delay = null;
         $browser.urlChange(input.val());
       }
     */}
   };
 });