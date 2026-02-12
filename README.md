# ngx-md-slides

[Live demo](https://ngx-md-slides.vercel.app/)

A way to make multi-lingual presentations, using markdown and Angular components.

## Motivation

I hate working with PowerPoint and I hate copy-pasting content between similar presentations. 

Using this approach, you can create groups of slides that can be reused in multiple presentations.

## Implemented:

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
- [x] Make menu (slide sets links) sticky (top) 
- [x] Implement responsive UI (Update translations, Update a11y)
- [x] Move dark mode toggle to a side menu (along with other settings)
- [x] Update the max-width / zoom feature to use minus/plus buttons instead and a select control for the zoom level (similar to FireFox's PDF viewer) 

## To do:

- [ ] Use TypeScript (and separate Markdown files?) for translations instead of JSON.
- [ ] Fix Vercel 404 error
- [ ] Add total number of pages and a "jump to page" feature
- [ ] Save settings to cookies
- [ ] Perform accessibility checks (WCAG 2.2 minimum) and add an accessibility statement
- [ ] Save presentation as PDF
- [ ] Implement non-hardcoded languages (and use a `select` element)

## Folder structure
```
app
|__ layout
|__ shared
|__ slides <-- slide set components go here
|__ templates <-- reusable slide templates/components go here
```

## How to run

- fork or use this template in a new repo
- run `npm install` in the "ngx-md-slides" folder
- run `npm run start` for local development
- edit the example slide set
- (optional) create a GitHub Pages workflow to host the slides online
