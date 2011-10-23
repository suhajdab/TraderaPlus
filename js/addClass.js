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
	var classNames, i, l, elem, className, c, cl;

	if ( (value && typeof value === "string") || value === undefined ) {
		classNames = (value || "").split( rspace );

		for ( i = 0, l = this.length; i < l; i++ ) {
			elem = this[ i ];

			if ( elem.nodeType === 1 && elem.className ) {
				if ( value ) {
					className = (" " + elem.className + " ").replace( rclass, " " );
					for ( c = 0, cl = classNames.length; c < cl; c++ ) {
						className = className.replace(" " + classNames[ c ] + " ", " ");
					}
					elem.className = jQuery.trim( className );

				} else {
					elem.className = "";
				}
			}
		}
	}

	return this;
}

function parentByClass( elem, className ) {
	var matched, cur = elem[ 'parentNode' ];

	while ( cur && cur.nodeType !== 9 && cur.className.indexOf( className ) === -1 ) {
		cur = cur[ 'parentNode' ];
	}
	return cur;
}