function addClass( el, value ) {
	var classNames, i, l, elem,
		setClass, c, cl;

	if ( value && typeof value === "string" ) {
		classNames = value.split( ' ' );
		
		if ( el.constructor != 'NodeList' ) el = [el];

		for ( i = 0, l = el.length; i < l; i++ ) {
			elem = el[ i ];

			if ( elem.nodeType === 1 ) {
				if ( !elem.className && classNames.length === 1 ) {
					elem.className = value;

				} else {
					setClass = " " + elem.className + " ";

					for ( c = 0, cl = classNames.length; c < cl; c++ ) {
						if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
							setClass += classNames[ c ] + " ";
						}
					}
					elem.className = setClass.trim();
				}
			}
		}
	}

	return this;
}

function removeClass( el, value ) {
	//	stripped down version of jquery's removeClass
	var className = ( " " + el.className + " " );
	className = className.replace( " " + value + " ", " " );
	el.className = className.trim();
}

function parentByClass( elem, className ) {
	var matched, cur = elem;

	do {
		cur = cur.parentNode;
		if ( cur.className.indexOf( className ) !== -1 ) matched = cur;
	}
	while ( cur && cur.nodeType !== 9 && cur.className.indexOf( className ) === -1 );
	return matched;
}

//	Simplified jQuery.extend
Object.prototype.extendWith = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy || (copyIsArray = Array.isArray(copy)) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];

					} else {
						clone = src;
					}

					// Never move original objects, clone them
					target[ name ] = Object.prototype.extendWith( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};