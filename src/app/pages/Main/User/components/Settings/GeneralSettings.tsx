import React from 'react'
import { ListGroup } from 'react-bootstrap'
const languages=[
    {
      "code": "af",
      "name": "Afrikaans"
    },
    {
      "code": "af-ZA",
      "name": "Afrikaans (South Africa)"
    },
    {
      "code": "ar",
      "name": "Arabic"
    },
    {
      "code": "ar-AE",
      "name": "Arabic (U.A.E.)"
    },
    {
      "code": "ar-BH",
      "name": "Arabic (Bahrain)"
    },
    {
      "code": "ar-DZ",
      "name": "Arabic (Algeria)"
    },
    {
      "code": "ar-EG",
      "name": "Arabic (Egypt)"
    },
    {
      "code": "ar-IQ",
      "name": "Arabic (Iraq)"
    },
    {
      "code": "ar-JO",
      "name": "Arabic (Jordan)"
    },
    {
      "code": "ar-KW",
      "name": "Arabic (Kuwait)"
    },
    {
      "code": "ar-LB",
      "name": "Arabic (Lebanon)"
    },
    {
      "code": "ar-LY",
      "name": "Arabic (Libya)"
    },
    {
      "code": "ar-MA",
      "name": "Arabic (Morocco)"
    },
    {
      "code": "ar-OM",
      "name": "Arabic (Oman)"
    },
    {
      "code": "ar-QA",
      "name": "Arabic (Qatar)"
    },
    {
      "code": "ar-SA",
      "name": "Arabic (Saudi Arabia)"
    },
    {
      "code": "ar-SY",
      "name": "Arabic (Syria)"
    },
    {
      "code": "ar-TN",
      "name": "Arabic (Tunisia)"
    },
    {
      "code": "ar-YE",
      "name": "Arabic (Yemen)"
    },
    {
      "code": "az",
      "name": "Azeri (Latin)"
    },
    {
      "code": "az-AZ",
      "name": "Azeri (Latin) (Azerbaijan)"
    },
    {
      "code": "az-AZ",
      "name": "Azeri (Cyrillic) (Azerbaijan)"
    },
    {
      "code": "be",
      "name": "Belarusian"
    },
    {
      "code": "be-BY",
      "name": "Belarusian (Belarus)"
    },
    {
      "code": "bg",
      "name": "Bulgarian"
    },
    {
      "code": "bg-BG",
      "name": "Bulgarian (Bulgaria)"
    },
    {
      "code": "bs-BA",
      "name": "Bosnian (Bosnia and Herzegovina)"
    },
    {
      "code": "ca",
      "name": "Catalan"
    },
    {
      "code": "ca-ES",
      "name": "Catalan (Spain)"
    },
    {
      "code": "cs",
      "name": "Czech"
    },
    {
      "code": "cs-CZ",
      "name": "Czech (Czech Republic)"
    },
    {
      "code": "cy",
      "name": "Welsh"
    },
    {
      "code": "cy-GB",
      "name": "Welsh (United Kingdom)"
    },
    {
      "code": "da",
      "name": "Danish"
    },
    {
      "code": "da-DK",
      "name": "Danish (Denmark)"
    },
    {
      "code": "de",
      "name": "German"
    },
    {
      "code": "de-AT",
      "name": "German (Austria)"
    },
    {
      "code": "de-CH",
      "name": "German (Switzerland)"
    },
    {
      "code": "de-DE",
      "name": "German (Germany)"
    },
    {
      "code": "de-LI",
      "name": "German (Liechtenstein)"
    },
    {
      "code": "de-LU",
      "name": "German (Luxembourg)"
    },
    {
      "code": "dv",
      "name": "Divehi"
    },
    {
      "code": "dv-MV",
      "name": "Divehi (Maldives)"
    },
    {
      "code": "el",
      "name": "Greek"
    },
    {
      "code": "el-GR",
      "name": "Greek (Greece)"
    },
    {
      "code": "en",
      "name": "English"
    },
    {
      "code": "en-AU",
      "name": "English (Australia)"
    },
    {
      "code": "en-BZ",
      "name": "English (Belize)"
    },
    {
      "code": "en-CA",
      "name": "English (Canada)"
    },
    {
      "code": "en-CB",
      "name": "English (Caribbean)"
    },
    {
      "code": "en-GB",
      "name": "English (United Kingdom)"
    },
    {
      "code": "en-IE",
      "name": "English (Ireland)"
    },
    {
      "code": "en-JM",
      "name": "English (Jamaica)"
    },
    {
      "code": "en-NZ",
      "name": "English (New Zealand)"
    },
    {
      "code": "en-PH",
      "name": "English (Republic of the Philippines)"
    },
    {
      "code": "en-TT",
      "name": "English (Trinidad and Tobago)"
    },
    {
      "code": "en-US",
      "name": "English (United States)"
    },
    {
      "code": "en-ZA",
      "name": "English (South Africa)"
    },
    {
      "code": "en-ZW",
      "name": "English (Zimbabwe)"
    },
    {
      "code": "eo",
      "name": "Esperanto"
    },
    {
      "code": "es",
      "name": "Spanish"
    },
    {
      "code": "es-AR",
      "name": "Spanish (Argentina)"
    },
    {
      "code": "es-BO",
      "name": "Spanish (Bolivia)"
    },
    {
      "code": "es-CL",
      "name": "Spanish (Chile)"
    },
    {
      "code": "es-CO",
      "name": "Spanish (Colombia)"
    },
    {
      "code": "es-CR",
      "name": "Spanish (Costa Rica)"
    },
    {
      "code": "es-DO",
      "name": "Spanish (Dominican Republic)"
    },
    {
      "code": "es-EC",
      "name": "Spanish (Ecuador)"
    },
    {
      "code": "es-ES",
      "name": "Spanish (Castilian)"
    },
    {
      "code": "es-ES",
      "name": "Spanish (Spain)"
    },
    {
      "code": "es-GT",
      "name": "Spanish (Guatemala)"
    },
    {
      "code": "es-HN",
      "name": "Spanish (Honduras)"
    },
    {
      "code": "es-MX",
      "name": "Spanish (Mexico)"
    },
    {
      "code": "es-NI",
      "name": "Spanish (Nicaragua)"
    },
    {
      "code": "es-PA",
      "name": "Spanish (Panama)"
    },
    {
      "code": "es-PE",
      "name": "Spanish (Peru)"
    },
    {
      "code": "es-PR",
      "name": "Spanish (Puerto Rico)"
    },
    {
      "code": "es-PY",
      "name": "Spanish (Paraguay)"
    },
    {
      "code": "es-SV",
      "name": "Spanish (El Salvador)"
    },
    {
      "code": "es-UY",
      "name": "Spanish (Uruguay)"
    },
    {
      "code": "es-VE",
      "name": "Spanish (Venezuela)"
    },
    {
      "code": "et",
      "name": "Estonian"
    },
    {
      "code": "et-EE",
      "name": "Estonian (Estonia)"
    },
    {
      "code": "eu",
      "name": "Basque"
    },
    {
      "code": "eu-ES",
      "name": "Basque (Spain)"
    },
    {
      "code": "fa",
      "name": "Farsi"
    },
    {
      "code": "fa-IR",
      "name": "Farsi (Iran)"
    },
    {
      "code": "fi",
      "name": "Finnish"
    },
    {
      "code": "fi-FI",
      "name": "Finnish (Finland)"
    },
    {
      "code": "fo",
      "name": "Faroese"
    },
    {
      "code": "fo-FO",
      "name": "Faroese (Faroe Islands)"
    },
    {
      "code": "fr",
      "name": "French"
    },
    {
      "code": "fr-BE",
      "name": "French (Belgium)"
    },
    {
      "code": "fr-CA",
      "name": "French (Canada)"
    },
    {
      "code": "fr-CH",
      "name": "French (Switzerland)"
    },
    {
      "code": "fr-FR",
      "name": "French (France)"
    },
    {
      "code": "fr-LU",
      "name": "French (Luxembourg)"
    },
    {
      "code": "fr-MC",
      "name": "French (Principality of Monaco)"
    },
    {
      "code": "gl",
      "name": "Galician"
    },
    {
      "code": "gl-ES",
      "name": "Galician (Spain)"
    },
    {
      "code": "gu",
      "name": "Gujarati"
    },
    {
      "code": "gu-IN",
      "name": "Gujarati (India)"
    },
    {
      "code": "he",
      "name": "Hebrew"
    },
    {
      "code": "he-IL",
      "name": "Hebrew (Israel)"
    },
    {
      "code": "hi",
      "name": "Hindi"
    },
    {
      "code": "hi-IN",
      "name": "Hindi (India)"
    },
    {
      "code": "hr",
      "name": "Croatian"
    },
    {
      "code": "hr-BA",
      "name": "Croatian (Bosnia and Herzegovina)"
    },
    {
      "code": "hr-HR",
      "name": "Croatian (Croatia)"
    },
    {
      "code": "hu",
      "name": "Hungarian"
    },
    {
      "code": "hu-HU",
      "name": "Hungarian (Hungary)"
    },
    {
      "code": "hy",
      "name": "Armenian"
    },
    {
      "code": "hy-AM",
      "name": "Armenian (Armenia)"
    },
    {
      "code": "id",
      "name": "Indonesian"
    },
    {
      "code": "id-ID",
      "name": "Indonesian (Indonesia)"
    },
    {
      "code": "is",
      "name": "Icelandic"
    },
    {
      "code": "is-IS",
      "name": "Icelandic (Iceland)"
    },
    {
      "code": "it",
      "name": "Italian"
    },
    {
      "code": "it-CH",
      "name": "Italian (Switzerland)"
    },
    {
      "code": "it-IT",
      "name": "Italian (Italy)"
    },
    {
      "code": "ja",
      "name": "Japanese"
    },
    {
      "code": "ja-JP",
      "name": "Japanese (Japan)"
    },
    {
      "code": "ka",
      "name": "Georgian"
    },
    {
      "code": "ka-GE",
      "name": "Georgian (Georgia)"
    },
    {
      "code": "kk",
      "name": "Kazakh"
    },
    {
      "code": "kk-KZ",
      "name": "Kazakh (Kazakhstan)"
    },
    {
      "code": "kn",
      "name": "Kannada"
    },
    {
      "code": "kn-IN",
      "name": "Kannada (India)"
    },
    {
      "code": "ko",
      "name": "Korean"
    },
    {
      "code": "ko-KR",
      "name": "Korean (Korea)"
    },
    {
      "code": "kok",
      "name": "Konkani"
    },
    {
      "code": "kok-IN",
      "name": "Konkani (India)"
    },
    {
      "code": "ky",
      "name": "Kyrgyz"
    },
    {
      "code": "ky-KG",
      "name": "Kyrgyz (Kyrgyzstan)"
    },
    {
      "code": "lt",
      "name": "Lithuanian"
    },
    {
      "code": "lt-LT",
      "name": "Lithuanian (Lithuania)"
    },
    {
      "code": "lv",
      "name": "Latvian"
    },
    {
      "code": "lv-LV",
      "name": "Latvian (Latvia)"
    },
    {
      "code": "mi",
      "name": "Maori"
    },
    {
      "code": "mi-NZ",
      "name": "Maori (New Zealand)"
    },
    {
      "code": "mk",
      "name": "FYRO Macedonian"
    },
    {
      "code": "mk-MK",
      "name": "FYRO Macedonian (Former Yugoslav Republic of Macedonia)"
    },
    {
      "code": "mn",
      "name": "Mongolian"
    },
    {
      "code": "mn-MN",
      "name": "Mongolian (Mongolia)"
    },
    {
      "code": "mr",
      "name": "Marathi"
    },
    {
      "code": "mr-IN",
      "name": "Marathi (India)"
    },
    {
      "code": "ms",
      "name": "Malay"
    },
    {
      "code": "ms-BN",
      "name": "Malay (Brunei Darussalam)"
    },
    {
      "code": "ms-MY",
      "name": "Malay (Malaysia)"
    },
    {
      "code": "mt",
      "name": "Maltese"
    },
    {
      "code": "mt-MT",
      "name": "Maltese (Malta)"
    },
    {
      "code": "nb",
      "name": "Norwegian (Bokm?l)"
    },
    {
      "code": "nb-NO",
      "name": "Norwegian (Bokm?l) (Norway)"
    },
    {
      "code": "nl",
      "name": "Dutch"
    },
    {
      "code": "nl-BE",
      "name": "Dutch (Belgium)"
    },
    {
      "code": "nl-NL",
      "name": "Dutch (Netherlands)"
    },
    {
      "code": "nn-NO",
      "name": "Norwegian (Nynorsk) (Norway)"
    },
    {
      "code": "ns",
      "name": "Northern Sotho"
    },
    {
      "code": "ns-ZA",
      "name": "Northern Sotho (South Africa)"
    },
    {
      "code": "pa",
      "name": "Punjabi"
    },
    {
      "code": "pa-IN",
      "name": "Punjabi (India)"
    },
    {
      "code": "pl",
      "name": "Polish"
    },
    {
      "code": "pl-PL",
      "name": "Polish (Poland)"
    },
    {
      "code": "ps",
      "name": "Pashto"
    },
    {
      "code": "ps-AR",
      "name": "Pashto (Afghanistan)"
    },
    {
      "code": "pt",
      "name": "Portuguese"
    },
    {
      "code": "pt-BR",
      "name": "Portuguese (Brazil)"
    },
    {
      "code": "pt-PT",
      "name": "Portuguese (Portugal)"
    },
    {
      "code": "qu",
      "name": "Quechua"
    },
    {
      "code": "qu-BO",
      "name": "Quechua (Bolivia)"
    },
    {
      "code": "qu-EC",
      "name": "Quechua (Ecuador)"
    },
    {
      "code": "qu-PE",
      "name": "Quechua (Peru)"
    },
    {
      "code": "ro",
      "name": "Romanian"
    },
    {
      "code": "ro-RO",
      "name": "Romanian (Romania)"
    },
    {
      "code": "ru",
      "name": "Russian"
    },
    {
      "code": "ru-RU",
      "name": "Russian (Russia)"
    },
    {
      "code": "sa",
      "name": "Sanskrit"
    },
    {
      "code": "sa-IN",
      "name": "Sanskrit (India)"
    },
    {
      "code": "se",
      "name": "Sami (Northern)"
    },
    {
      "code": "se-FI",
      "name": "Sami (Northern) (Finland)"
    },
    {
      "code": "se-FI",
      "name": "Sami (Skolt) (Finland)"
    },
    {
      "code": "se-FI",
      "name": "Sami (Inari) (Finland)"
    },
    {
      "code": "se-NO",
      "name": "Sami (Northern) (Norway)"
    },
    {
      "code": "se-NO",
      "name": "Sami (Lule) (Norway)"
    },
    {
      "code": "se-NO",
      "name": "Sami (Southern) (Norway)"
    },
    {
      "code": "se-SE",
      "name": "Sami (Northern) (Sweden)"
    },
    {
      "code": "se-SE",
      "name": "Sami (Lule) (Sweden)"
    },
    {
      "code": "se-SE",
      "name": "Sami (Southern) (Sweden)"
    },
    {
      "code": "sk",
      "name": "Slovak"
    },
    {
      "code": "sk-SK",
      "name": "Slovak (Slovakia)"
    },
    {
      "code": "sl",
      "name": "Slovenian"
    },
    {
      "code": "sl-SI",
      "name": "Slovenian (Slovenia)"
    },
    {
      "code": "sq",
      "name": "Albanian"
    },
    {
      "code": "sq-AL",
      "name": "Albanian (Albania)"
    },
    {
      "code": "sr-BA",
      "name": "Serbian (Latin) (Bosnia and Herzegovina)"
    },
    {
      "code": "sr-BA",
      "name": "Serbian (Cyrillic) (Bosnia and Herzegovina)"
    },
    {
      "code": "sr-SP",
      "name": "Serbian (Latin) (Serbia and Montenegro)"
    },
    {
      "code": "sr-SP",
      "name": "Serbian (Cyrillic) (Serbia and Montenegro)"
    },
    {
      "code": "sv",
      "name": "Swedish"
    },
    {
      "code": "sv-FI",
      "name": "Swedish (Finland)"
    },
    {
      "code": "sv-SE",
      "name": "Swedish (Sweden)"
    },
    {
      "code": "sw",
      "name": "Swahili"
    },
    {
      "code": "sw-KE",
      "name": "Swahili (Kenya)"
    },
    {
      "code": "syr",
      "name": "Syriac"
    },
    {
      "code": "syr-SY",
      "name": "Syriac (Syria)"
    },
    {
      "code": "ta",
      "name": "Tamil"
    },
    {
      "code": "ta-IN",
      "name": "Tamil (India)"
    },
    {
      "code": "te",
      "name": "Telugu"
    },
    {
      "code": "te-IN",
      "name": "Telugu (India)"
    },
    {
      "code": "th",
      "name": "Thai"
    },
    {
      "code": "th-TH",
      "name": "Thai (Thailand)"
    },
    {
      "code": "tl",
      "name": "Tagalog"
    },
    {
      "code": "tl-PH",
      "name": "Tagalog (Philippines)"
    },
    {
      "code": "tn",
      "name": "Tswana"
    },
    {
      "code": "tn-ZA",
      "name": "Tswana (South Africa)"
    },
    {
      "code": "tr",
      "name": "Turkish"
    },
    {
      "code": "tr-TR",
      "name": "Turkish (Turkey)"
    },
    {
      "code": "tt",
      "name": "Tatar"
    },
    {
      "code": "tt-RU",
      "name": "Tatar (Russia)"
    },
    {
      "code": "ts",
      "name": "Tsonga"
    },
    {
      "code": "uk",
      "name": "Ukrainian"
    },
    {
      "code": "uk-UA",
      "name": "Ukrainian (Ukraine)"
    },
    {
      "code": "ur",
      "name": "Urdu"
    },
    {
      "code": "ur-PK",
      "name": "Urdu (Islamic Republic of Pakistan)"
    },
    {
      "code": "uz",
      "name": "Uzbek (Latin)"
    },
    {
      "code": "uz-UZ",
      "name": "Uzbek (Latin) (Uzbekistan)"
    },
    {
      "code": "uz-UZ",
      "name": "Uzbek (Cyrillic) (Uzbekistan)"
    },
    {
      "code": "vi",
      "name": "Vietnamese"
    },
    {
      "code": "vi-VN",
      "name": "Vietnamese (Viet Nam)"
    },
    {
      "code": "xh",
      "name": "Xhosa"
    },
    {
      "code": "xh-ZA",
      "name": "Xhosa (South Africa)"
    },
    {
      "code": "zh",
      "name": "Chinese"
    },
    {
      "code": "zh-CN",
      "name": "Chinese (S)"
    },
    {
      "code": "zh-HK",
      "name": "Chinese (Hong Kong)"
    },
    {
      "code": "zh-MO",
      "name": "Chinese (Macau)"
    },
    {
      "code": "zh-SG",
      "name": "Chinese (Singapore)"
    },
    {
      "code": "zh-TW",
      "name": "Chinese (T)"
    },
    {
      "code": "zu",
      "name": "Zulu"
    },
    {
      "code": "zu-ZA",
      "name": "Zulu (South Africa)"
    }
  ]
