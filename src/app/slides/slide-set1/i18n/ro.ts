import { TranslatedSlideSet } from '@shared/models/translation.model';

const md = String.raw;

const roSlideSetTranslations: TranslatedSlideSet = {
  title: '\\Prezentarea mea grozavă',
  slides: [
    {
      content: md`
# Prezentarea mea grozavă

<!--IconMenu-->

<!--IconSettings-->
      `,
    },
    {
      content: md`
## Niște conținut grozav aici...

Link: [Pisică de casă - Wikipedia](https://ro.wikipedia.org/wiki/Cat)'

> Citat

~~~html
<button>Text buton</button>
~~~
      `,
    },
  ],
};

export default roSlideSetTranslations;
