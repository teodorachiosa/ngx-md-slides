import { Translation } from "@shared/models/translation.model";

const md = String.raw;

const enSlideSetTranslations: Translation = {
  title: '\\My awesome presentation',
  content: [
    md`
# My awesome presentation

(made with <span aria-hidden="true">🩷</span><span class="sr-only">love</span>)

<!--IconMenu-->

<!--IconSettings-->
    `,
    md`
## Some awesome content goes here

Link: [Cat - Wikipedia](https://en.wikipedia.org/wiki/Cat)

> Quote

~~~html
<button>Button text</button>
~~~
    `,
  ],
};

export default enSlideSetTranslations;
