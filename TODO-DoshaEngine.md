# Dosha Engine Innovation — TODO

## Step 1: Update `src/index.css`
- Add new keyframe animations for card pulse, shimmer, fade-slide
- Add glassmorphism utility classes

## Step 2: Rewrite `src/pages/PatientDashboard/Assessment.jsx`
- Replace inline questions with full 25-question rich dataset from task
- Implement stepper wizard (6 sections: A-F)
- Add Framer Motion `AnimatePresence` transitions
- Design rich option cards with icons, descriptions, dosha theme colors
- Add progress bar, floating summary pill
- Add Next/Prev navigation with validation
- Add Review & Submit step
- Fix navigation state for `Result.jsx` compatibility

## Step 3: Verify & Test
- Run dev server, check responsiveness
- Test full flow from Assessment → Result

