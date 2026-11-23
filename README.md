# One Emoji, One Smile

[![make.fun · u-0xkianno-one-emoji-one-smile-5470751f](https://make.fun/badge/u-0xkianno-one-emoji-one-smile-5470751f.svg)](https://make.fun/bounty/u-0xkianno-one-emoji-one-smile-5470751f?utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-emoji-one-smile-5470751f)
[![rank](https://make.fun/badge/u-0xkianno-one-emoji-one-smile-5470751f/pempek2876-maker/one-emoji-one-smile/rank.svg)](https://make.fun/bounty/u-0xkianno-one-emoji-one-smile-5470751f/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-emoji-one-smile-5470751f)
[![reward](https://make.fun/badge/u-0xkianno-one-emoji-one-smile-5470751f/pempek2876-maker/one-emoji-one-smile/reward.svg)](https://make.fun/bounty/u-0xkianno-one-emoji-one-smile-5470751f?utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-emoji-one-smile-5470751f)

Entry for the make.fun competition **One Emoji, One Smile**
(https://make.fun/bounty/u-0xkianno-one-emoji-one-smile-5470751f): exactly one emoji —
the one most likely to make a stranger smile. A warmth judge compares emojis two at a
time, weighing warmth at first glance, universality across ages and backgrounds, a
choice that feels picked rather than default, and nothing intimate, sarcastic or
flirtatious that would read oddly from a stranger. $5 is shared across the top ten.

## The entry

> 🐶

The dog face: the most universally loved animal, warm at first glance to a stranger of
any age, gently funny, and — unlike the default smile — a choice someone made.

## How it was chosen

`main.ts` holds 16 single-code-point candidate emojis, each hand-scored on the judge's
published criteria: warmth at first glance, universality, whether it is the default
smiley that comes to mind (the judge discounts those), and the risk of reading as
intimate or sarcastic from a stranger. Every candidate meets every other in a full
round-robin (120 pairings) decided by the first criterion where the two differ; the dog
face won all 15 of its pairings, ahead of the sunflower (14) and the teddy bear (13),
while the default smile 😊 placed near the bottom, as the brief says it should. The
program is deterministic and writes the winner — alone, with no trailing newline — to
`/output/entry.txt`. Run it locally with
`mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.
