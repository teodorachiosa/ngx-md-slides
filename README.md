# ng-slides (🚨 work in progress)

![A screenshot of the live version of ng-slides](https://v1.screenshot.11ty.dev/https%3A%2F%2Fteo-ng-slides.vercel.app/opengraphh)

[Live demo](https://teo-ng-slides.vercel.app/)

A way to make multi-lingual presentations locally, using Angular reusable components.

## Motivation

I hate working with PowerPoint and I hate copy-pasting content between similar presentations.

## Done:

- [x] Add Max width / Zoom option
- [x] Add fullscreen option (via "Present" button)
- [x] Add keyboard navigation
  - [x] `Ctrl` + `F5` for fullscreen
  - [x] `Left arrow` and `Page up`, in fullscreen mode, for slide navigation
  - [x] `Right arrow` and `Page down`, in fullscreen mode, for slide navigation
  - [x] `Home` for going to the first slide and `End` for going to the last slide, in fullscreen mode
- [x] Add markdown support
- [x] Add reusable components support (reuse groups of slides)
- [x] Add dark mode
- [x] Add slide number
- [x] Add routing (switch between slide sets)
- [x] Language switcher and i18n setup

## To do:

- [ ] Improve color contrast for non-text content (UI controls)
- [ ] Handle 404 (page not found)
- [ ] Implement responsive UI
- [ ] Update the max-width / zoom feature to use minus/plus buttons instead and a select comtrol for the zoom level (similar to FireFox's PDF viewer) 
- [ ] Move dark mode toggle to a side menu (along with other settings)
- [ ] Add total number of pages and a "jump to page" feature
- [ ] Save settings to cookies
- [ ] Perform accessibility checks (WCAG 2.2 minimum) and add an accessibility statement
- [ ] Save presentation as PDF (?)


## How to run

- fork/clone/download this project to use as a template
- run `npm install` in the "ng-slides" folder
- run `npm run start` for local development
- edit the example slide set
- (optional) create a GitHub Pages workflow to host the slides online
