# tts-generator

Disambiguates common bus stop abbreviations automatically.

`npm run tts_text`

`npm run tts_audio`

## Ownership

This citizen initiative is a volunteer-led project that helps to tackle accessibility in public transport.
The lead contributor is independent from Carris Metropolitana.
Our thanks to Carris Metropolitana for hosting this community initiative.

Bug reports and pull requests are welcome, development is open-source.

## Goals and non-goals

This project aims to disambiguate in text the common abbreviations for toponomy and points of interest in the Lisbon area (and indirectly, produce the spoken audio). Given a sensible string of text, it produces a new phonetic text that can be sounded out to pronounce the locations correctly for public announcements, specifically in mass transit vehicles.

Given the accessibility aim of the project, priority is given to clear common language descriptors whenever they are equivalent to a more complicated way of indicating the same point. Words are preferred to abbreviations even if these are orally common (for example, saying "Correios" instead of "CTT"), given the fact that they follow predictable phonotatics, are resilient to partial lapses in hearing and more accessible to certain types of auditory dyslexia and related cognitive disabilities.

This project does not develop fixes for the naming of particular locations as provided by the transit authority. Please refer instead to the project containing the public data (GTFS) to correct any naming deficiencies that an average person without local knowledge of the area would struggle or find dubious to interpret.
