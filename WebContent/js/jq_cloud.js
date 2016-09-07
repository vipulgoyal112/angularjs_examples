$(document).ready(function() {
	$.get('/static/themes.json')
	.success(function(res) {
		$("#jqi-cloud-bkt-wrapper").show();
		var relWrap = $("#jqi-cloud-bkt-wrapper").find(".jq-data").html("");
		if(res.themes){
			var h = relWrap.parent().height();
			var w = relWrap.parent().width();
			relWrap.css({"width": w, "height": "500"});
			var jQCloud1 = relWrap.data("jqcloud");
			if(jQCloud1) {
				jQCloud1.destroy();
			}
			var themeCount = Math.min(res.themes.length, 30);
			var themes = [];
			for(var i = 0; i < themeCount; i++) {
				var th = res.themes[i];
				th.handlers = {click: function() {
					var themeTemp = th;
					return function() {
						//$scope.showView({'searchToken': $scope.searchToken + " \"" + themeTemp.text + "\"", 'name' : themeTemp.text + "~FR"});
						/*var q = $.trim($("#jqi-ac-in").val()) + ' "' + themeTemp.text + '"';
						getSearchResults({"q": q});*/
	                }
				}()};
				themes.push(th);
		   	}
			relWrap.jQCloud(themes);
		} else {
			relWrap.html("No data found");
	    }
	});
});