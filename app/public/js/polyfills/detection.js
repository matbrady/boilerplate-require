/** 
 * Detection Polyfill
 * 
 * Stand-alone module for non-jquery class/id detection
 * @return has() : function that tests for basic CSS selector queries.
 */
define(function() {	

	// querySelectorAll Polyfill:
	if (!document.querySelectorAll) {
		var d=document, s=d.createStyleSheet();
		d.querySelectorAll = function(r, c, i, j, a) {
			a=d.all, c=[], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
			for (i=r.length; i--;) {
				s.addRule(r[i], 'k:v');
				for (j=a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
				s.removeRule(0);
			}
			return c;
		}
	}

	return {
		// has() : tests for basic CSS selector queries.
		has: function(selector) {
			return document.querySelectorAll(selector).length > 0;
		}
		
	};

});