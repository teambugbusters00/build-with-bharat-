import React, { useEffect } from 'react';
import './Garden.css';

const Garden = () => {
  useEffect(() => {
    // JS animations here if needed
    // For now, skip as it requires GSAP
  }, []);

  return (
    <div className="canvas">
      <div className="grass"></div>
      <div className="bees">
        <div className="bees__1"></div>
        <div className="bees__2"></div>
        <div className="bees__3"></div>
      </div>
      <div className="flowers">
        <div className="flowers__pink">
          <div className="flowers__stem"></div>
          <div className="flowers__petals"></div>
          <div className="flowers__dot1"></div>
          <div className="flowers__dot2"></div>
        </div>
        <div className="flowers__blue">
          <div className="flowers__stem"></div>
          <div className="flowers__petals"></div>
        </div>
        <div className="flowers__orange">
          <div className="flowers__stem"></div>
          <div className="flowers__petals"></div>
        </div>
        <div className="flowers__yellow">
          <div className="flowers__stem"></div>
          <div className="flowers__petals"></div>
          <div className="flowers__dot1"></div>
          <div className="flowers__dot2"></div>
          <div className="flowers__dot3"></div>
        </div>
        <div className="flowers__yellow2">
          <div className="flowers__stem"></div>
          <div className="flowers__petals"></div>
        </div>
        <div className="flowers__purple">
          <div className="flowers__stem"></div>
          <div className="flowers__petals"></div>
          <div className="flowers__dot1"></div>
          <div className="flowers__dot2"></div>
        </div>
      </div>
      <div className="tree">
        <div className="tree__top"></div>
        <div className="tree__face">
          <div className="tree__leye"></div>
          <div className="tree__reye"></div>
          <div className="tree__mouth"></div>
        </div>
        <div className="tree__shade1"></div>
        <div className="tree__shade2"></div>
        <div className="tree__shade3"></div>
        <div className="tree__shade4"></div>
        <div className="tree__shade5"></div>
        <div className="tree__trunk1"></div>
        <div className="tree__trunk2"></div>
        <div className="tree__trunk3">
          <div className="tree__trunk3__leaf1"></div>
          <div className="tree__trunk3__leaf2"></div>
          <div className="tree__trunk3__leaf3"></div>
        </div>
      </div>
      <div className="bird">
        <div className="bird__head"></div>
        <div className="bird__body"></div>
        <div className="bird__tail"></div>
        <div className="bird__note1"></div>
        <div className="bird__note2"></div>
        <div className="bird__note3"></div>
      </div>
    </div>
  );
};

export default Garden;