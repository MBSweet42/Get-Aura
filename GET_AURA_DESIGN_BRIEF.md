# Get Aura: Design Brief

Reference this file at the start of any Claude Code session that touches visuals, UI, or new features. Paste relevant sections into your prompt when asking for changes.

## Core Vibe

Three words: cozy, magical, alive. The feeling should sit somewhere between a Studio Ghibli forest scene, the coziness of Stardew Valley, and the daily pull of a tamagotchi. Every screen should feel like a place, not a form.

## Art Style References

Give Claude Code these exact reference points instead of "magical":
- Hobbit houses: round doors, mossy roofs, warm glowing windows, references like Hobbiton or Ghibli's Howl's Moving Castle village scenes
- Waterfalls and nature: soft painterly backgrounds, not flat vector clipart. Think illustrated storybook, not clip art library
- Character or avatar style: soft rounded shapes, big expressive eyes, no sharp corners anywhere in the UI
- Closest existing apps for tone: Finch (self care pet app), Alba, Animal Crossing menus, Stardew Valley farmhouse UI

## Color Palette

Specify one actual palette and lock it in, so every session uses the same colors instead of drifting:
- Warm base tones (moss green, honey gold, dusty lavender, terracotta)
- Avoid pure white backgrounds and default Bootstrap or Tailwind blue/gray. Those read as "app," not "world"
- Soft gradients for sky and water, not flat fills

## Typography

Pick one rounded, friendly display font for headers (something like Baloo, Fredoka, or Quicksand) and one clean readable body font. Avoid default system fonts, they are what make things look unfinished.

## World and Navigation

- The map is the home screen, not a menu list. Locations (hobbit house, waterfall, garden, town square) are places you walk or fly to, not buttons in a row
- Movement between areas should have a small transition animation, even a simple fade or float, so it feels like traveling somewhere
- Each location represents a category of self care (rest, movement, gratitude, connection, creativity)

## Check ins, Not Quests

Reframe "quests" as small rituals tied to a place:
- Visit the waterfall to log a mood
- Water a plant in the garden for a gratitude entry
- Sit by the fire in the hobbit house for a breathing exercise
Each check in should give small, immediate visual and sound feedback (a sparkle, a chime, the character's aura glowing brighter) so it feels rewarding the way a tamagotchi's happy animation does.

## Companion or Aura Character

If there's a companion creature or orb, its appearance should visibly respond to check in streaks and mood entries over time. This is the core retention hook, the same reason tamagotchi worked. It should never look neglected or scolding, only gently encouraging.

## Community Features

- Friends list styled like a garden of small houses or auras, not a contact list
- Affirmations sent as small illustrated cards or glowing notes, not plain text bubbles
- Goal celebrations should trigger a shared animation (confetti of light, fireflies) visible to friends, not just a notification badge

## Sound and Micro Interactions

- Soft ambient background sound per location (birdsong at the garden, water at the falls)
- Gentle chime or sparkle on every completed action
- No harsh system sounds or default click noises

## What to Avoid

- Dashboard style layouts with cards in a grid
- Progress bars that look clinical (thin flat lines, percentage numbers)
- Default form inputs and buttons with sharp corners
- Any screen that could pass for a to do list app

## Mini Games: Framing and Research Notes

Get Aura includes Tetris, a bubble pop game for intrusive thoughts, and a matching game. Frame all three as grounding and regulation tools for anxiety in the moment. Do not market them as trauma treatment or trauma processing tools, that language implies clinical treatment and goes beyond what the research supports.

What the research actually shows, for accuracy in any copy or feature description:
- Tetris studies had people play within 6 to 72 hours of a specific traumatic event, paired with briefly recalling the event first, for about 20 minutes, one time. This reduced how often intrusive memories showed up in the following week. It applies to fresh events still being processed by the brain, not older trauma or general anxiety
- Bubble pop and matching games do not have that same clinical research behind them. They are common grounding and distraction tools that can genuinely help someone regulate in the moment, without being trauma treatment
- Session length across the research is 10 to 20 minutes. Longer sessions risk becoming avoidance rather than a quick reset

Suggested in app framing:
- Tetris: described as a grounding or focus game, useful right after something upsetting happens
- Bubble pop and matching game: described as calming, present moment tools for anxiety

## Wellness Disclaimer

Draft language for onboarding and eventual terms of service. Use the short version below for a first launch popup, and the full version for the user agreement once that's built out.

Short version (onboarding popup):
"Get Aura is a self care tool, not therapy."

Full version:
"Get Aura offers tools for everyday stress and anxiety support, including check ins, mini games, and community features. These tools are designed for general wellness and self care. They are not medical treatment, therapy, or a replacement for professional mental health care.

The mini games included in Get Aura are inspired by research on grounding and calming techniques for anxiety in the moment. They are not a clinical treatment for trauma, PTSD, or any diagnosed condition.

If you are in crisis, experiencing thoughts of harming yourself, or dealing with a mental health emergency, please contact a licensed professional or crisis service in your area rather than relying on this app.

By using Get Aura, you understand that the app is a self care companion, not a substitute for therapy, counseling, or medical advice."

## How to Prompt Claude Code Going Forward

- Reference this file by name at the start of a session: "Follow GET_AURA_DESIGN_BRIEF.md for all visual decisions"
- Give one screen or feature at a time rather than "make it all more magical"
- Name a real reference when possible: "Style this like the Stardew Valley farmhouse menu" works better than "make it cozy"
- When something looks off, describe specifically what reads wrong (too sharp, too flat, too much white space) rather than just "I don't like it"