export const GeneralSettings = () => {
    return (
        <>
        <h4>Geral</h4>
        <h6>Idioma</h6>
        <select className='form-control'>
            {languages.map(({code,name})=><option value={code}>{name}</option>)}
        </select>
        <hr/>
        <h6>Temas</h6>
<p>Escolha a aparência do aplicativo.</p>
        <ListGroup style={{listStyleType: "none"}} horizontal><li className="mr1 mb1"><button className="button w100 button-outline-norm theme-card-button is-active no-pointer-events text-bold" aria-busy="false" type="button" name="themeCard" id="id_0" aria-pressed="true" aria-label="Usar o tema Proton" title="Usar o tema Proton"><span className="flex flex-nowrap flex-column flex-align-items-center">
                <img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjIiIGhlaWdodD0iNzgiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxMjIgNzgiPgogICAgPGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj4KICAgICAgICA8cGF0aCBmaWxsPSJ1cmwoI2IpIiBkPSJNMCAwaDEyMnY3OEgwVjBaIiAvPgogICAgICAgIDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSI1IiB4PSI1IiB5PSI4IiBmaWxsPSIjOTM2REZGIiByeD0iMS41IiAvPgogICAgICAgIDxwYXRoIGZpbGw9InVybCgjYykiIGQ9Ik0zNCAxMGEyIDIgMCAwIDEgMi0yaDg2djcwSDM0VjEwWiIgLz4KICAgICAgICA8ZyBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuNCI+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIyOSIgcng9IjEiIC8+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIyMyIgcng9IjEiIC8+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIxNyIgcng9IjEiIC8+CiAgICAgICAgPC9nPgogICAgPC9nPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMTQuNSIgeDI9IjEwNi41IiB5MT0iMCIgeTI9IjEwNS41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM0QzM5OUQiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzM0Mjk2OSIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYyIgeDE9IjEyMiIgeDI9IjY1LjYzMiIgeTE9Ijc4IiB5Mj0iMzYuMjU0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGQ0Y3RkYiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxjbGlwUGF0aCBpZD0iYSI+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoMTIydjc4SDB6IiAvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICA8L2RlZnM+Cjwvc3ZnPgo=" className="mb0-5 theme-card-image rounded-sm on-rtl-mirror"/><div className="py0-25">Proton</div></span></button></li><li className="mr1 mb1"><button className="button w100 button-outline-weak theme-card-button" aria-busy="false" type="button" name="themeCard" id="id_6" aria-pressed="false" aria-label="Usar o tema classNameic" title="Usar o tema classNameic"><span className="flex flex-nowrap flex-column flex-align-items-center">
                    <img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjIiIGhlaWdodD0iNzgiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxMjIgNzgiPgogICAgPGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj4KICAgICAgICA8cGF0aCBmaWxsPSJ1cmwoI2IpIiBkPSJNMCAwaDEyMnY3OEgwVjBaIiAvPgogICAgICAgIDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSI1IiB4PSI1IiB5PSI4IiBmaWxsPSIjNjU3RUU0IiByeD0iMS41IiAvPgogICAgICAgIDxwYXRoIGZpbGw9InVybCgjYykiIGQ9Ik0zNCAxMGEyIDIgMCAwIDEgMi0yaDg2djcwSDM0VjEwWiIgLz4KICAgICAgICA8ZyBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuNCI+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIyOSIgcng9IjEiIC8+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIyMyIgcng9IjEiIC8+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIxNyIgcng9IjEiIC8+CiAgICAgICAgPC9nPgogICAgPC9nPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMTQuNSIgeDI9IjEwNi41IiB5MT0iMCIgeTI9IjEwNS41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyRTM5NkIiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFDMjIzRCIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYyIgeDE9IjEyMiIgeDI9IjY1LjYzMiIgeTE9Ijc4IiB5Mj0iMzYuMjU0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGM0Y1RkYiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxjbGlwUGF0aCBpZD0iYSI+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoMTIydjc4SDB6IiAvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICA8L2RlZnM+Cjwvc3ZnPgo=" className="mb0-5 theme-card-image rounded-sm on-rtl-mirror"/><div className="py0-25">classNameic</div></span></button></li><li className="mr1 mb1"><button className="button w100 button-outline-weak theme-card-button" aria-busy="false" type="button" name="themeCard" id="id_1" aria-pressed="false" aria-label="Usar o tema Carbon" title="Usar o tema Carbon"><span className="flex flex-nowrap flex-column flex-align-items-center"><img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjIiIGhlaWdodD0iNzgiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxMjIgNzgiPgogICAgPHBhdGggZmlsbD0iIzE2MTQxQyIgZD0iTTAgMGgxMjJ2NzhIMFYwWiIgLz4KICAgIDxwYXRoIGZpbGw9IiMyQTI4MzMiIGQ9Ik0zNCAxMGEyIDIgMCAwIDEgMi0yaDg2djcwSDM0VjEwWiIgLz4KICAgIDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSI1IiB4PSI1IiB5PSI4IiBmaWxsPSIjNkQ0QUZGIiByeD0iMS41IiAvPgogICAgPGcgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjMiPgogICAgICAgIDxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIyOSIgcng9IjEiIC8+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjIiIHg9IjUiIHk9IjIzIiByeD0iMSIgLz4KICAgICAgICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMiIgeD0iNSIgeT0iMTciIHJ4PSIxIiAvPgogICAgPC9nPgogICAgPHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTAgMGgxMjJ2NzhIMHoiIC8+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI0My41IiB4Mj0iMTI0Ljk2NCIgeTE9IjMiIHkyPSI1My4yNjUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0VFQkVGRiIgc3RvcC1vcGFjaXR5PSIuMiIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNkQ0QUZGIiBzdG9wLW9wYWNpdHk9Ii4xIiAvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+Cjwvc3ZnPgo=" className="mb0-5 theme-card-image rounded-sm on-rtl-mirror"/><div className="py0-25">Carbon</div></span></button></li><li className="mr1 mb1"><button className="button w100 button-outline-weak theme-card-button" aria-busy="false" type="button" name="themeCard" id="id_3" aria-pressed="false" aria-label="Usar o tema Monokai" title="Usar o tema Monokai"><span className="flex flex-nowrap flex-column flex-align-items-center">
                        <img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjIiIGhlaWdodD0iNzgiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxMjIgNzgiPgogICAgPHBhdGggZmlsbD0iIzEzMTUxQSIgZD0iTTAgMGgxMjJ2NzhIMFYwWiIgLz4KICAgIDxwYXRoIGZpbGw9IiMyNjJBMzMiIGQ9Ik0zNCAxMGEyIDIgMCAwIDEgMi0yaDg2djcwSDM0VjEwWiIgLz4KICAgIDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSI1IiB4PSI1IiB5PSI4IiBmaWxsPSIjRTY0NjYzIiByeD0iMS41IiAvPgogICAgPGcgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjMiPgogICAgICAgIDxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIyOSIgcng9IjEiIC8+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjIiIHg9IjUiIHk9IjIzIiByeD0iMSIgLz4KICAgICAgICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMiIgeD0iNSIgeT0iMTciIHJ4PSIxIiAvPgogICAgPC9nPgogICAgPHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTAgMGgxMjJ2NzhIMHoiIC8+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI0My41IiB4Mj0iMTI0Ljk2NCIgeTE9IjMiIHkyPSI1My4yNjUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0VFQkVGRiIgc3RvcC1vcGFjaXR5PSIuMiIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNkQ0QUZGIiBzdG9wLW9wYWNpdHk9Ii4xIiAvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+Cjwvc3ZnPgo=" className="mb0-5 theme-card-image rounded-sm on-rtl-mirror"/><div className="py0-25">Monokai</div></span></button></li><li className="mr1 mb1"><button className="button w100 button-outline-weak theme-card-button" aria-busy="false" type="button" name="themeCard" id="id_2" aria-pressed="false" aria-label="Usar o tema Snow" title="Usar o tema Snow"><span className="flex flex-nowrap flex-column flex-align-items-center"><img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjIiIGhlaWdodD0iNzgiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxMjIgNzgiPgogICAgPGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj4KICAgICAgICA8cGF0aCBmaWxsPSIjRkFGOUY3IiBkPSJNMCAwaDEyMnY3OEgwVjBaIiAvPgogICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zNCAxMGEyIDIgMCAwIDEgMi0yaDg2djcwSDM0VjEwWiIgLz4KICAgICAgICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMiIgeD0iNSIgeT0iMjkiIGZpbGw9IiNBRUFCQTciIHJ4PSIxIiAvPgogICAgICAgIDxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIyMyIgZmlsbD0iI0FFQUJBNyIgcng9IjEiIC8+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIiIHg9IjUiIHk9IjE3IiBmaWxsPSIjQUVBQkE3IiByeD0iMSIgLz4KICAgICAgICA8cGF0aCBmaWxsPSJ1cmwoI2IpIiBkPSJNMCAwaDEyMnY3OEgwVjBaIiAvPgogICAgICAgIDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSI1IiB4PSI1IiB5PSI4IiBmaWxsPSIjNkQ0QUZGIiByeD0iMS41IiAvPgogICAgPC9nPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iNjAuODAzIiB4Mj0iOTMuOTUxIiB5MT0iLTguNTc4IiB5Mj0iODkuMTA5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjIiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YyRUZFOSIgc3RvcC1vcGFjaXR5PSIuMyIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxjbGlwUGF0aCBpZD0iYSI+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoMTIydjc4SDB6IiAvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICA8L2RlZnM+Cjwvc3ZnPgo=" className="mb0-5 theme-card-image rounded-sm on-rtl-mirror"/><div className="py0-25">Snow</div></span></button></li><li className="mr1 mb1"><button className="button w100 button-outline-weak theme-card-button" aria-busy="false" type="button" name="themeCard" id="id_4" aria-pressed="false" aria-label="Usar o tema Contrast" title="Usar o tema Contrast"><span className="flex flex-nowrap flex-column flex-align-items-center"><img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjIiIGhlaWdodD0iNzgiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxMjIgNzgiPgogICAgPGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj4KICAgICAgICA8cGF0aCBmaWxsPSJ1cmwoI2IpIiBkPSJNMCAwaDEyMnY3OEgwVjBaIiAvPgogICAgICAgIDxwYXRoIGZpbGw9InVybCgjYykiIGQ9Ik0zNCAxMGEyIDIgMCAwIDEgMi0yaDg2djcwSDM0VjEwWiIgLz4KICAgICAgICA8cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iNSIgeD0iNSIgeT0iOCIgZmlsbD0iIzQ2MzBBNiIgcng9IjEuNSIgLz4KICAgICAgICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMiIgeD0iNSIgeT0iMjkiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjgiIHJ4PSIxIiAvPgogICAgICAgIDxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIyMyIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuOCIgcng9IjEiIC8+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIiIHg9IjUiIHk9IjE3IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii44IiByeD0iMSIgLz4KICAgIDwvZz4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjQ3LjUiIHgyPSI4LjUiIHkxPSI4MSIgeTI9IjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0Y4RjhGOCIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjVGNUY1IiAvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJjIiB4MT0iNTIuNSIgeDI9Ijc4IiB5MT0iOCIgeTI9Ijc4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0Y1RjVGNSIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxjbGlwUGF0aCBpZD0iYSI+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoMTIydjc4SDB6IiAvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICA8L2RlZnM+Cjwvc3ZnPgo=" className="mb0-5 theme-card-image rounded-sm on-rtl-mirror"/><div className="py0-25">Contrast</div></span></button></li><li className="mr1 mb1"><button className="button w100 button-outline-weak theme-card-button" aria-busy="false" type="button" name="themeCard" id="id_5" aria-pressed="false" aria-label="Usar o tema Legacy" title="Usar o tema Legacy"><span className="flex flex-nowrap flex-column flex-align-items-center"><img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjIiIGhlaWdodD0iNzgiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxMjIgNzgiPgogICAgPHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTAgMGgxMjJ2NzhIMFYwWiIgLz4KICAgIDxwYXRoIGZpbGw9InVybCgjYikiIGQ9Ik0zNCAxMGEyIDIgMCAwIDEgMi0yaDg2djcwSDM0VjEwWiIgLz4KICAgIDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSI1IiB4PSI1IiB5PSI4IiBmaWxsPSIjOTQ5OENCIiByeD0iMS41IiAvPgogICAgPGcgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjMiPgogICAgICAgIDxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIyIiB4PSI1IiB5PSIyOSIgcng9IjEiIC8+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjIiIHg9IjUiIHk9IjIzIiByeD0iMSIgLz4KICAgICAgICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMiIgeD0iNSIgeT0iMTciIHJ4PSIxIiAvPgogICAgPC9nPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iNjEiIHgyPSI2MSIgeTE9IjAiIHkyPSI3OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNjA2MDczIiAvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1MDUwNjAiIC8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSI1Mi41IiB4Mj0iNzgiIHkxPSI4IiB5Mj0iNzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0Y3RjdGNyIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjFGMUYxIiAvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+Cjwvc3ZnPgo=" className="mb0-5 theme-card-image rounded-sm on-rtl-mirror"/><div className="py0-25">Legacy</div></span></button></li>
                        </ListGroup>
        </>
    )
}
