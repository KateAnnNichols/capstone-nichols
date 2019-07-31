import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './StickerCount.css';

class StickerCount extends Component {
    render() {
        return (
            <div className="sticker-count">
                <div><strong>current total boards completed today:</strong><br/>{this.props.customer}<br/></div>
                <div><strong>current goal:</strong><br/>{this.props.movie}</div>
            </div>
        )
    }
}

export default StickerCount