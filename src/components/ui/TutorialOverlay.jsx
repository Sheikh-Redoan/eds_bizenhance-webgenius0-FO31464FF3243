import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTutorialActive, selectCurrentStep } from '../../redux/slices/tutorialSlice';
import { useLocation } from 'react-router-dom';
import './TutorialOverlay.css';

const TUTORIAL_STEPS = {
  1: { id: 'tour-nav-languages', text: 'Click here to explore our language library.' },
  2: { id: 'tour-explore-song', text: 'Select a language to explore its songs.' },
  3: { id: 'tour-open-song', text: 'Open your first song to begin learning.' },
  4: { id: 'tour-play-song', text: 'Click Play to listen and read along.' },
  5: { id: 'tour-waiting', text: '' }, // INVISIBLE STEP: Overlay will hide while playing
  6: { id: 'tour-start-exercise', text: 'Great job! Now test your knowledge.' },
  7: { id: 'tour-view-dashboard', text: 'View your progress on the dashboard!' }
};

const TutorialOverlay = () => {
  const isActive = useSelector(selectTutorialActive);
  const currentStep = useSelector(selectCurrentStep);
  const location = useLocation();

  const [overlayStyle, setOverlayStyle] = useState({
    top: { height: 0 }, right: { width: 0 }, bottom: { height: 0 }, left: { width: 0 }
  });
  const [tooltipStyle, setTooltipStyle] = useState({ top: 0, left: 0, opacity: 0 });
  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    // If inactive, ensure everything is hidden
    if (!isActive || !currentStep) {
      setTooltipStyle({ opacity: 0 });
      setOverlayStyle({ top: { height: 0 }, right: { width: 0 }, bottom: { height: 0 }, left: { width: 0 }});
      return;
    }

    const stepData = TUTORIAL_STEPS[currentStep];
    if (!stepData) return;

    let lastTarget = null;

    // Use an interval to constantly check for the element, accommodating API load times and 3D page flips
    const updateLoop = setInterval(() => {
      const target = document.getElementById(stepData.id);
      
      if (!target) {
        // Element not on DOM yet (API loading) or removed
        setTooltipStyle(prev => prev.opacity !== 0 ? { top: 0, left: 0, opacity: 0 } : prev);
        setOverlayStyle({ top: { height: 0 }, right: { width: 0 }, bottom: { height: 0 }, left: { width: 0 }});
        if (lastTarget) {
            lastTarget.classList.remove('tutorial-highlight');
            lastTarget = null;
        }
        return;
      }

      const box = target.getBoundingClientRect();
      
      // Check if element is actually visible on screen (solves elements hidden behind 3D book pages)
      if (box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < window.innerHeight) {
        
        if (lastTarget !== target) {
            if (lastTarget) lastTarget.classList.remove('tutorial-highlight');
            target.classList.add('tutorial-highlight');
            lastTarget = target;
        }

        const padding = 10;
        const bodyBox = document.body.getBoundingClientRect();

        setOverlayStyle({
          top: { height: Math.max(0, box.top - padding) + 'px' },
          right: { width: Math.max(0, bodyBox.right - (box.right + padding)) + 'px' },
          bottom: { height: Math.max(0, window.innerHeight - (box.bottom + padding)) + 'px' },
          left: { width: Math.max(0, box.left - padding) + 'px' }
        });

        const tooltipWidth = 300; 
        let messageLeft = (box.left + box.width / 2) - (tooltipWidth / 2);
        if (messageLeft < 10) messageLeft = 10;
        if (messageLeft + tooltipWidth > window.innerWidth - 10) {
          messageLeft = window.innerWidth - tooltipWidth - 10;
        }

        let messageTop = box.bottom + padding + 15;
        let rotate = false;
        if (messageTop + 100 > window.innerHeight && box.top - padding - 100 > 0) {
          messageTop = box.top - padding - 80;
          rotate = true;
        }

        setTooltipText(stepData.text);
        setTooltipStyle({
          left: `${messageLeft}px`,
          top: `${messageTop}px`,
          opacity: 1,
          transform: rotate ? 'rotate(180deg)' : 'none'
        });
      } else {
        // Target is in DOM but hidden (e.g. flipped book page)
        setTooltipStyle(prev => prev.opacity !== 0 ? { top: 0, left: 0, opacity: 0 } : prev);
        setOverlayStyle({ top: { height: 0 }, right: { width: 0 }, bottom: { height: 0 }, left: { width: 0 }});
      }
    }, 150); // Checks rapidly without impacting performance

    return () => {
      clearInterval(updateLoop);
      if (lastTarget) lastTarget.classList.remove('tutorial-highlight');
    };
  }, [isActive, currentStep, location.pathname]); // Depend on path changes

  if (!isActive) return null;

  return (
    <div className="tutorial-overlay-container">
      <div className="overlay-panel panel-top" style={overlayStyle.top}></div>
      <div className="overlay-panel panel-right" style={overlayStyle.right}></div>
      <div className="overlay-panel panel-bottom" style={overlayStyle.bottom}></div>
      <div className="overlay-panel panel-left" style={overlayStyle.left}></div>
      
      <div className="tutorial-message" style={tooltipStyle}>
        <p style={{ transform: tooltipStyle.transform === 'rotate(180deg)' ? 'rotate(180deg)' : 'none' }}>
          {tooltipText}
        </p>
      </div>
    </div>
  );
};

export default TutorialOverlay;
