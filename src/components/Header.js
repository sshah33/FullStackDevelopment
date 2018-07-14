import React from 'react';
import PropTypes from 'prop-types'

const Header = ({message}) => {
	return(
		<h2 className="text-center">
			{message}
		</h2>
	);
};

Header.PropTypes = {
	message: PropTypes.String
};

export default Header;
