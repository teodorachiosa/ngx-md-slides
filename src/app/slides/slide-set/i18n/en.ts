import { TranslatedSlideSet } from '@shared/models/translation.model';

const md = String.raw;

const enSlideSetTranslations: TranslatedSlideSet = {
  title: '\\My awesome presentation',
  slides: [
    {
      backgroundColor: '\\var(--teal)',
      content: md`
# My awesome presentation

(made with <span aria-hidden="true">🩷</span><span class="sr-only">love</span>)

<!--IconMenu-->

<!--IconSettings-->
      `,
    },
    {
      backgroundColor: '\\var(--violet)',
      content: md`
## Some awesome content goes here

Link: [Cat - Wikipedia](https://en.wikipedia.org/wiki/Cat)

> Quote

~~~html
<button>Button text</button>
~~~
      `,
    },
  ],
};

export default enSlideSetTranslations;
