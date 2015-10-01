/**
 * @file text-track-display.js
 */
import Component from '../component';
import Menu from '../menu/menu.js';
import MenuItem from '../menu/menu-item.js';
import MenuButton from '../menu/menu-button.js';
import * as Fn from '../utils/fn.js';
import document from 'global/document';
import window from 'global/window';
import  * as Dom from '../utils/dom.js';

const darkGray = '#222';
const lightGray = '#ccc';
const fontMap = {
  monospace:             'monospace',
  sansSerif:             'sans-serif',
  serif:                 'serif',
  monospaceSansSerif:    '"Andale Mono", "Lucida Console", monospace',
  monospaceSerif:        '"Courier New", monospace',
  proportionalSansSerif: 'sans-serif',
  proportionalSerif:     'serif',
  smallcaps:             '"Andale Mono", "Lucida Console", monospace, sans-serif'
};

/**
 * 
 *
 * @param {Object} player  Main Player
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready    Ready callback function
 * @extends Component
 * @class TextTrackDisplay
 */
class CustomOverlay extends Component {

  constructor(player, options, ready){
    super(player, options, ready);

    player.on('loadstart', Fn.bind(this, this.toggleDisplay));

    // This used to be called during player init, but was causing an error
    // if a track should show by default and the display hadn't loaded yet.
    // Should probably be moved to an external track loader when we support
    // tracks that don't need a display.
    player.ready(Fn.bind(this, function() {
      player.on('fullscreenchange', Fn.bind(this, this.updateDisplay));

    }));
  }

  /**
   * This calls the show method (from the Component class) 
   *    removes vjs-hidden
   *
   * Toggle display texttracks
   *
   * @method toggleDisplay
   */
  toggleDisplay() {
    if (this.player_.tech_) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    var el  = super.createEl('div', {
      className: 'vjs-custom-overlay-display'
    });

    this.contentEl_ = Dom.createEl('p');
    console.log(this);
    console.log(el);
    //console.log(this.contentEl_);
    el.appendChild(this.contentEl_);
    this.contentEl_.innerHTML = 'This is test text this is test test kslafjklasdjfkadsflkajdsflkajdflkajdflaskfjlakdfjlkadjflkadfjlksadfjlkajdfklj slkdfjlaksdfjlkasfjlkasdfjlkasdjflkadjflkajdsfklajdfklajdfkjasdf asdf jaskdfjlakdsfjkas dflkasdj faskldfjaksdfj lkads flkadj flkdfj lkajdf lakjdf ';
    return el;
  }

  /**
   * Clear display texttracks
   *
   * @method clearDisplay
   */
  clearDisplay() {
    if (typeof window['WebVTT'] === 'function') {
      window['WebVTT']['processCues'](window, [], this.el_);
    }
  }

  /**
   * Update display texttracks
   *
   * @method updateDisplay
   */
  updateDisplay() {
    var tracks = this.player_.textTracks();

    this.clearDisplay();

    if (!tracks) {
      return;
    }

    for (let i=0; i < tracks.length; i++) {
      let track = tracks[i];
      if (track['mode'] === 'showing') {
        this.updateForTrack(track);
      }
    }
  }
}

/**
* Add cue HTML to display
*
* @param {Number} color Hex number for color, like #f0e
* @param {Number} opacity Value for opacity,0.0 - 1.0
* @return {RGBAColor} In the form 'rgba(255, 0, 0, 0.3)'
* @method constructColor
*/
function constructColor(color, opacity) {
  return 'rgba(' +
    // color looks like "#f0e"
    parseInt(color[1] + color[1], 16) + ',' +
    parseInt(color[2] + color[2], 16) + ',' +
    parseInt(color[3] + color[3], 16) + ',' +
    opacity + ')';
}

/**
 * Try to update style
 * Some style changes will throw an error, particularly in IE8. Those should be noops.
 *
 * @param {Element} el The element to be styles
 * @param {CSSProperty} style The CSS property to be styled
 * @param {CSSStyle} rule The actual style to be applied to the property
 * @method tryUpdateStyle
 */
function tryUpdateStyle(el, style, rule) {
  //
  try {
    el.style[style] = rule;
  } catch (e) {}
}

Component.registerComponent('CustomOverlay', CustomOverlay);
export default CustomOverlay;
