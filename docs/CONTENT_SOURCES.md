# FunBytes Content Sources Specification

## 1. Ethical Ingestion & Source Protocol
FunBytes is committed to responsible content aggregation. We never scrape full copyrighted articles or overload publisher web servers.

| Source ID | Publisher / Community | Category | Ingestion Mechanism | Rate Limit / Interval |
|---|---|---|---|---|
| `reddit_dev_india` | r/developersIndia | developers | Public JSON API / RSS | 15 mins |
| `reddit_programming` | r/programming | developers | Public JSON API / RSS | 15 mins |
| `medium_tech` | Medium Tech Publications | developers / tech | Official RSS Feeds | 30 mins |
| `devhumor` | DevHumor | memes / dev | Public Feed / Structured Meta | 30 mins |
| `bbc_world` | BBC News | international / tech | Official RSS Feeds | 20 mins |
| `aljazeera` | Al Jazeera | international | Official RSS Feeds | 20 mins |
| `pib_india` | Press Information Bureau | politics / india | Official PIB RSS / Press releases | 30 mins |
| `politico_cartoons`| Politico Gallery | cartoons | Structured Gallery Meta | 60 mins |

## 2. Pluggable Architecture
Each source is encapsulated as an isolated TypeScript module implementing `ContentSource`. Sources handle their own XML/JSON parsing, metadata cleanup, and image extraction.
