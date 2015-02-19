define([], function() {
	return {
		/**
		 * Method retrieves an array of strings and creates an object which has a field for every array element. 
		 * Every field has its key as its value.
		 * 
		 * Example:
		 * console.log(keyMirror(["A", "B", "C"]))
		 * // Output: { A: "A", B: "B", C: "C" }
		 */
		keyMirror: function(names) {
			var ret = { };
			
			names.forEach(function(name) {
				ret[name] = name;
			});
			
			return ret;
		}
	};
});